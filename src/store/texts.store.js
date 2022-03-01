import service from '@/services'

export default {
  namespaced: true,
  state: {
    textContent: null,
  },
  mutations: {
    setTextContent(state, textContent) {
      state.textContent = textContent;
    }
  },
  actions: {
    async getTextContent({ state, commit }) {
      if(!state.textContent){
        const textContent = await service.loadTextContent();
        commit("setTextContent", textContent);
      }
    },
  }
};
