<template>
  <header class="flex items-center justify-between px-4 sm:px-8 py-5">
    <h1 class="text-xl sm:text-2xl font-display font-extrabold text-[#3D4852] tracking-tight flex items-center gap-3">
      <div class="w-10 h-10 rounded-2xl neu-concave-deep flex items-center justify-center">
        <ToolIcon name="compass" :size="20" theme="filled" :fill="['var(--role-accent)']" />
      </div>
      <span class="hidden sm:inline">骆的工具箱</span>
      <span class="sm:hidden">工具箱</span>
    </h1>
    <div class="flex items-center gap-3">
      <SearchBar />
      <!-- 同步状态指示器 -->
      <button
        @click="$emit('toggle-sync')"
        class="w-11 h-11 rounded-2xl neu-btn flex items-center justify-center transition-colors relative"
        :class="syncColorClass"
        :title="syncTitle"
      >
        <svg class="w-5 h-5" :class="{ 'animate-spin': gistSync.isSyncing.value }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
        <span v-if="gistSync.isConfigured.value && gistSync.syncError.value"
          class="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
      </button>
      <button
        @click="$emit('toggle-manage')"
        class="w-11 h-11 rounded-2xl neu-btn flex items-center justify-center text-[#6B7280] hover:text-[var(--role-accent)] transition-colors"
        title="管理工具"
      >
        <ToolIcon name="设置" :size="20" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useToolsStore } from '../stores/tools'
import SearchBar from './SearchBar.vue'
import ToolIcon from './ToolIcon.vue'

defineEmits(['toggle-manage', 'toggle-sync'])

const store = useToolsStore()
const gistSync = store.gistSync

const syncColorClass = computed(() => {
  if (!gistSync.isConfigured.value) return 'text-[#A0AEC0]'
  if (gistSync.isSyncing.value) return 'text-blue-500'
  if (gistSync.syncError.value) return 'text-red-400'
  return 'text-[var(--role-accent)]'
})

const syncTitle = computed(() => {
  if (!gistSync.isConfigured.value) return '配置云端同步'
  if (gistSync.isSyncing.value) return '同步中...'
  if (gistSync.syncError.value) return '同步失败'
  return '云端同步'
})
</script>
