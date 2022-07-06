import { FunctionalComponent } from 'vue';
import { RouterLink } from 'vue-router';
import style from '../Welcome.module.scss';

export const ForthAction: FunctionalComponent = () => {
  return (
    <>
      <RouterLink class={style.fake} to='/satrt'></RouterLink>
      <RouterLink to='/welcome/2' class={style.fake}>下一页</RouterLink>
      <RouterLink to='/start'>进入</RouterLink>
    </>
  )
}

ForthAction.displayName = 'ForthAction'