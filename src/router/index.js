import Vue from 'vue'
import VueRouter from 'vue-router'

const index = () =>
    import ('../components/index')
const articles = () =>
    import ('../components/homepageleft/articles')
const articlesContent = () =>
    import ('../components/homepageleft/articlesContent')
const documentFiling = () =>
    import ('../components/DocumentFiling/DocumentFiling')
const aboutBlog = () =>
    import ('../components/aboutBlog/AboutBlog')
const friendsLink = () =>
    import ('../components/friendslink/FriendsLink')
const login = () =>
    import ('../components/admin/login')
const home = () =>
    import ('../components/admin/home/Home')
const adminMyinfo = () =>
    import ('../components/admin/myInfo/MyInfo')
const adminArticle = () =>
    import ('../components/admin/article/Article')
const adminAboutBlog = () =>
    import ('../components/admin/aboutBlog/AboutBlog')
const adminFriendsLink = () =>
    import ('../components/admin/friendsLink/FriendsLink')
const adminIndex = () =>
    import ('../components/admin/index')

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: index,
        children: [{
                path: '',
                component: articles,
                meta: {
                    roles: true
                }
            },
            {
                path: 'articles/:id',
                component: articlesContent,
                meta: {
                    roles: true
                }
            },
            {
                path: "filling",
                component: documentFiling,
                meta: {
                    roles: true
                }
            },
            {
                path: "friendsLink",
                component: friendsLink,
                meta: {
                    roles: true
                }
            },
            {
                path: "aboutBlog",
                component: aboutBlog,
                meta: {
                    roles: true
                }
            },
        ]
    },
    {
        path: '/admin',
        component: login
    },
    {
        path: '/home',
        component: home,
        children: [{
            path: '',
            component: adminIndex,
        }, {
            path: 'adminIndex',
            component: adminIndex,
        }, {
            path: 'adminMyinfo',
            component: adminMyinfo,
        }, {
            path: 'adminArticle',
            component: adminArticle,
        }, {
            path: 'adminAboutBlog',
            component: adminAboutBlog,
        }, {
            path: 'adminFriendsLink',
            component: adminFriendsLink,
        }]
    },
    {
        path: '*',
        redirect: '/'
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 路由导航
router.beforeEach((to, from, next) => {
    if (to.path === '/admin' || to.meta.roles) {
        next();
    } else {
        let token = localStorage.getItem('Authorization');
        if (token === null || token === '') {
            next('/admin');
        } else {
            next();
        }
    }
});

export default router