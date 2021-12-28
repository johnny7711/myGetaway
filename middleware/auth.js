export default function ({store, redirect, route}) {
  if(!store.getters['auth/isAuthenticated'] && route.name != 'login' && route.name != 'signup'){
    redirect('/login')
  }
  if(store.getters['auth/isAuthenticated'] && (route.name === 'login' || route.name === 'signup')){
    redirect('/')
  }
}