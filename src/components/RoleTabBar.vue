<template>
  <div class="px-3 sm:px-8 pb-3 sm:pb-4">
    <div class="flex gap-1.5 sm:gap-3 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
      <button
        v-for="role in Object.values(store.roles)"
        :key="role.id"
        @click="store.currentRole = role.id; store.selectedCategory = ''"
        :class="[
          'flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-display font-semibold whitespace-nowrap transition-all duration-300 shrink-0',
          store.currentRole === role.id
            ? 'neu-accent text-white shadow-neu'
            : 'neu-btn text-[#6B7280] hover:text-[#3D4852]'
        ]"
      >
        <ToolIcon :name="role.icon" :size="16" :theme="store.currentRole === role.id ? 'filled' : 'outline'" :fill="store.currentRole === role.id ? ['white'] : ['currentColor']" />
        <span>{{ role.name }}</span>
      </button>
    </div>
    <p class="px-2 pt-2 sm:pt-3 text-xs text-[#6B7280] font-body">
      {{ store.roles[store.currentRole]?.description }}
    </p>
  </div>
</template>

<script setup>
import { useToolsStore } from '../stores/tools'
import ToolIcon from './ToolIcon.vue'
const store = useToolsStore()
</script>
