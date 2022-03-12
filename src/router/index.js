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
        components:{
          aside:() => import(/* webpackChunkName: "UserDetail" */ '../components/home-aside/home-aside.vue'),
          default:() => import(/* webpackChunkName: "Questions" */ '../views/question.vue'),
        } 
      },
      {
        path: 'articles',
        name: 'Articles',
        components:{
          aside:() => import(/* webpackChunkName: "UserDetail" */ '../components/home-aside/home-aside.vue'),
          default:() => import(/* webpackChunkName: "Articles" */ '../views/article.vue'),
        } 
      },
      {
        path: 'question/:id',
        name: 'QuestionDetail',
        component: () => import(/* webpackChunkName: "QuestionDetail" */ '../views/question-detail.vue'),
      },
      {
        path: 'article/:id',
        name: 'ArticleDetail',
        component: () => import(/* webpackChunkName: "ArticleDetail" */ '../views/article-detail.vue'),
      },
      {
        path: 'user/:id',
        name: 'UserDetail',
        component: () => import(/* webpackChunkName: "UserDetail" */ '../views/user-detail.vue'),
        redirect: to => {
          return { name: 'Moment', params: { id:to.params.id,channel:'question' } }
        },
        children:[
          {
            path: ':channel',
            name: 'Moment',
            components:{
              nav:() => import(/* webpackChunkName: "UserDetail" */ '../components/user-space/moment-nav.vue'),
              default:() => import(/* webpackChunkName: "UserDetail" */ '../components/user-space/moment-list.vue'),
            },
          },
          {
            path: 'edit',
            name: 'EditUser',
            component: () => import(/* webpackChunkName: "UserDetail" */ '../components/user-space/user-edit.vue'),
          },
        ]
      },
      {
        path:'search/:key',
        name:'Search',
        component: () => import(/* webpackChunkName: "Search" */ '../views/search.vue'),
      }
    ]
  },
  {
    path: '/edit/:id?',
    name: 'Edit',
    component: () => import(/* webpackChunkName: "Edit" */ '../views/edit.vue'),
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
