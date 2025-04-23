import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    functionName:"",
  },
  mutations: {
    setFunctionName(state, newValue){

      state.functionName = newValue

    },
  },
  actions: {},
  modules: {},
  getters: {
    // 定义获取状态的方法
    getFunctionName: state => {
      return state.functionName;
    }
  }
});
