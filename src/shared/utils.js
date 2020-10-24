export const urlParser = position => {
  if (
    window.location.pathname &&
    window.location.pathname.split('/')[position]
  ) {
    return decodeURIComponent(window.location.pathname.split('/')[position])
  }
}
