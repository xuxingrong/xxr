import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index-index'
import Share from '@/components/share'
import Sk_fk from '@/components/sk-fk'
import Index_fk from '@/components/index-fk'
import Index_sk from '@/components/index-sk'
import Index_zd from '@/components/index-zd'
import Sk_zf from '@/components/sk-zf'
import Hhk from '@/components/hhk'
import Index_ewm from '@/components/index-ewm'
import Login from '@/components/login/login'
import Register from '@/components/login/register'
import Register_step1 from '@/components/login/register_step1'
import Register_step2 from '@/components/login/register_step2'
import Found from '@/components/login/found'
import Found_step1 from '@/components/login/found_step1'
import Found_step2 from '@/components/login/found_step2'
import Set from '@/components/login/set'
import Set_person from '@/components/login/set_person'
import Set_about from '@/components/login/set_about'
import Set_about_text from '@/components/login/set_about_text'
import Set_person_name from '@/components/login/set_person_name'
import Set_person_ewm from '@/components/login/set_person_ewm'
import Help from '@/components/login/help'
import Help_detail from '@/components/login/help_detail'
import Safe from '@/components/login/safe'
import Safe_login from '@/components/login/safe_login'
import Safe_pay_step1 from '@/components/login/safe_pay_step1'
import Safe_pay_step2 from '@/components/login/safe_pay_step2'
import Safe_pay_found from '@/components/login/safe_pay_found'
import Binding from '@/components/login/binding'
import Binding_phone from '@/components/login/binding_phone'
import Binding_phone_change from '@/components/login/binding_phone_change'
import Binding_phone_email_step1 from '@/components/login/binding_phone_email_step1'
import Binding_phone_email_step2 from '@/components/login/binding_phone_email_step2'
import Binding_phone_email_step3 from '@/components/login/binding_phone_email_step3'
 
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children:[
      {
        path: '/share',
        name: 'Share',
        component: Share,
      }
      ]
    },
    {
      path: '/zd',
      name: 'Index_zd',
      component: Index_zd
    },
    {
      path: '/zd/skzf/:id',
      name: 'Sk_zf',
      component: Sk_zf
    },
    {
      path: '/sk',
      name: 'Sk',
      component: Index_sk
    },
    {
      path: '/fk',
      name: 'Fk',
      component: Index_fk
    },
    {
      path: '/hhk',
      name: 'Hhk',
      component: Hhk,
      children:[
        {
          path: '/hhk/share',
          name: 'Share',
          component: Share,
        }
      ]
    },
    {
      path: '/sk/:ewm',
      name: 'EwmZ',
      component: Index_ewm
    },
    {
      path: '/hhk/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/hhk/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/hhk/register_step1',
      name: 'Register_step1',
      component: Register_step1
    },
    {
      path: '/hhk/register_step2',
      name: 'Register_step2',
      component: Register_step2
    },
    {
      path: '/hhk/found',
      name: 'found',
      component: Found
    },
    {
      path: '/hhk/found_step1',
      name: 'Found_step1',
      component: Found_step1
    },
    {
      path: '/hhk/found_step2',
      name: 'Found_step2',
      component: Found_step2
    },
    {
      path: '/hhk/set',
      name: 'Set',
      component: Set
    },
    {
      path: '/hhk/set_person',
      name: 'Set_person',
      component: Set_person
    },
    {
      path: '/hhk/set_about',
      name: 'Set_about',
      component: Set_about
    },
    {
      path: '/hhk/set_about_text',
      name: 'Set_about_text',
      component: Set_about_text,
    },
     {
      path: '/hhk/set_person_name',
      name: 'Set_person_name',
      component: Set_person_name,
    },
    {
      path: '/hhk/set_person_ewm',
      name: 'Set_person_ewm',
      component: Set_person_ewm,
    },
    {
      path: '/hhk/help_detail',
      name: 'Help_detail',
      component: Help_detail,
    },
    {
      path: '/hhk/help',
      name: 'Help',
      component: Help,
    },
    {
      path: '/hhk/safe',
      name: 'Safe',
      component: Safe,
    },
    {
      path: '/hhk/safe_login',
      name: 'Safe_login',
      component: Safe_login,
    },
    {
      path: '/hhk/safe_pay_step1',
      name: 'Safe_pay_step1',
      component: Safe_pay_step1,
    },
    {
      path: '/hhk/safe_pay_step2',
      name: 'Safe_pay_step2',
      component: Safe_pay_step2,
    },
     {
      path: '/hhk/safe_pay_found',
      name: 'Safe_pay_found',
      component: Safe_pay_found,
    },
    {
      path: '/hhk/binding',
      name: 'Binding',
      component: Binding,
    },
    {
      path: '/hhk/binding_phone',
      name: 'Binding_phone',
      component: Binding_phone,
    },
    {
      path: '/hhk/binding_phone_change',
      name: 'Binding_phone_change',
      component: Binding_phone_change,
    },
    {
      path: '/hhk/binding_phone_email_step1',
      name: 'Binding_phone_email_step1',
      component: Binding_phone_email_step1,
    },
    {
      path: '/hhk/binding_phone_email_step2',
      name: 'Binding_phone_email_step2',
      component: Binding_phone_email_step2,
    },
    {
      path: '/hhk/binding_phone_email_step3',
      name: 'Binding_phone_email_step3',
      component: Binding_phone_email_step3,
    },
  ]
})
