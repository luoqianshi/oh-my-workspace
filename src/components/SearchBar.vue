<template>
  <div class="relative">
    <input
      :value="store.searchQuery"
      @input="onInput($event.target.value)"
      type="text"
      placeholder="搜索工具..."
      class="w-40 sm:w-80 bg-[#E0E5EC] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 pl-9 sm:pl-11 pr-8 sm:pr-10 text-xs sm:text-sm text-[#3D4852] placeholder-[#A0AEC0] shadow-neu-inset focus:shadow-neu-inset-deep focus:outline-none transition-shadow duration-300"
    />
    <div class="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 text-[#A0AEC0]">
      <ToolIcon name="搜索" :size="16" />
    </div>
    <button
      v-if="store.searchQuery"
      @click="store.searchQuery = ''"
      class="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[#A0AEC0] hover:text-[#6B7280] transition-colors"
    >
      <ToolIcon name="关闭" :size="14" />
    </button>
  </div>
</template>

<script setup>
import { useToolsStore } from '../stores/tools'
import { useSearch } from '../composables/useSearch'
import ToolIcon from './ToolIcon.vue'
const store = useToolsStore()
const { onSearchInput } = useSearch(store)
function onInput(value) { onSearchInput(value) }
</script>
