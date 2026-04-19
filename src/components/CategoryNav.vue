<template>
  <nav class="w-56 min-h-[calc(100vh-160px)] p-4">
    <h3 class="text-xs font-display font-bold text-[#6B7280] uppercase tracking-wider mb-4 px-3">
      {{ store.roles[store.currentRole]?.name }} 的工具
    </h3>
    <ul class="space-y-2">
      <li v-for="cat in ['全部', ...store.currentCategories]" :key="cat">
        <button
          @click="store.selectedCategory = store.selectedCategory === cat ? '' : cat"
          :class="[
            'w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-300 flex items-center justify-between',
            store.selectedCategory === cat
              ? 'shadow-neu-inset text-[var(--role-accent)] font-semibold'
              : 'neu-flat-sm text-[#6B7280] hover:text-[#3D4852] hover:shadow-neu'
          ]"
        >
          <span class="flex items-center gap-2">
            <ToolIcon :name="cat" :size="16" />
            <span>{{ cat }}</span>
          </span>
          <span :class="[
            'text-xs px-2 py-0.5 rounded-full',
            store.selectedCategory === cat
              ? 'bg-[var(--role-accent)]/15 text-[var(--role-accent)]'
              : 'bg-[#E0E5EC] shadow-neu-inset-sm text-[#6B7280]'
          ]">{{ store.categoryCounts[cat] || 0 }}</span>
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { useToolsStore } from '../stores/tools'
import ToolIcon from './ToolIcon.vue'
const store = useToolsStore()
</script>
