<script setup>
import { ref, onMounted, watch } from 'vue'
import { useToolsStore } from './stores/tools'
import { useTheme } from './composables/useTheme'
import Header from './components/Header.vue'
import RoleTabBar from './components/RoleTabBar.vue'
import CategoryNav from './components/CategoryNav.vue'
import ToolGrid from './components/ToolGrid.vue'
import ManagePanel from './components/ManagePanel.vue'

const store = useToolsStore()
const { setRole } = useTheme()
const showManage = ref(false)

onMounted(() => {
  const hash = window.location.hash.replace('#', '')
  if (hash && store.roles[hash]) {
    store.currentRole = hash
  }
  setRole(store.currentRole)
  store.loadTools()
})

watch(() => store.currentRole, (newRole) => {
  window.location.hash = newRole
  setRole(newRole)
  store.selectedCategory = ''
})
</script>

<template>
  <div class="min-h-screen bg-[#E0E5EC] text-[#3D4852] font-body transition-all duration-300">
    <Header @toggle-manage="showManage = !showManage" />
    <RoleTabBar />
    <main class="flex">
      <CategoryNav class="hidden lg:block" />
      <div class="flex-1 p-4 lg:p-8">
        <ToolGrid />
      </div>
    </main>
    <footer class="text-center py-8 text-xs text-[#6B7280]">
      <p>骆的工具箱 — 用不同身份，发现不同工具</p>
    </footer>
    <ManagePanel :open="showManage" @close="showManage = false" />
  </div>
</template>
