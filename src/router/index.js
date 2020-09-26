import Vue from 'vue'
import VueRouter from 'vue-router'

const index = () => import('../components/index')
const articles = () => import('../components/homepageleft/articles')
const articlesContent = () => import('../components/homepageleft/articlesContent')
const documentFiling = () => import('../components/DocumentFiling/DocumentFiling')
const aboutBlog = () => import('../components/aboutBlog/AboutBlog')
const friendsLink = () => import('../components/friendslink/FriendsLink')


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: index,
    children:[
      {
        path:'',
        component:articles,
      },
      {
        path:'articles/:id',
        component:articlesContent
      },
      {
        path: "filling",
        component:documentFiling
      },
      {
        path: "friendsLink",
        component:friendsLink
      },
      {
        path: "aboutBlog",
        component:aboutBlog
      },
    ]
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

export default router
