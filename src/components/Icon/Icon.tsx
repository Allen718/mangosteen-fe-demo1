import { defineComponent, PropType } from 'vue';
import style from './Icon.module.scss';

export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<'add' | 'chart' | 'clock' | 'cloud' | 'mangosteen' | 'pig'|'menu'>
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  setup: (props, context) => {
    return () => (
      <svg class={style.icon} style={{ width: `${props?.width}px`, height: `${props?.height}px` }}>
        <use xlinkHref={`#${props.name}`}></use>
      </svg>
    )
  }
})