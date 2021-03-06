import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Register from '@/views/register'
import Index from '@/views/index'
import Home from '@/views/home/home'

import UserDetail from '@/views/user/detail'
import UserUpdate from '@/views/user/update'
import UserPassword from '@/views/user/password'

import Whitelist from '@/views/system/whitelist'
import Config from '@/views/system/config'
import Server from '@/views/system/server'
import Log from '@/views/system/log'
import UserPageList from '@/views/system/user'
import Role from '@/views/system/role'

import AccountIndex from '@/views/myplace/account/index'
import AccountOutsideList from '@/views/myplace/account/outside/list'
import AccountOutsideAdd from '@/views/myplace/account/outside/add'
import AccountCompanyList from '@/views/myplace/account/company/list'
import AccountCompanyAdd from '@/views/myplace/account/company/add'
import AccountProductList from '@/views/myplace/account/product/list'
import AccountProductAdd from '@/views/myplace/account/product/add'

import Word from '@/views/demo/word'
import Vuex from '@/views/demo/vuex'
import Compiler from '@/views/demo/compiler'
import Upload from '@/views/demo/upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '登录',
      component: Login
    },
    {
      path: '/register',
      name: '注册',
      component: Register
    },
    {
      path: '/exit',
      name: '退出',
      component: Login
    },
    {
      path: '/',
      name: '主页面',
      component: Index,
      redirect: '/home',
      children: [
        {path: '/home', name: '首页', component: Home, menuShow: true, meta:{requireAuth: true }},
        {path: '/home/user/detail', name: '个人信息查询', component: UserDetail, menuShow: true, meta:{requireAuth: true }},
        {path: '/home/user/update', name: '个人信息修改', component: UserUpdate, menuShow: true, meta:{requireAuth: true }},
        {path: '/home/user/password', name: '密码修改', component: UserPassword, menuShow: true, meta:{requireAuth: true }},
        {path: '/home/system/whitelist', name: '白名单管理', component: Whitelist, menuShow: true, meta:{requireAuth: true }},
        {path: '/home/system/config', name: '配置管理', component: Config, menuShow: true, meta:{requireAuth: true }},
        {path: '/home/system/server', name: '服务管理', component: Server, menuShow: true, meta:{requireAuth: true }},
        {path: '/home/system/log', name: '服务管理', component: Log, menuShow: true, meta:{requireAuth: true }},
        {path: '/home/system/user', name: '用户管理', component: UserPageList, menuShow: true, meta:{requireAuth: true }},
        {path: '/home/system/role', name: '角色管理', component: Role, menuShow: true, meta:{requireAuth: true }},
        {path: '/home/myplace/account', name: '三方账号管理', component: AccountIndex, redirect: '/home/myplace/account/outside/list', menuShow: true, meta:{requireAuth: true },
          children: [
            {path: '/home/myplace/account/outside/list', name: '三方账号查询', component: AccountOutsideList, menuShow: true, meta:{requireAuth: true }},
            {path: '/home/myplace/account/outside/add', name: '三方账号新增', component: AccountOutsideAdd, menuShow: true, meta:{requireAuth: true }},
            {path: '/home/myplace/account/company/list', name: '公司列表', component: AccountCompanyList, menuShow: true, meta:{requireAuth: true }},
            {path: '/home/myplace/account/company/add', name: '添加公司', component: AccountCompanyAdd, menuShow: true, meta:{requireAuth: true }},
            {path: '/home/myplace/account/product/list', name: '产品列表', component: AccountProductList, menuShow: true, meta:{requireAuth: true }},
            {path: '/home/myplace/account/product/add', name: '添加产品', component: AccountProductAdd, menuShow: true, meta:{requireAuth: true }},
          ]},
        {path: '/home/demo/word', name: 'word上传', component: Word, menuShow: true, meta:{requireAuth: true }},
        {path: '/home/demo/vuex', name: 'vuex示例', component: Vuex, menuShow: true, meta:{requireAuth: true }},
        {path: '/home/demo/compiler', name: '富文本编译器', component: Compiler, menuShow: true, meta:{requireAuth: true }},
        {path: '/home/demo/upload', name: '阿里云上传', component: Upload, menuShow: true, meta:{requireAuth: true }},
      ]
    }
  ]
})
