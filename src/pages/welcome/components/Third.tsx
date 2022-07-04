import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import chart from '../../../assets/icons/charts.svg';
import { WelcomeLayout } from './WelcomeLayout';
import style from '../Welcome.module.scss';

export const Third = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>{{
        icon: () => <img src={chart} />,
        title: () => <h2>数据可视化<br />收支一目了然</h2>,
        buttons: () => <>
          <RouterLink to="/start" class={style.fake}></RouterLink>
          <RouterLink to="/welcome/forth">下一页</RouterLink>
          <RouterLink to="/start">跳过</RouterLink>
        </>
      }
      }</WelcomeLayout >
    )
  }
})