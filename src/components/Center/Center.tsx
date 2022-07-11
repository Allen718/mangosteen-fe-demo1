import { defineComponent, PropType } from 'vue';
import s from './Center.module.scss';
const directionMap = {
  '-': 'horizontal',
  '|': 'vertical',
  'horizontal': 'horizontal',
  'vertical': 'vertical'
}
export const Center = defineComponent({
  props: {
    direction: {
      type: String as PropType<'-' | '|' | 'horizontal' | 'vertical'>,
      default: 'horizontal'
    }
  },
  setup: (props, context) => {
    const directionClass = directionMap[props.direction]
    return () => (
      <div class={[s.center, directionClass]}>
        {context.slots.default?.()}
      </div>
    )
  }
})