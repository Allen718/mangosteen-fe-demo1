import { defineComponent } from 'vue';
import chart from '../../../assets/icons/charts.svg';
import style from '../Welcome.module.scss';

export const Third = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={style.card}>
        <img src={chart} />
        <p>数据可视化</p>
        <p>收支一目了然</p>
      </div>
    )
  }
})