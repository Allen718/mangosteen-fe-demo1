import { FunctionalComponent } from 'vue';
import { RouterLink } from 'vue-router';
import style from '../Welcome.module.scss';
import { SkipFeatures } from './SkipFeatures';

export const ThirdAction: FunctionalComponent = () => {
  return (
    <>
      <RouterLink class={style.fake} to='/satrt'></RouterLink>
      <RouterLink to='/welcome/4'>下一页</RouterLink>
      <SkipFeatures />
      {/* <RouterLink to='/start'>跳过</RouterLink> */}
    </>
  )
}

ThirdAction.displayName = 'ThirdAction'