export function useUser() {
  function setUser(user) {
    localStorage.setItem('user', JSON.stringify({ user }))
  }

  function getUser() {
    const owner = JSON.parse(localStorage.getItem('user'))

    return owner.user;
  }

  function removeUser() {
    localStorage.removeItem('user')
  }

  return { setUser, getUser, removeUser }
}
