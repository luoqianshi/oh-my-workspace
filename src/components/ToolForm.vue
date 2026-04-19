<template>
  <div class="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="absolute inset-0 bg-black/20 backdrop-blur-sm" @click="$emit('cancel')"></div>
    <div class="relative w-full sm:max-w-lg bg-[#E0E5EC] rounded-t-[24px] sm:rounded-[32px] shadow-neu-hover p-5 sm:p-8 max-h-[90vh] overflow-y-auto">
      <h3 class="text-lg font-display font-bold text-[#3D4852] mb-6">{{ isEdit ? '编辑工具' : '添加工具' }}</h3>

      <div class="space-y-4">
        <div>
          <label class="block text-sm text-[#6B7280] mb-1.5 font-medium">名称 *</label>
          <input v-model="form.name" type="text" placeholder="工具名称"
            class="w-full bg-[#E0E5EC] rounded-2xl px-4 py-3 text-sm text-[#3D4852] placeholder-[#A0AEC0] shadow-neu-inset focus:shadow-neu-inset-deep focus:outline-none transition-shadow duration-300" />
        </div>

        <div>
          <label class="block text-sm text-[#6B7280] mb-1.5 font-medium">URL *</label>
          <input v-model="form.url" type="url" placeholder="https://..."
            class="w-full bg-[#E0E5EC] rounded-2xl px-4 py-3 text-sm text-[#3D4852] placeholder-[#A0AEC0] shadow-neu-inset focus:shadow-neu-inset-deep focus:outline-none transition-shadow duration-300" />
        </div>

        <div>
          <label class="block text-sm text-[#6B7280] mb-1.5 font-medium">描述</label>
          <textarea v-model="form.description" rows="2" placeholder="一句话描述这个工具"
            class="w-full bg-[#E0E5EC] rounded-2xl px-4 py-3 text-sm text-[#3D4852] placeholder-[#A0AEC0] shadow-neu-inset focus:shadow-neu-inset-deep focus:outline-none transition-shadow duration-300 resize-none"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm text-[#6B7280] mb-1.5 font-medium">角色 *</label>
            <select v-model="form.role"
              class="w-full bg-[#E0E5EC] rounded-2xl px-4 py-3 text-sm text-[#3D4852] shadow-neu-inset focus:shadow-neu-inset-deep focus:outline-none transition-shadow duration-300 appearance-none">
              <option v-for="(role, key) in store.roles" :key="key" :value="key">{{ role.name }}</option>
            </select>
          </div>
          <div>
            <label class="block text-sm text-[#6B7280] mb-1.5 font-medium">分类 *</label>
            <select v-model="form.category"
              class="w-full bg-[#E0E5EC] rounded-2xl px-4 py-3 text-sm text-[#3D4852] shadow-neu-inset focus:shadow-neu-inset-deep focus:outline-none transition-shadow duration-300 appearance-none">
              <option value="" disabled>选择分类</option>
              <option v-for="cat in availableCategories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-sm text-[#6B7280] mb-1.5 font-medium">标签 (逗号分隔)</label>
          <input v-model="tagsInput" type="text" placeholder="AI, 对话, GPT"
            class="w-full bg-[#E0E5EC] rounded-2xl px-4 py-3 text-sm text-[#3D4852] placeholder-[#A0AEC0] shadow-neu-inset focus:shadow-neu-inset-deep focus:outline-none transition-shadow duration-300" />
        </div>
      </div>

      <div class="flex justify-end gap-3 mt-8">
        <button @click="$emit('cancel')"
          class="px-6 py-3 rounded-2xl neu-btn text-sm text-[#6B7280] font-medium">取消</button>
        <button @click="save"
          class="px-6 py-3 rounded-2xl neu-accent text-sm font-semibold">保存</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useToolsStore } from '../stores/tools'

const props = defineProps({
  tool: { type: Object, default: null },
  defaultRole: { type: String, default: 'graduate' }
})
defineEmits(['save', 'cancel'])

const store = useToolsStore()
const isEdit = computed(() => !!props.tool)
const form = ref({ name: '', url: '', description: '', icon: '', role: props.defaultRole, category: '', tags: [] })
const tagsInput = ref('')
const availableCategories = computed(() => store.roles[form.value.role]?.categories || [])

watch(() => form.value.role, () => { if (!isEdit.value) form.value.category = '' })

watch(() => props.tool, (val) => {
  if (val) { form.value = { ...val }; tagsInput.value = val.tags?.join(', ') || '' }
  else { form.value = { name: '', url: '', description: '', icon: '', role: props.defaultRole, category: '', tags: [] }; tagsInput.value = '' }
}, { immediate: true })

function save() {
  if (!form.value.name || !form.value.url || !form.value.category) return
  form.value.tags = tagsInput.value.split(/[,，]/).map(t => t.trim()).filter(Boolean)
  emit('save', { ...form.value })
}
</script>
