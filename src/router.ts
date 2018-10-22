import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";
import BuildSetting from "./pages/BuildSetting.vue";
import Project from "./pages/Project.vue";
import Signin from "./pages/Signin.vue";
import Signup from "./pages/Signup.vue";
import Jobs from "./pages/Jobs.vue";
import store from "@/store";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/projects",
      name: "projects",
      component: Home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/projects/:id",
      name: "project",
      component: Project,
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/projects/:id/buildSetting",
      name: "buildSetting",
      component: BuildSetting,
      meta: {
        requireAuth: true
      }
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
      path: "/signup",
      name: "signup",
      component: Signup,
      meta: {
        checkAuth: true
      }
    },
    {
      path: "/jobs",
      name: "jobs",
      component: Jobs,
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
        path: "/signup",
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
