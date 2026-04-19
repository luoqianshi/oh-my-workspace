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
import SearchBar from './SearchBar.vue'
import ToolIcon from './ToolIcon.vue'
defineEmits(['toggle-manage'])
</script>
