import { ref, readonly } from 'vue'
import { STORAGE_KEYS, saveSecure, loadSecure, removeSecure } from '../constants/storage'

const GIST_API = 'https://api.github.com/gists'
const GIST_FILENAME = 'luo-toolbox-data.json'

const token = ref(null)
const gistId = ref(null)
const isConfigured = ref(false)
const isSyncing = ref(false)
const lastSyncAt = ref(null)
const syncError = ref(null)
const autoPushEnabled = ref(true)

let pushTimer = null

function init() {
  token.value = loadSecure(STORAGE_KEYS.GIST_TOKEN)
  gistId.value = loadSecure(STORAGE_KEYS.GIST_ID)
  isConfigured.value = !!(token.value && gistId.value)

  const stateJson = localStorage.getItem(STORAGE_KEYS.SYNC_STATE)
  if (stateJson) {
    try {
      const state = JSON.parse(stateJson)
      lastSyncAt.value = state.lastSyncAt || null
      autoPushEnabled.value = state.autoPushEnabled !== false
    } catch {}
  }
}

function saveSyncState() {
  localStorage.setItem(STORAGE_KEYS.SYNC_STATE, JSON.stringify({
    lastSyncAt: lastSyncAt.value,
    autoPushEnabled: autoPushEnabled.value,
  }))
}

async function apiCall(url, options = {}) {
  const headers = {
    'Authorization': `token ${token.value}`,
    'Accept': 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  }
  const res = await fetch(url, { ...options, headers: { ...headers, ...options.headers } })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || `GitHub API error: ${res.status}`)
  }
  return res.json()
}

async function createGist(toolsData) {
  const body = {
    description: '骆的工具箱 - 数据同步',
    public: false,
    files: {
      [GIST_FILENAME]: {
        content: JSON.stringify({ tools: toolsData }, null, 2),
      },
    },
  }
  const gist = await apiCall(GIST_API, {
    method: 'POST',
    body: JSON.stringify(body),
  })
  gistId.value = gist.id
  saveSecure(STORAGE_KEYS.GIST_ID, gist.id)
  isConfigured.value = true
  return gist.id
}

async function linkGist(id) {
  const gist = await apiCall(`${GIST_API}/${id}`)
  const file = gist.files[GIST_FILENAME]
  if (!file) {
    throw new Error(`该 Gist 中未找到 ${GIST_FILENAME} 文件`)
  }
  gistId.value = gist.id
  saveSecure(STORAGE_KEYS.GIST_ID, gist.id)
  isConfigured.value = true
  return JSON.parse(file.content)
}

function unlinkGist() {
  removeSecure(STORAGE_KEYS.GIST_ID)
  gistId.value = null
  isConfigured.value = false
  syncError.value = null
}

function configure(newToken) {
  token.value = newToken
  saveSecure(STORAGE_KEYS.GIST_TOKEN, newToken)
}

function disconnect() {
  removeSecure(STORAGE_KEYS.GIST_TOKEN)
  removeSecure(STORAGE_KEYS.GIST_ID)
  token.value = null
  gistId.value = null
  isConfigured.value = false
  syncError.value = null
  lastSyncAt.value = null
  localStorage.removeItem(STORAGE_KEYS.SYNC_STATE)
}

async function push(toolsData) {
  if (!isConfigured.value) return
  syncError.value = null
  isSyncing.value = true
  try {
    // 先确认 Gist 存在且 token 有效
    await apiCall(`${GIST_API}/${gistId.value}`)
    // 更新内容
    await apiCall(`${GIST_API}/${gistId.value}`, {
      method: 'PATCH',
      body: JSON.stringify({
        files: {
          [GIST_FILENAME]: {
            content: JSON.stringify({ tools: toolsData }, null, 2),
          },
        },
      }),
    })
    lastSyncAt.value = new Date().toISOString()
    saveSyncState()
  } catch (err) {
    syncError.value = err.message
    throw err
  } finally {
    isSyncing.value = false
  }
}

async function pull() {
  if (!isConfigured.value) return null
  syncError.value = null
  isSyncing.value = true
  try {
    const gist = await apiCall(`${GIST_API}/${gistId.value}`)
    const file = gist.files[GIST_FILENAME]
    if (!file) {
      throw new Error(`Gist 中未找到 ${GIST_FILENAME}`)
    }
    const data = JSON.parse(file.content)
    lastSyncAt.value = new Date().toISOString()
    saveSyncState()
    return data
  } catch (err) {
    syncError.value = err.message
    throw err
  } finally {
    isSyncing.value = false
  }
}

function scheduleAutoPush(toolsData) {
  if (!autoPushEnabled.value || !isConfigured.value) return
  if (pushTimer) clearTimeout(pushTimer)
  pushTimer = setTimeout(async () => {
    try {
      await push(toolsData)
    } catch {
      // error already set in push()
    }
  }, 3000)
}

function cancelAutoPush() {
  if (pushTimer) {
    clearTimeout(pushTimer)
    pushTimer = null
  }
}

// Initialize on import
init()

export function useGistSync() {
  return {
    token,
    gistId,
    isConfigured: readonly(isConfigured),
    isSyncing: readonly(isSyncing),
    lastSyncAt: readonly(lastSyncAt),
    syncError: readonly(syncError),
    autoPushEnabled,
    configure,
    disconnect,
    createGist,
    linkGist,
    unlinkGist,
    push,
    pull,
    scheduleAutoPush,
    cancelAutoPush,
  }
}
