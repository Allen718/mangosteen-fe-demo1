import { defineComponent } from 'vue';
import style from '../Welcome.module.scss';
export const WelcomeLayout = defineComponent({
  setup: (props, context) => {
    const { slots } = context
    return () => (
      <div class={style.main}>
        <div class={style.card}>
          {slots.icon?.()}
          {slots.title?.()}
        </div>
        <div class={style.footer}>
          {slots.buttons?.()}
        </div>
      </div>
    )
  }
})