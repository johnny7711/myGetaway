export const state = () => ({
  toggle: 'close',
  scrollPosition: 0 
});

export const mutations = {
  setToggle(state, value){
    state.toggle = value
  },
  setScrollPosition(state, value){
    state.scrollPosition = value
  }
};

export const actions = {};

export const getters = {
  toggle({toggle}){
    return toggle
  },
  scrollPosition({scrollPosition}){
    return scrollPosition
  }
};
