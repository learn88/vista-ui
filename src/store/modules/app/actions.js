export default {
  setLabel({ commit }, labels) {
    commit("setLabel", labels);
  },
  setLang({ commit }, lang) {
    commit("setLang", lang);
  },
  setNrc({ commit }, nrc) {
    commit("setNrc", nrc);
  }
};
