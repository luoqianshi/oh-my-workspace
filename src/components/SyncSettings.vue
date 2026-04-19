<template>
  <Teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 flex justify-end">
      <div class="absolute inset-0 bg-black/20 backdrop-blur-sm" @click="$emit('close')"></div>
      <div class="relative w-full max-w-md bg-[#E0E5EC] rounded-l-[32px] shadow-neu-hover flex flex-col">
        <!-- 头部 -->
        <div class="flex items-center justify-between p-5 shrink-0">
          <h2 class="text-lg font-display font-bold text-[#3D4852] flex items-center gap-2">
            <svg class="w-5 h-5 text-[var(--role-accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            云端同步
          </h2>
          <button @click="$emit('close')" class="w-9 h-9 rounded-xl neu-btn flex items-center justify-center text-[#6B7280]">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 内容 -->
        <div class="flex-1 overflow-y-auto px-5 pb-4">
          <!-- 未配置：设置区 -->
          <template v-if="!gistSync.isConfigured">
            <div class="mb-4">
              <label class="block text-sm text-[#6B7280] mb-1.5 font-medium">Personal Access Token</label>
              <div class="relative">
                <input
                  v-model="tokenInput"
                  :type="showToken ? 'text' : 'password'"
                  placeholder="ghp_xxxxxxxxxxxx"
                  class="w-full bg-[#E0E5EC] rounded-2xl px-4 py-3 pr-10 text-sm text-[#3D4852] placeholder-[#A0AEC0] shadow-neu-inset focus:shadow-neu-inset-deep focus:outline-none transition-shadow duration-300 font-mono"
                />
                <button @click="showToken = !showToken"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[var(--role-accent)] transition-colors">
                  <svg v-if="showToken" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L6.59 6.59m7.532 7.532l3.29 3.29M3 3l18 18" />
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
              <p class="text-xs text-[#6B7280] mt-1.5">
                前往
                <a href="https://github.com/settings/tokens/new" target="_blank" class="text-[var(--role-accent)] underline">GitHub 创建 Token</a>
                ，只需勾选 gist 权限
              </p>
            </div>

            <!-- 操作按钮 -->
            <div class="space-y-2">
              <button @click="handleCreate" :disabled="!tokenInput || actionLoading"
                class="w-full px-4 py-3 rounded-2xl neu-accent text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                <svg v-if="actionLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                创建新 Gist
              </button>
              <button @click="showLinkInput = !showLinkInput"
                class="w-full px-4 py-3 rounded-2xl neu-btn text-sm text-[#6B7280] font-medium flex items-center justify-center gap-2">
                关联已有 Gist
              </button>
            </div>

            <!-- 关联 Gist 输入 -->
            <div v-if="showLinkInput" class="mt-3">
              <input
                v-model="gistIdInput"
                type="text"
                placeholder="输入 Gist ID"
                class="w-full bg-[#E0E5EC] rounded-2xl px-4 py-3 text-sm text-[#3D4852] placeholder-[#A0AEC0] shadow-neu-inset focus:shadow-neu-inset-deep focus:outline-none transition-shadow duration-300 font-mono"
              />
              <button @click="handleLink" :disabled="!gistIdInput || actionLoading"
                class="w-full mt-2 px-4 py-3 rounded-2xl neu-accent text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                关联并拉取
              </button>
            </div>

            <!-- 错误信息 -->
            <div v-if="errorMessage" class="mt-3 p-3 rounded-2xl bg-red-50 text-red-500 text-xs">
              {{ errorMessage }}
            </div>
          </template>

          <!-- 已配置：管理区 -->
          <template v-else>
            <!-- 同步状态 -->
            <div class="p-4 rounded-2xl neu-flat-sm mb-4">
              <div class="flex items-center gap-3 mb-3">
                <div class="w-10 h-10 rounded-xl flex items-center justify-center"
                  :class="gistSync.isSyncing ? 'bg-blue-50' : gistSync.syncError ? 'bg-red-50' : 'bg-green-50'">
                  <svg v-if="gistSync.isSyncing" class="w-5 h-5 text-blue-500 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  <svg v-else-if="gistSync.syncError" class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <svg v-else class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm font-semibold text-[#3D4852]">
                    {{ gistSync.isSyncing ? '同步中...' : gistSync.syncError ? '同步失败' : '已同步' }}
                  </p>
                  <p v-if="gistSync.lastSyncAt" class="text-xs text-[#6B7280]">
                    {{ formatTime(gistSync.lastSyncAt) }}
                  </p>
                </div>
              </div>
              <div v-if="gistSync.syncError" class="text-xs text-red-500 mt-1">
                {{ gistSync.syncError }}
              </div>
            </div>

            <!-- Gist 信息 -->
            <div class="p-4 rounded-2xl neu-flat-sm mb-4">
              <p class="text-xs text-[#6B7280] mb-1">Gist ID</p>
              <a :href="`https://gist.github.com/${gistSync.gistId}`" target="_blank"
                class="text-sm text-[var(--role-accent)] font-mono underline break-all">
                {{ gistSync.gistId }}
              </a>
            </div>

            <!-- 自动推送开关 -->
            <div class="flex items-center justify-between p-4 rounded-2xl neu-flat-sm mb-4">
              <div>
                <p class="text-sm font-medium text-[#3D4852]">自动推送</p>
                <p class="text-xs text-[#6B7280]">修改工具后 3 秒自动同步</p>
              </div>
              <button @click="gistSync.autoPushEnabled = !gistSync.autoPushEnabled"
                class="w-12 h-7 rounded-full transition-all duration-300 relative"
                :class="gistSync.autoPushEnabled ? 'bg-[var(--role-accent)]' : 'bg-[#A0AEC0]'">
                <div class="w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-md"
                  :class="gistSync.autoPushEnabled ? 'left-6' : 'left-1'"></div>
              </button>
            </div>

            <!-- 操作按钮 -->
            <div class="space-y-2">
              <button @click="handlePush" :disabled="gistSync.isSyncing"
                class="w-full px-4 py-3 rounded-2xl neu-accent text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                推送到云端
              </button>
              <button @click="handlePull" :disabled="gistSync.isSyncing"
                class="w-full px-4 py-3 rounded-2xl neu-btn text-sm text-[#6B7280] font-medium flex items-center justify-center gap-2 disabled:opacity-50">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                </svg>
                从云端拉取
              </button>
              <button @click="handleDisconnect"
                class="w-full px-4 py-3 rounded-2xl neu-btn text-sm text-red-400 font-medium flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
                断开连接
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useToolsStore } from '../stores/tools'

