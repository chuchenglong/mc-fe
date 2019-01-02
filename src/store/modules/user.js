const user = {
  state: {
    roles: [],
    menus: [],
    photo: ""
  },

  mutations: {
    SET_PHOTO: (state, photo) => {
      state.photo = photo
    }
  },

  actions: {
    SetPhoto({ commit }, photo) {
      commit('SET_PHOTO', photo)
    }
  },

  getters: {

  }
}

export default user
