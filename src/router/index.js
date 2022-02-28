import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [

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
              nav:() => import(/* webpackChunkName: "Questions" */ '../components/user-space/moment-nav.vue'),
              default:() => import(/* webpackChunkName: "Questions" */ '../components/user-space/moment-list.vue'),
            }
          },
          {
            path: 'edit',
            name: 'EditUser',
            component: () => import(/* webpackChunkName: "Questions" */ '../components/user-space/user-edit.vue'),
          },
        ]
      }
    ]
  },
  {
    path: '/edit/:id?',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "Questions" */ '../views/edit.vue'),
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