const props = defineProps({ open: Boolean })
defineEmits(['close'])

const store = useToolsStore()
const gistSync = store.gistSync

const tokenInput = ref('')
const gistIdInput = ref('')
const showToken = ref(false)
const showLinkInput = ref(false)
const actionLoading = ref(false)
const errorMessage = ref('')

function formatTime(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}

async function handleCreate() {
  errorMessage.value = ''
  actionLoading.value = true
  try {
    gistSync.configure(tokenInput.value)
    await gistSync.createGist(store.tools)
    tokenInput.value = ''
  } catch (err) {
    errorMessage.value = err.message
  } finally {
    actionLoading.value = false
  }
}

async function handleLink() {
  errorMessage.value = ''
  actionLoading.value = true
  try {
    gistSync.configure(tokenInput.value)
    const data = await gistSync.linkGist(gistIdInput.value)
    if (data && data.tools && Array.isArray(data.tools)) {
      store.tools = data.tools
      localStorage.setItem('luo-toolbox-data', JSON.stringify(store.tools))
    }
    tokenInput.value = ''
    gistIdInput.value = ''
  } catch (err) {
    errorMessage.value = err.message
  } finally {
    actionLoading.value = false
  }
}

async function handlePush() {
  try {
    await gistSync.push(store.tools)
  } catch {
    // error already set in push()
  }
}

async function handlePull() {
  try {
    const data = await gistSync.pull()
    if (data && data.tools && Array.isArray(data.tools)) {
      store.tools = data.tools
      localStorage.setItem('luo-toolbox-data', JSON.stringify(store.tools))
    }
  } catch {
    // error already set in pull()
  }
}

function handleDisconnect() {
  if (confirm('断开连接后，本地数据保留但不再同步。确定吗？')) {
    gistSync.disconnect()
  }
}
</script>
