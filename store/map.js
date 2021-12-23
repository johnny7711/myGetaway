function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const state = () => ({
  center: { lat: 35.681382, lng: 139.766084 },
  myLocation: { lat: 35.681382, lng: 139.766084 }
});

export const mutations = {
  setCenter(state, value) {
    state.center = value;
  },
  setMyLocation(state, value) {
    state.myLocation = value;
  }
};

export const actions = {
  watchPosition({ commit }) {;
    navigator.geolocation.watchPosition(({coords}) => {
      commit('setMyLocation', { lat: coords.latitude, lng: coords.longitude })
      console.log('watch postion')
    })
  }
};

export const getters = {
  center({ center }) {
    return center;
  },
  myLocation({ myLocation }) {
    return myLocation;
  }
};
