import { defineComponent } from 'vue';
import pig from '../../../assets/icons/pig.svg';
import style from '../Welcome.module.scss';

export const First = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={style.card}>
        <img src={pig} class={style.icon} />
        <p>会挣钱</p>
        <p>还要会省钱</p>
      </div>
    )
  }
})