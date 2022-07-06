import { defineComponent } from 'vue';
import style from '../Welcome.module.scss'
import cloud from '../../../assets/icons/cloud.svg'
export const Forth = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={style.card}>
      <img src={cloud} />
      <h2>云备份<br />再也不怕数据丢失</h2>
    </div>
    )
  }
})