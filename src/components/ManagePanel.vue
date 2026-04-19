<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex justify-end">
      <div class="absolute inset-0 bg-black/20 backdrop-blur-sm" @click="$emit('close')"></div>
      <div class="relative w-full max-w-md bg-[#E0E5EC] rounded-l-[32px] shadow-neu-hover flex flex-col">
        <!-- 头部 -->
        <div class="flex items-center justify-between p-5 shrink-0">
          <h2 class="text-lg font-display font-bold text-[#3D4852] flex items-center gap-2">
            <ToolIcon name="管理" :size="20" theme="filled" :fill="['var(--role-accent)']" />
            工具管理
          </h2>
          <button @click="$emit('close')" class="w-9 h-9 rounded-xl neu-btn flex items-center justify-center text-[#6B7280]">
            <ToolIcon name="关闭" :size="16" />
          </button>
        </div>

        <!-- 内容 -->
        <div class="flex-1 overflow-y-auto px-5 pb-4">
          <!-- 角色筛选 -->
          <div class="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-hide">
            <button
              v-for="(role, key) in store.roles"
              :key="key"
              @click="manageRole = key"
              :class="[
                'px-3 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-300 shrink-0 flex items-center gap-1.5',
                manageRole === key
                  ? 'shadow-neu-inset text-[var(--role-accent)]'
                  : 'neu-flat-sm text-[#6B7280] hover:text-[#3D4852]'
              ]"
            >
              <ToolIcon :name="role.icon" :size="14" />
              {{ role.name }}
            </button>
          </div>

          <!-- 添加按钮 -->
          <button @click="showForm = true; editingTool = null"
            class="w-full mb-4 px-4 py-3 rounded-2xl neu-accent text-sm font-semibold flex items-center justify-center gap-2">
            <ToolIcon name="添加" :size="18" theme="filled" :fill="['white']" />
            添加新工具
          </button>

          <!-- 工具列表 -->
          <div class="space-y-2">
            <div v-for="tool in manageTools" :key="tool.id"
              class="flex items-center gap-3 p-3 rounded-2xl neu-flat-sm group hover:shadow-neu transition-shadow duration-300">
              <div class="w-10 h-10 rounded-xl shadow-neu-inset flex items-center justify-center shrink-0">
                <ToolIcon :name="tool.id" :size="18" theme="filled" :fill="['var(--role-accent)']" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-semibold text-[#3D4852] truncate">{{ tool.name }}</p>
                <p class="text-xs text-[#6B7280] truncate">{{ tool.category }}</p>
              </div>
              <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button @click="editTool(tool)" class="w-8 h-8 rounded-xl neu-btn flex items-center justify-center">
                  <ToolIcon name="编辑" :size="14" />
                </button>
                <button @click="confirmDelete(tool)" class="w-8 h-8 rounded-xl neu-btn flex items-center justify-center text-red-400">
                  <ToolIcon name="删除" :size="14" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 底部操作 -->
        <div class="p-5 space-y-2 shrink-0">
          <div class="flex gap-2">
            <button @click="store.exportJSON()"
              class="flex-1 px-3 py-3 rounded-2xl neu-btn text-sm text-[#6B7280] font-medium flex items-center justify-center gap-1.5">
              <ToolIcon name="下载" :size="16" />
              导出 JSON
            </button>
            <label class="flex-1 px-3 py-3 rounded-2xl neu-btn text-sm text-[#6B7280] font-medium flex items-center justify-center gap-1.5 cursor-pointer">
              <ToolIcon name="上传" :size="16" />
              导入 JSON
              <input type="file" accept=".json" @change="onImport" class="hidden" />
            </label>
          </div>
          <button @click="confirmReset"
            class="w-full px-3 py-3 rounded-2xl neu-btn text-sm text-red-400 font-medium flex items-center justify-center gap-1.5">
            <ToolIcon name="刷新" :size="16" />
            重置为默认数据
          </button>
        </div>
      </div>
    </div>

    <ToolForm v-if="showForm" :tool="editingTool" :default-role="manageRole" @save="onSave" @cancel="showForm = false" />
  </Teleport>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useToolsStore } from '../stores/tools'
import ToolForm from './ToolForm.vue'
import ToolIcon from './ToolIcon.vue'

const props = defineProps({ open: Boolean })
defineEmits(['close'])
const store = useToolsStore()
const manageRole = ref('graduate')
const showForm = ref(false)
const editingTool = ref(null)

const manageTools = computed(() => store.tools.filter(t => t.role === manageRole.value))

function editTool(tool) { editingTool.value = tool; showForm.value = true }

function onSave(toolData) {
  if (editingTool.value) { store.updateTool(editingTool.value.id, toolData) }
  else { store.addTool(toolData) }
  showForm.value = false; editingTool.value = null
}

function confirmDelete(tool) {
  if (confirm(`确定删除 "${tool.name}" 吗？`)) store.deleteTool(tool.id)
}

function confirmReset() {
  if (confirm('确定重置为默认数据吗？所有修改将丢失。')) store.resetToDefault()
}

async function onImport(event) {
  const file = event.target.files[0]
  if (!file) return
  try { await store.importJSON(file); alert('导入成功！') }
  catch (err) { alert('导入失败：' + err.message) }
  event.target.value = ''
}
</script>
