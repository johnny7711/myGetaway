export const state = () => ({
  shopDetailTitle: 'shop title'
})

export const mutations = {
  updateTitle(state, title){
    state.shopDetailTitle = title
  }
}

export const getters = {
  shopDetailTitle({shopDetailTitle}){
    return shopDetailTitle
  }
}