<template>
  <div class="flex flex-col items-center justify-center py-24 text-[#6B7280]">
    <div class="w-20 h-20 rounded-[32px] shadow-neu-inset-deep flex items-center justify-center mb-6 animate-float">
      <ToolIcon name="搜索" :size="36" theme="filled" :fill="['#A0AEC0']" />
    </div>
    <p class="text-lg font-display font-bold">没有找到匹配的工具</p>
    <p class="text-sm mt-2">试试其他搜索词或分类</p>
  </div>
</template>

<script setup>
import ToolIcon from './ToolIcon.vue'
</script>
