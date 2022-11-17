import { prototype } from 'events';
import { defineComponent, PropType, ref, computed } from 'vue';
import style from './Button.module.scss';

export const Button = defineComponent({
  props: {
    onClick: {
      type: Function as PropType<(e: MouseEvent) => void>
    },
    level: {
      type: String as PropType<'important' | 'normal' | 'danger'>,
      default: 'important'
    },
    type: {
      type: String as PropType<'submit' | 'button'>,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup: (props, context) => {
    const selfDisabled = ref(false)
    const _selfDisabled = computed(() => {
      if (props.disabled) {
        return true
      } else if (selfDisabled.value) {
        return true
      } else {
        return false
      }
    })
    const onClickButton = () => {
      props.onClick?.()
      selfDisabled.value = true;
      setTimeout(()=>{
        selfDisabled.value = false;
      },500);

    }
    return () => (
      <button class={[style.button, style[props.level]]} type={props.type} onClick={onClickButton} disabled={props.disabled}>{
        context.slots.default?.()
      }</button>
    )
  }
})