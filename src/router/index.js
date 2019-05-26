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
import MyEstimate from '../views/MyEstimate'
import MyGonglue from '../views/MyGonglue'
import GonglueDetail from '../views/GonglueDetail'
import EditGonglue from '../views/EditGonglue'
import HallAll from '../views/Hall_all'
import Dish from '../views/DishView'
import DishDetail from '../views/DishDetail'
import DishEsList from '../views/DishEsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/login'
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
      path: '/detail/:id/:dh_id', // 评论详情
      name: 'DetailView',
      component: DetailView
    },
    {
      path: '/detail_/:id',
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
      path: '/search', // 攻略详情
      name: 'SearchView',
      component: SearchView
    },
    {
      path: '/gonglue_detail/:id', // 攻略详情
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
      path: '/estimate', // 评价
      name: 'MyEstimate',
      component: MyEstimate
    },
    {
      path: '/mygonglue', // 评价MyGonglue
      name: 'MyGonglue',
      component: MyGonglue
    },
    {
      path: '/school', // 学校
      name: 'School',
      component: School
    },
    {
      path: '/estimate/:id', // 发表评论
      name: 'Estimate',
      component: Estimate
    },
    {
      path: '/dish/:id', // 菜品列表
      name: 'Dish',
      component: Dish
    },
    {
      path: '/dishdetail/:id', // 菜品列表
      name: 'DishDetail',
      component: DishDetail
    },
    {
      path: '/dishEsList/:id', // 菜品评价列表
      name: 'DishEsList',
      component: DishEsList
    },
    {
      path: '/hallall/:id', // 餐厅评论
      name: 'HallAll',
      component: HallAll
    },
    {
      path: '/edit_gonglue', // 发表攻略
      name: 'EditGonglue',
      component: EditGonglue
    },
    {
      path: '*',
      redirect: '/pages/'
    }
  ]
})
