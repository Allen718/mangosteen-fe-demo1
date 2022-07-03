import { defineComponent } from 'vue';
import clock from '../../../assets/icons/clock.svg'
import style from '../Welcome.module.scss'

export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={style.card}>
        <img src={clock} />
        <p>每日提醒</p>
        <p>不会遗漏每一笔账单</p>
      </div>
    )
  }
})