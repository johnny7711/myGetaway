import { auth } from '~/plugins/firebase.js'
import { onAuthStateChanged } from 'firebase/auth'

export default function ({store}) {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      // TODO ***必要なユーザ情報のみ保有する
      store.commit('auth/setUser', _.cloneDeep(user))
      resolve()
    })
  })
};