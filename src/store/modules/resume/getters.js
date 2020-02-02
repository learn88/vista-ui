export default {
  getPerson: (state) => {
    return state.person;
  },
  getCategories: (state) => {
    return state.categories;
  },
  isEdit: (state) => {
    if (state.person != "") {
      return true;
    } else {
      return false;
    }
  },
  isShow: (state) => {
    return state.show;
  }
};
