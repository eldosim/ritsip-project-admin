import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import Index from '@/components/index/Index'
import Add from '@/components/add/Add'
import All from '@/components/all/All'
import Pays from '@/components/pays/Pays'
import Category from '@/components/category/Category'
import Users from '@/components/users/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path:'/home',
      component:Home,
      children:[
        {path:'index',component: Index},
        {path:"add",component:Add},
        {path:"all",component:All},
        {path:"pays",component:Pays},
        {path:"category",component:Category},
        {path:"users",component:Users}        
      ]
    }
  ]
})
