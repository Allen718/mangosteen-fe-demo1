import { defineComponent, PropType } from 'vue';
import { Navbar } from '../Navbar/Navbar';
import s from './MainLayout.module.scss';
export const MainLayout = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.layout}>
        <Navbar>{
          {
            default: () => context.slots.title?.(),
            icon: () => context.slots.icon?.(),
          }
        }</Navbar>
        {context.slots.default?.()}
      </div>
    )
  }
})