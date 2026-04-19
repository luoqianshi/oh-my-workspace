export function useTheme() {
  function setRole(roleId) {
    if (roleId) {
      document.documentElement.setAttribute('data-role', roleId)
    } else {
      document.documentElement.removeAttribute('data-role')
    }
  }
  return { setRole }
}
