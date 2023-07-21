import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { usePermissStore } from "../store/permiss";
import Home from "../views/home.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/entityRecognition",
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/entityRecognition",
        name: "entityRecognition",
        meta: {
          title: "实体识别",
          permiss: "1",
        },
        component: () =>
          import(
            /* webpackChunkName: "entityRecognition" */ "../views/entityRecognition.vue"
          ),
      },
      {
        path: "/question",
        name: "basecharts",
        meta: {
          title: "核安全问答",
          permiss: "11",
        },
        component: () =>
          import(/* webpackChunkName: "question" */ "../views/question.vue"),
      },
      {
        path: "/entitySearch",
        name: "entitySearch",
        meta: {
          title: "实体查询",
          permiss: "3",
        },
        component: () =>
          import(
            /* webpackChunkName: "entitySearch" */ "../views/entitySearch.vue"
          ),
      },
      {
        path: "/donate",
        name: "donate",
        meta: {
          title: "问题模板",
          permiss: "14",
        },
        component: () =>
          import(/* webpackChunkName: "donate" */ "../views/donate.vue"),
      },
      {
        path: "/permission",
        name: "permission",
        meta: {
          title: "案例分析",
          permiss: "13",
        },
        component: () =>
          import(
            /* webpackChunkName: "permission" */ "../views/permission.vue"
          ),
      },
      {
        path: "/icon",
        name: "icon",
        meta: {
          title: "关系查询",
          permiss: "10",
        },
        component: () =>
          import(/* webpackChunkName: "icon" */ "../views/icon.vue"),
      },
      {
        path: "/user",
        name: "user",
        meta: {
          title: "个人中心",
        },
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/user.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录",
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/login.vue"),
  },
  {
    path: "/403",
    name: "403",
    meta: {
      title: "没有权限",
    },
    component: () => import(/* webpackChunkName: "403" */ "../views/403.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | 核安全知识问答平台`;
  const role = localStorage.getItem("ms_username");
  const permiss = usePermissStore();
  if (!role && to.path !== "/login") {
    next("/login");
  } else if (to.meta.permiss && !permiss.key.includes(to.meta.permiss)) {
    // 如果没有权限，则进入403
    next("/403");
  } else {
    next();
  }
});

export default router;
