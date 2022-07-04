import { defineComponent } from 'vue';
import style from '../Welcome.module.scss'
import { WelcomeLayout } from './WelcomeLayout';
import cloud from '../../../assets/icons/cloud.svg'
import { RouterLink } from 'vue-router';
export const Forth = defineComponent({
  setup: (props, context) => {

    return () => (
      <WelcomeLayout>
        {{
          icon: () => <img src={cloud} />,
          title: () => <h2>云备份<br />再也不怕数据丢失</h2>,
          buttons: () => <>
            <RouterLink to='/start' class={style.fake}>跳过</RouterLink>
            <RouterLink to='/start' class={style.fake} >跳过</RouterLink>
            <RouterLink to='/start' >进入</RouterLink>
          </>
        }}
      </WelcomeLayout>

    )
  }
})