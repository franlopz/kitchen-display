const user = localStorage.getItem('user')
export const initialUser = user ? JSON.parse(user) : null
