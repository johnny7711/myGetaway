import { auth } from '~/plugins/firebase.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

export const state = () => ({
  user: null
})

export const mutations = {
  setUser(state, user){
    state.user = user
  }
}

export const actions = {
  async signupWithEmail(_, {email, pw}){
    const credential = await createUserWithEmailAndPassword(auth, email, pw)
    console.log(credential)
  },

  async singupWithGoogle(_){
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider)
  },

  async login(context, {email, pw}){
    try {
      await signInWithEmailAndPassword(auth, email, pw)
    } catch (error) {
      console.log(error)
    }
  },

  async logout(_){
    try {
      await signOut(auth)
    } catch (error) {
      console.log(error)
    }
  }
}

export const getters = {
  user({user}){
    return user
  },
  isAuthenticated({user}){
    return !!user
  }
}