import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name:'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/login.vue'),
  },
  {
    path: '/',
    redirect:'questions',
    component: () => import(/* webpackChunkName: "Home" */ '../views/home.vue'),
    children:[
      {
        path: 'questions',
        name: 'Questions',
        component: () => import(/* webpackChunkName: "Questions" */ '../views/question.vue'),
      },
      {
        path: 'articles',
        name: 'Articles',
        component: () => import(/* webpackChunkName: "Articles" */ '../views/article.vue'),
      },
      {
        path: '/question/:id',
        name: 'QuestionDetail',
        component: () => import(/* webpackChunkName: "Questions" */ '../views/question-detail.vue'),
      },
      {
        path: '/article/:id',
        name: 'ArticleDetail',
        component: () => import(/* webpackChunkName: "Questions" */ '../views/article-detail.vue'),
      },
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
