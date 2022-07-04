import { FunctionalComponent } from 'vue';
import { RouterLink } from 'vue-router';
import pig from '../../../assets/icons/pig.svg';
import { WelcomeLayout } from './WelcomeLayout';
import style from '../Welcome.module.scss';

export const First: FunctionalComponent = () => {
  return <WelcomeLayout>{{
    icon: () => <img src={pig} />,
    title: () => <h2>会挣钱<br />还会省钱</h2>,
    buttons: () => <>
      <RouterLink class={style.fake} to="/start" >跳过</RouterLink>
      <RouterLink to="/welcome/second" >下一页</RouterLink>
      <RouterLink to="/start" >跳过</RouterLink>
    </>
  }}</WelcomeLayout>
}

First.displayName = 'First'