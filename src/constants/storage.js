export const STORAGE_KEYS = {
  TOOLS_DATA: 'luo-toolbox-data',
  GIST_TOKEN: 'luo-toolbox-gist-token',
  GIST_ID: 'luo-toolbox-gist-id',
  SYNC_STATE: 'luo-toolbox-sync-state',
}

export function saveSecure(key, value) {
  localStorage.setItem(key, btoa(encodeURIComponent(value)))
}

export function loadSecure(key) {
  const encoded = localStorage.getItem(key)
  if (!encoded) return null
  try {
    return decodeURIComponent(atob(encoded))
  } catch {
    return null
  }
}

export function removeSecure(key) {
  localStorage.removeItem(key)
}
