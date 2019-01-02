import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count : 0
}

const mutations = {
  incrementMutation(state) {
    state.count++
  },
  decrementMutation(state) {
    state.count--
  }

}

const actions = {
  increment({commit}) {
    // 提交一个mutation
    commit('incrementMutation')
  },
  decrement({commit}) {
    // 提交一个mutation
    commit('decrementMutation')
  },
  incrementIfOdd({commit, state}) {
    // 提交一个mutation
    if (state.count%2===1) {
      commit('incrementMutation')
    }
  },
  incrementAsync({commit, state}) {
    // 提交一个mutation
    setTimeout(() => {
      commit('incrementMutation')
    }, 1000)

  }

}

const getters = {
  evenOrOdd(state) {
    return state.count%2===0 ? '偶数':'奇数'
  }

}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
