import Vue from 'vue'
import Router from 'vue-router'

import PagesView from '../views/PagesView'
import HomeView from '../views/HomeView'
import Hallview from '../views/Hallview'
import Gonglue33 from '../views/Gonglue33'
import Personalview from '../views/Personalview'
import HallInfoview from '../views/HallInfoview'
import DetailView from '../views/DetailView'
import SearchView from '../views/SearchView'
import LoginView from '../views/LoginView'
import RegisterView from '../views/RegisterView'
import School from '../views/SchoolView'
import Estimate from '../views/Estimate'
import Swiper from '../components/Swiper'
import DetailDetail from '../views/DetailView.1'
import PersonalInfo from '../views/PersonalInfo'
import Favourite from '../views/Favourite'
import GonglueDetail from '../views/GonglueDetail'
import HallAll from '../views/Hall_all'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/pages/'
    },
    {
      path: '/pages',
      component: PagesView,
      children: [
        {
          path: '', // 默认主页
          redirect: '/pages/home'
        },
        {
          path: 'home',
          name: 'HomeView', // 主页
          component: HomeView
        },
        {
          path: 'hall', // 餐厅
          name: 'Hallview',
          component: Hallview
        },
        {
          path: 'gonglue', // 攻略
          name: 'Gonglue33',
          component: Gonglue33
        },
        {
          path: 'personal', // 我的
          name: 'Personalview',
          component: Personalview
        }
      ]
    }, // 单页面=============================================
    {
      path: 'detail/:id', // 评论详情
      name: 'DetailView',
      component: DetailView
    },
    {
      path: 'detail-1',
      name: 'DetailDetail',
      component: DetailDetail
    },
    {
      path: '/hallinfo/:id',
      name: 'HallInfoview', // 店铺详情
      components: {
        subject: HallInfoview
      }
    },
    {
      path: '/hallall/:id', // 评论详情
      name: 'HallAll',
      component: HallAll
    },
    {
      path: '/search', // 查找
      name: 'SearchView',
      components: {
        default: PagesView,
        search: SearchView
      }
    },
    {
      path: '/gonglue_detail', // 评论详情
      name: 'GonglueDetail',
      component: GonglueDetail
    },
    {
      path: '/login', // 登录
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/register', // 注册
      name: 'RegisterView',
      component: RegisterView
    },
    {
      path: '/info', // 个人信息
      name: 'PersonalInfo',
      component: PersonalInfo
    },
    {
      path: '/favourite', // 收藏
      name: 'Favourite',
      component: Favourite
    },
    {
      path: '/school', // 学校
      name: 'School',
      component: School
    },
    {
      path: '/estimate', // 发表评论
      name: 'Estimate',
      component: Estimate
    },
    {
      path: '*',
      redirect: '/pages/'
    },
    {
      path: '/swiper',
      name: 'Swiper',
      component: Swiper
    }
  ]
})
