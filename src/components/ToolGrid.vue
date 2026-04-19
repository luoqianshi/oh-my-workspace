<template>
  <div>
    <!-- 移动端分类选择器 -->
    <div class="lg:hidden mb-5 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        v-for="cat in ['全部', ...store.currentCategories]"
        :key="cat"
        @click="store.selectedCategory = cat === '全部' ? '' : (store.selectedCategory === cat ? '' : cat)"
        :class="[
          'px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-300 shrink-0 flex items-center gap-1.5',
          (cat === '全部' ? !store.selectedCategory : store.selectedCategory === cat)
            ? 'shadow-neu-inset text-[var(--role-accent)]'
            : 'neu-flat-sm text-[#6B7280] hover:text-[#3D4852]'
        ]"
      >
        <ToolIcon :name="cat" :size="14" />
        {{ cat }}
      </button>
    </div>

    <!-- 工具数量 -->
    <div class="flex items-center justify-between mb-5">
      <p class="text-sm text-[#6B7280] font-medium">
        共 <span class="text-[var(--role-accent)] font-bold">{{ store.filteredTools.length }}</span> 个工具
      </p>
      <p v-if="store.searchQuery" class="text-sm text-[#6B7280]">
        搜索: "{{ store.searchQuery }}"
      </p>
    </div>

    <!-- 卡片网格 -->
    <div v-if="store.filteredTools.length > 0"
      class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
    >
      <ToolCard v-for="tool in store.filteredTools" :key="tool.id" :tool="tool" />
    </div>

    <EmptyState v-else />
  </div>
</template>

<script setup>
import { useToolsStore } from '../stores/tools'
import ToolCard from './ToolCard.vue'
import EmptyState from './EmptyState.vue'
import ToolIcon from './ToolIcon.vue'
const store = useToolsStore()
</script>
