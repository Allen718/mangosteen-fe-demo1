import { defineComponent, PropType } from 'vue';
import style from './Icon.module.scss';

export const Icon = defineComponent({
  props: {
    name: {
      type: String as PropType<'add' | 'chart' | 'clock' |
        'cloud' | 'mangosteen' | 'pig' | 'menu' | 'chart' | 'export' | 'notify'|'left'|'date'>
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>
    }
  },
  setup: (props, context) => {
    return () => (
      <svg class={style.icon} style={{ width: `${props?.width}px`, height: `${props?.height}px` }} onClick={props.onClick}>
        <use xlinkHref={`#${props.name}`}></use>
      </svg>
    )
  }
})