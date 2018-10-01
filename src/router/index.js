import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/MainPage/MainPage'
import Topic from '@/pages/Topic/Topic'
import User from '@/pages/User/User'
import Collection from '@/pages/Collection/Collection'
import UserReplies from '@/pages/UserReplies/UserReplies'
import UserTopic from '@/pages/UserTopic/UserTopic'
import CreateTopic from '@/pages/CreateTopic/CreateTopic'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },{
      path: '/topic/:id',
      name: 'Topic',
      component: Topic
    },{
      path: '/user/:id',
      name: 'User',
      component: User
    },{
      path: '/user/:id/collections',
      name: 'Collection',
      component: Collection
    },{
      path: '/user/:id/topic',
      name: 'UserTopic',
      component: UserTopic
    },{
      path: '/user/:id/replies',
      name: 'UserReplies',
      component: UserReplies
    },{
      path: '/createtopic',
      name: 'CreateTopic',
      component: CreateTopic
    }
  ]
})
