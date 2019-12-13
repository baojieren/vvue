import Vue from 'vue'
import VueRouter from 'vue-router'
import ViewUI from 'view-design'
import Home from '../views/Layout.vue'
import Login from '../views/Login'

Vue.use(VueRouter);

const routes = [
    {
        path: '/login',
        name: 'login',
        component: Login
    }, {
        path: '/',
        name: 'home',
        component: Home,
        redirect: 'scenes-list',
        children: [
            {
                path: '/scenes-list',
                name: 'scenes-list',
                component: () => import('@/views/ScenesList.vue')
            },
            {
                path: '/scenes-edit',
                name: 'scenes-edit',
                component: () => import('@/views/ScenesEdit.vue')
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

// 全局导航守卫
router.beforeEach((to, from, next) => {
    ViewUI.LoadingBar.start();
    if (to.path === '/login' || localStorage.getItem("user_token")) {
        next();
    } else {
        next({path: "/login"});
    }
});

router.afterEach(() => {
    ViewUI.LoadingBar.finish();
});

export default router
