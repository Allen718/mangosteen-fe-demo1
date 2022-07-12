import { defineComponent, onUpdated, PropType } from 'vue';
import s from './Tabs.module.scss';
export const Tabs = defineComponent({
  props: {
    selected: {
      type: String as PropType<String>
    },
    onUpdatedTab: {
      type: Function as PropType<(curentLabel: string) => void>
    },
  },
  setup: (props, context) => {
    const tabs = context.slots.default?.()
    if (!tabs) return () => null
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].type !== Tab) {
        throw new Error('<Tabs> only accepts <Tab> as children')
      }
    }
    return () => (
      <div class={s.tabs}>
        <ol class={s.tabs_nav}>
          {tabs.map(tab =>
            <li class={tab.props?.label === props.selected ? s.selected : ''}
              onClick={() => props.onUpdatedTab?.(tab.props?.label)}
            >
              {tab.props?.label}
            </li>)}
        </ol>
        <div >
        {tabs.find(item => item.props?.label === props.selected)}
        </div>
      </div>
    )
  }
})
export const Tab = defineComponent({
  props: {
    label: String
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        {context.slots.default?.()}
      </div>
    )
  }
})