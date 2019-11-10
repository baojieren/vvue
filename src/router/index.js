import Vue from 'vue'
import VueRouter from 'vue-router'
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
        redirect: 'profile',
        children: [
            {
                path: '/profile',
                name: 'profile',
                component: () => import('@/views/Profile.vue')
            },
            {
                path: '/question',
                name: 'question',
                component: () => import('@/views/QuestionPage.vue')
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

// 全局导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next();
    } else {
        let userToken = localStorage.getItem("user_token");
        if (userToken) {
            next();
        } else {
            next({path: "/login"})
        }
    }
});

export default router
