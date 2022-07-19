import { defineComponent, PropType } from 'vue';
import { Icon } from '../../../components/Icon/Icon';
import s from './InputPad.module.scss';
export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const buttons = [
      { text: '1' },
      { text: '2' },
      { text: '3' },
      { text: '清空' },
      { text: '4' },
      { text: '5' },
      { text: '6' },
      { text: '+' },
      { text: '7' },
      { text: '8' },
      { text: '9' },
      { text: '-' },
      { text: '.' },
      { text: '0' },
      { text: '删除' },
      { text: '完成' },

    ];
    return () => (
      <>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name="date" class={s.icon} />
            <span>2022-01-01</span>
          </span>
          <span class={s.amount}>12345</span>
        </div>
        <div class={s.buttons}>
          {buttons.map(button => <button >{button.text}</button>)}
        </div>
      </>
    )
  }
})