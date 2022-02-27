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
        path: 'question/:id',
        name: 'QuestionDetail',
        component: () => import(/* webpackChunkName: "Questions" */ '../views/question-detail.vue'),
      },
      {
        path: 'article/:id',
        name: 'ArticleDetail',
        component: () => import(/* webpackChunkName: "Questions" */ '../views/article-detail.vue'),
      },
      {
        path: 'user/:id',
        name: 'UserDetail',
        component: () => import(/* webpackChunkName: "Questions" */ '../views/user-detail.vue'),
        redirect: to => {
          return { name: 'Moment', params: { id:to.params.id,channel:'question' } }
        },
        children:[
          {
            path: ':channel',
            name: 'Moment',
            components:{
              nav:() => import(/* webpackChunkName: "Questions" */ '../components/moment-list/moment-nav.vue'),
              default:() => import(/* webpackChunkName: "Questions" */ '../components/moment-list/moment-list.vue'),
            }
          },
          {
            path: 'edit',
            name: 'EditUser',
            component: () => import(/* webpackChunkName: "Questions" */ '../views/user-edit.vue'),
          },
        ]
      }
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
