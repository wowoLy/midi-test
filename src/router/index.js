import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../view/test'),
    },
    {
      path: '/piano',
      name: 'piano',
      component: () => import('../view/piano'), //钢琴
    }
  ]
})
