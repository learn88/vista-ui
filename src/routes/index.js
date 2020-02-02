import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

import Login from "@/views/Auth/Login.vue";
import Home from "@/views/Home.vue";
// import CVForm from "@/views/CV/CVForm.vue";
// import CVEditForm from "@/views/CV/CVEditForm.vue";
import PersonIndex from "@/views/Person/Index.vue";
import PersonShow from "@/views/Person/Show.vue";
import ResumeForm from "@/views/Resume/Form.vue";
import JapanForm from "@/views/Resume/Japan/Index.vue";

import NrcList from "@/views/NRC/Index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { requiresAuth: true }
  },
  { path: "*", redirect: "/" },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  // {
  //   path: "/register-form",
  //   name: "register-form",
  //   component: CVForm
  // },
  // {
  //   path: "/register-form/:_id",
  //   name: "edit-form",
  //   component: CVEditForm
  // },
  {
    path: "/persons",
    name: "persons",
    component: PersonIndex,
    meta: { requiresAuth: true }
  },
  {
    path: "/persons-show",
    name: "persons-show",
    component: PersonShow,
    meta: { requiresAuth: true }
  },
  {
    path: "/resume-form",
    name: "resume-form",
    component: ResumeForm
  },
  {
    path: "/japan-form",
    name: "japan-form",
    component: JapanForm
  },
  {
    path: "/nrc-lists",
    name: "nrc-lists",
    component: NrcList
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.isUserLoggedIn) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
