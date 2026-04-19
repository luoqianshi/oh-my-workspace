export function useSearch(store) {
  let debounceTimer = null
  function onSearchInput(value) {
    clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
      store.searchQuery = value
    }, 200)
  }
  function clearSearch() {
    store.searchQuery = ''
  }
  return { onSearchInput, clearSearch }
}
