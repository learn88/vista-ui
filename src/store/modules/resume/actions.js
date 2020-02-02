export default {
  setPerson({ commit }, person) {
    commit("setPerson", person);
  },
  setCategories({ commit }, categories) {
    commit("setCategories", categories);
  },
  setShow({ commit }, show) {
    commit("setShow", show);
  }
};
