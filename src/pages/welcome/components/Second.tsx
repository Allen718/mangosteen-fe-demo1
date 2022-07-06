import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import clock from '../../../assets/icons/clock.svg'
import style from '../Welcome.module.scss'

export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={style.card}>
      <svg>
          <use xlinkHref='#clock'></use>
        </svg>
      <h2>每日提醒<br />不遗漏每一笔账单</h2>
    </div>
    )
  }
})