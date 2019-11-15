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
        component: Home,
        redirect: 'user-profile',
        children: [
            {
                path: '/user-profile',
                name: 'user-profile',
                component: () => import('@/views/Profile.vue')
            }, {
                path: '/question-list',
                name: 'question-list',
                component: () => import('@/views/QuestionList.vue')
            }, {
                path: '/question-edit',
                name: 'question-edit',
                component: () => import('@/views/QuestionEdit.vue')
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
