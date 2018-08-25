import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import Signin from "./pages/Signin.vue";
import MuseumList from "@/pages/MuseumList.vue";
import MuseumDetail from "@/pages/museum/detail.vue";
import Unregistered from "@/pages/Unregistered.vue"
import store from "@/store";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/signin",
      name: "signin",
      component: Signin,
      meta: {
        checkAuth: true
      }
    },
    {
      path: "/museums",
      name: "museums",
      component: MuseumList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/museums/:id",
      name: "museum",
      component: MuseumDetail,
      meta: {
        requireAuth: false
      }
    },
    {
      path: "/unregistered",
      name: "unregistered",
      component: Unregistered,
      meta: {
        requireAuth: true
      }
    }
  ]
});

router.beforeEach((to, _, next) => {
  let requireAuth = to.matched.some(record => record.meta.requireAuth);
  let checkAuth = to.matched.some(record => record.meta.checkAuth);
  let currentUser = store.state.user.user;

  if (requireAuth) {
    if (!currentUser) {
      next({
        path: "/signin",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (checkAuth) {
    if (currentUser) {
      next({
        path: "/",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
