import { defineComponent } from 'vue';
import style from '../Welcome.module.scss';

export const Third = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={style.card}>
       <svg>
          <use xlinkHref='#charts'></use>
        </svg>
        <h2>数据可视化<br />收支一目了然</h2>
      </div>
    )
  }
})