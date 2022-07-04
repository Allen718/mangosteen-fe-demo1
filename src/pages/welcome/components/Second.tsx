import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import clock from '../../../assets/icons/clock.svg'
import { WelcomeLayout } from './WelcomeLayout';
import style from '../Welcome.module.scss'

export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>
        {{
          icon: () => <img class={style.icon} src={clock} />,
          title: () => <h2>每日提醒<br />不遗漏每一笔账单</h2>,
          buttons: () => <>
            <RouterLink class={style.fake} to="/start" >跳过</RouterLink>
            <RouterLink to="/welcome/third" >下一页</RouterLink>
            <RouterLink  to="/start" >跳过</RouterLink>
          </>
        }}
      </WelcomeLayout>
    )
  }
})