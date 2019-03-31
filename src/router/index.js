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
          path: '',
          redirect: '/pages/home'
        },
        {
          path: 'home',
          name: 'HomeView',
          component: HomeView
        },
        {
          path: 'hall',
          name: 'Hallview',
          component: Hallview
        },
        {
          path: 'gonglue',
          name: 'Gonglue33',
          component: Gonglue33
        },
        {
          path: 'personal',
          name: 'Personalview',
          component: Personalview
        }
      ]
    },
    {
      path: 'detail/:id',
      name: 'DetailView',
      component: DetailView
    }, {
      path: 'detail-1',
      name: 'DetailDetail',
      component: DetailDetail
    },
    {
      path: '/pages/:classify/hallinfo/:id',
      name: 'HallInfoview',
      components: {
        subject: HallInfoview
      }
    },
    {
      path: '/search',
      name: 'SearchView',
      components: {
        default: PagesView,
        search: SearchView
      }
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterView
    },
    {
      path: '/school',
      name: 'School',
      component: School
    },
    {
      path: '/estimate',
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
