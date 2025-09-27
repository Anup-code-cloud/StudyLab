// Super-light mock auth using localStorage
const KEY = 'studylab_auth_token'


export const auth = {
isAuthed() {
return Boolean(localStorage.getItem(KEY))
},
signIn(email) {
// In real app, call API then save JWT
localStorage.setItem(KEY, JSON.stringify({ email, ts: Date.now() }))
},
signOut() {
localStorage.removeItem(KEY)
},
}