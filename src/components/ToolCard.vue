<template>
  <a
    :href="tool.url"
    target="_blank"
    rel="noopener noreferrer"
    class="group block relative p-6 rounded-[32px] bg-[#E0E5EC] shadow-[9px_9px_16px_rgb(163,177,198,0.6),-9px_-9px_16px_rgba(255,255,255,0.5)] hover:shadow-[14px_14px_28px_rgb(163,177,198,0.7),-14px_-14px_28px_rgba(255,255,255,0.6)] hover:-translate-y-1.5 transition-all duration-300 ease-out"
  >
    <!-- 置顶标记 -->
    <div v-if="tool.pinned" class="absolute top-4 right-4">
      <ToolIcon name="确认" :size="14" theme="filled" :fill="['var(--role-accent)']" />
    </div>

    <div class="flex items-start gap-4">
      <!-- 图标凹槽 -->
      <div class="w-14 h-14 rounded-2xl shadow-neu-inset-deep flex items-center justify-center shrink-0">
        <ToolIcon :name="tool.id" :size="26" theme="filled" :fill="['var(--role-accent)']" />
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-display font-bold text-[#3D4852] group-hover:text-[var(--role-accent)] transition-colors truncate text-[15px]">
          {{ tool.name }}
        </h3>
        <p class="text-sm text-[#6B7280] mt-1.5 line-clamp-2 leading-relaxed">{{ tool.description }}</p>
      </div>
    </div>

    <div class="flex items-center justify-between mt-5">
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="tag in (tool.tags || []).slice(0, 3)"
          :key="tag"
          class="px-2.5 py-1 text-xs rounded-full shadow-neu-inset-sm text-[#6B7280] font-medium"
        >{{ tag }}</span>
      </div>
      <span class="text-sm text-[var(--role-accent)] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all font-medium">
        访问 →
      </span>
    </div>
  </a>
</template>

<script setup>
import ToolIcon from './ToolIcon.vue'
defineProps({ tool: { type: Object, required: true } })
</script>
