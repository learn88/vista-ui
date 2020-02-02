// import { set, toggle } from '@/utils/vuex'

export default {
  setLabel(state, labels) {
    state.labels = labels;
  },
  setLang(state, lang) {
    state.lang = lang;
  },
  setNrc(state, nrc) {
    state.nrc = nrc;
  }
  // setDrawer: set('drawer'),
  // setImage: set('image'),
  // setColor: set('color'),
  // // toggleDrawer: toggle('drawer')
  // setMini (state, mini) {
  //   state.app.mini = mini
  // }
};
