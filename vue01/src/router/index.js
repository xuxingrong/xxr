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
import wdsc_public from '@/components/wdsc/wdsc-index'
import wdsc_bb from '@/components/wdsc/wdsc-bb'
import wdsc_dp from '@/components/wdsc/wdsc-dp'
import lljl_index from '@/components/lljl/lljl-index'
import del_all from '@/components/lljl/del-all'
import hysj_index from '@/components/hysj/hysj-index'
import hyqy_index from '@/components/hysj/hyqy-index'
import hysj_tc from '@/components/hysj/hysj-tc'
import hysj_zftc from '@/components/hysj/hysj-zftc'
import hysj_zfmm from '@/components/hysj/hysj-zfmm'
import hysj_mmerror from '@/components/hysj/hysj-mmerror'
import hysj_zfsucc from '@/components/hysj/hysj-zfsucc'
import hysj_cg from '@/components/hysj/hysj-sjcg'
import wdyhq_index from '@/components/wdyhq/wdyhq-index'
import wdyhq_lists from '@/components/wdyhq/wdyhq-lists'
import add_index from '@/components/address/address-index'
import add_edit from '@/components/address/address-edit-add'
import add_sel from '@/components/address/address-select'
import add_del from '@/components/address/address-del'
import wddd_index from '@/components/wddd/wddd-index'
import wddd_lists from '@/components/wddd/wddd-lists'
import wddd_detail from '@/components/wddd/wddd-detail'
import qiandao from '@/components/qiandao/qd-index'
import qdts from '@/components/qiandao/qd-ts'
import zxkf from '@/components/zxkf'
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
import Set_person_ewmb from '@/components/login/set_person_ewmb'
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
import Mycard from '@/components/card/mycard'
import Mycard_add from '@/components/card/mycard-add'
import Mycard_xg from '@/components/card/mycard-xg'
import Mycard_bank from '@/components/card/mycard-bank'
import Mycard_phone1 from '@/components/card/mycard-phone1'
import Mycard_phone2 from '@/components/card/mycard-phone2'
import Mycard_phone_step1 from '@/components/card/mycard-phone_step1'
import Recommend from '@/components/other/recommend'
import Myintegral from '@/components/other/myintegral'
import Myintegral_rule from '@/components/other/myintegral-rule'
import Account from '@/components/other/account'
import Account_charge from '@/components/other/account-charge'
import Account_forget_step1 from '@/components/other/account-forget_step1'
import Account_forget_step2 from '@/components/other/account-forget_step2'
import Account_forget_step3 from '@/components/other/account-forget_step3'
import Account_success from '@/components/other/account-success'
import Withdraw from '@/components/other/withdraw'
import Withdraw_succ from '@/components/other/withdraw_succ'
import Withdraw_rule from '@/components/other/withdraw_rule'
import Withdraw_clist from '@/components/other/withdraw_clist'
import Hhk_rule from '@/components/login/hhk-rule'

 
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/hhk',
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
          name: 'hhkShare',
          component: Share,
        },
        {
          path: '/hhk/zxkf',
          name: 'zxkf',
          component: zxkf,  
        }
      ]
    },
    {
      path: '/sk/ewm',
      name: 'EwmZ',
      component: Index_ewm
    },
    {
      path: '/wdsc',
      name: 'Wdsc',
      component: wdsc_public,
      redirect: '/wdsc/bb',
      children:[
        {
          path: '/wdsc/bb',
          name: 'Wdsc_bb',
          component: wdsc_bb
        },
        {
          path: '/wdsc/dp',
          name: 'Wdsc_dp',
          component: wdsc_dp
        },
      ]
    },
    {
      path: '/lljl',
      name: 'Lljl',
      component: lljl_index,
      children:[
        {
          path: '/lljl/delall',
          name: 'delAll',
          component: del_all,
        }
      ]
    },
    {
      path: '/hysj',
      name: 'Hysj',
      component: hysj_index,
      children:[
        {
          path: 'share',
          name: 'hysjShare',
          component: Share,
        },
        {
          path: 'tc',
          name: 'hysjTc',
          component: hysj_tc,
        },
        {
          path: 'zftc',
          name: 'hysjZftc',
          component: hysj_zftc,
        },
        {
          path: 'zfmm',
          name: 'hysjZfmm',
          component: hysj_zfmm,
          children:[
            {
              path: 'mmerror',
              name: 'hysjMmerror',
              component: hysj_mmerror,
            }
          ]
        },
        {
          path: 'hysjcg/:hy_id',
          name: 'hysjcg',
          component: hysj_cg,
        }
      ]
    },
    {
      path: '/hyqy',
      name: 'Hyqy',
      component: hyqy_index
    },
    {
      path: '/hysj/zfsucc/:pay_id',
      name: 'hysjZfsucc',
      component: hysj_zfsucc,
    },
    {
      path: '/wdyhq',
      name: 'wdyhqIndex',
      component: wdyhq_index,
      redirect: '/wdyhq/wsy',
      children:[
        {
          path: '/wdyhq/:yhq_id',
          name: 'wdyhqLists',
          component: wdyhq_lists,
        }
      ]
    },
    {
      path: '/addlist',
      name: 'addList',
      component: add_index,
    },
    {
      path: '/addedit/:add_id',
      name: 'addEdit',
      component: add_edit,
      children:[
        {
          path: 'add_sel',
          name: 'addSel',
          component: add_sel
        }
      ]
    },
    {
      path: '/wddd',
      name: 'wddd',
      component: wddd_index,
      redirect: '/wddd/all',
      children:[
        {
          path: '/wddd/:dd_status',
          name: 'wddd_lists',
          component: wddd_lists
        }
      ]
    },
    {
      path: '/dddetail/:dd_id',
      name: 'wddd_detail',
      component: wddd_detail,
      children:[
        {
          path: '/dddetail/:dd_id/zxkf',
          name: 'zxkf',
          component: zxkf,  
        }
      ]
    },
    {
      path: '/qiandao',
      name: 'qiandao',
      component: qiandao,
      children:[
        {
          path: 'qdts',
          name: 'qdts',
          component: qdts
        }
      ]
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
      path: '/hhk/set_person_ewmb',
      name: 'Set_person_ewmb',
      component: Set_person_ewmb,
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
    {
      path: '/hhk/mycard',
      name: 'Mycard',
      component: Mycard,
    },
    {
      path: '/hhk/mycard-add',
      name: 'Mycard_add',
      component: Mycard_add,
      children:[{
          path: 'bank',
          name: 'Mycard_bank',
          component: Mycard_bank,
        }]
    },
    {
      path: '/hhk/mycard-xg/:bank_id',
      name: 'Mycard_xg',
      component: Mycard_xg,
      children:[{
          path: '/hhk/mycard-xg/:bank_id/bank',
          name: 'Mycard_bank',
          component: Mycard_bank,
        }]
    },
    {
      path: '/hhk/mycard-phone1',
      name: 'Mycard_phone1',
      component: Mycard_phone1,
    },
    {
      path: '/hhk/mycard-phone2',
      name: 'Mycard_phone2',
      component: Mycard_phone2,
    },
    {
      path: '/hhk/mycard-phone_step1',
      name: 'Mycard_phone_step1',
      component: Mycard_phone_step1,
    },
    {
      path: '/hhk/recommend',
      name: 'Recommend',
      component: Recommend,
    },
    {
      path: '/hhk/myintegral',
      name: 'Myintegral',
      component: Myintegral,
    },
    {
      path: '/hhk/myintegral-rule',
      name: 'Myintegral_rule',
      component: Myintegral_rule,
    },
     {
      path: '/hhk/account',
      name: 'Account',
      component: Account,
    },
    {
      path: '/hhk/account-charge',
      name: 'Account_charge',
      component: Account_charge,
      children:[
        {
          path: 'charge-step1',
          name: 'charge_step1',
          component: hysj_zftc,
        },
        {
          path: 'charge-step2',
          name: 'charge_step2',
          component: hysj_zfmm,
          children:[
           {
          	path: 'error',
          	name: 'error',
          	component: hysj_mmerror,
          }
          ]	
        }
      ]
    },
    {
      path: '/hhk/account-forget_step1',
      name: 'Account_forget_step1',
      component: Account_forget_step1,
    },
    {
      path: '/hhk/account-forget_step2',
      name: 'Account_forget_step2',
      component: Account_forget_step2,
    },
    {
      path: '/hhk/account-forget_step3',
      name: 'Account_forget_step3',
      component: Account_forget_step3,
    },
    {
      path: '/hhk/account-success',
      name: 'Account_success',
      component: Account_success,
    },
     {
      path: '/hhk/withdraw',
      name: 'Withdraw',
      component: Withdraw,
    },
    {
      path: '/hhk/withdraw_rule',
      name: 'Withdraw_rule',
      component: Withdraw_rule,
    },
     {
      path: '/hhk/withdraw_clist',
      name: 'Withdraw_clist',
      component: Withdraw_clist,
    },
    {
      path: '/hhk/withdraw_succ',
      name: 'Withdraw_succ',
      component: Withdraw_succ,
    },
    {
      path: '/hhk/hhk-rule',
      name: 'Hhk_rule',
      component: Hhk_rule,
    },
  ]
})
