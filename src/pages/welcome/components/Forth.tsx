import { defineComponent } from 'vue';
import style from '../Welcome.module.scss'
export const Forth = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={style.card}>
        <svg>
          <use xlinkHref='#cloud'></use>
        </svg>
        <h2>云备份<br />再也不怕数据丢失</h2>
      </div>
    )
  }
})