import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ROLES } from '../constants/roles'
import defaultTools from '../data/tools.json'

const STORAGE_KEY = 'luo-toolbox-data'

export const useToolsStore = defineStore('tools', () => {
  const tools = ref([])
  const currentRole = ref('graduate')
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const roles = ROLES

  const currentCategories = computed(() => {
    return roles[currentRole.value]?.categories || []
  })

  const categoryCounts = computed(() => {
    const roleTools = tools.value.filter(t => t.role === currentRole.value)
    const counts = { '全部': roleTools.length }
    currentCategories.value.forEach(cat => {
      counts[cat] = roleTools.filter(t => t.category === cat).length
    })
    return counts
  })

  const filteredTools = computed(() => {
    let result = tools.value.filter(t => t.role === currentRole.value)
    if (selectedCategory.value) {
      result = result.filter(t => t.category === selectedCategory.value)
    }
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase().trim()
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        (t.tags && t.tags.some(tag => tag.toLowerCase().includes(q)))
      )
    }
    result.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0))
    return result
  })

  function loadTools() {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        tools.value = JSON.parse(saved)
        return
      } catch (e) {
        console.warn('localStorage数据解析失败，使用默认数据')
      }
    }
    tools.value = defaultTools.tools || []
  }

  function saveTools() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tools.value))
  }

  function addTool(tool) {
    const newTool = {
      id: tool.id || tool.name.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fff]/g, '_') + '_' + Date.now(),
      name: tool.name,
      url: tool.url,
      description: tool.description || '',
      icon: tool.icon || '',
      category: tool.category,
      role: tool.role || currentRole.value,
      tags: tool.tags || [],
      addedAt: new Date().toISOString().split('T')[0],
      pinned: false,
      ...tool
    }
    tools.value.push(newTool)
    saveTools()
  }

  function updateTool(id, updates) {
    const index = tools.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tools.value[index] = { ...tools.value[index], ...updates }
      saveTools()
    }
  }

  function deleteTool(id) {
    tools.value = tools.value.filter(t => t.id !== id)
    saveTools()
  }

  function exportJSON() {
    const data = JSON.stringify({ tools: tools.value }, null, 2)
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `luo-toolbox-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function importJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result)
          if (data.tools && Array.isArray(data.tools)) {
            tools.value = data.tools
            saveTools()
            resolve()
          } else {
            reject(new Error('JSON格式不正确，缺少tools数组'))
          }
        } catch (err) {
          reject(new Error('JSON解析失败'))
        }
      }
      reader.readAsText(file)
    })
  }

  function resetToDefault() {
    localStorage.removeItem(STORAGE_KEY)
    tools.value = defaultTools.tools || []
  }

  return {
    tools, currentRole, searchQuery, selectedCategory,
    roles, currentCategories, categoryCounts, filteredTools,
    loadTools, saveTools, addTool, updateTool, deleteTool,
    exportJSON, importJSON, resetToDefault
  }
})
