import { defineComponent } from 'vue';
import style from '../Welcome.module.scss'
import cloud from '../../../assets/icons/cloud.svg'
export const Forth = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={style.card}>
        <img src={cloud} />
        <p>云备份</p>
        <p>再也不怕数据丢失</p>
      </div>
    )
  }
})