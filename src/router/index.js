import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [

  {
    path: '/',
    redirect:'/home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/main.vue'),
    children:[
      {
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "QuestionDetail" */ '../views/home.vue'),
      },
      {
        path: 'moment',
        name: 'Moment',
        component: () => import(/* webpackChunkName: "ArticleDetail" */ '../views/moment.vue'),
      },
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
        path:'search/:key',
        name:'Search',
        components:{
          aside:() => import(/* webpackChunkName: "UserDetail" */ '../components/home-aside/home-aside.vue'),
          default:() => import(/* webpackChunkName: "Search" */ '../views/search.vue')
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
          return { name: 'UserMoment', params: { id:to.params.id,channel:'question' } }
        },
        children:[
          {
            path: ':channel',
            name: 'UserMoment',
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
