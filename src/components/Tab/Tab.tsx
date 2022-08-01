import { defineComponent, onUpdated, PropType } from 'vue';
import s from './Tabs.module.scss';
export const Tabs = defineComponent({
  props: {
    selected: {
      type: String as PropType<String>
    },
    classPrefix: {
      type: String
    },
  },
  emits: ['update:selected'],
  setup: (props, context) => {
    const tabs = context.slots.default?.()
    if (!tabs) return () => null
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].type !== Tab) {
        throw new Error('<Tabs> only accepts <Tab> as children')
      }
    }
    const cp = props.classPrefix //支持传入类名 自定义样式
    return () => (
      <div class={[s.tabs, cp + '_tabs']}>
        <ol class={[s.tabs_nav, cp + '_tabs_nav']}>
          {tabs.map(tab =>
            <li class={[tab.props?.label === props.selected ? [s.selected, cp + '_selected'] : '', cp + '_tabs_nav_item']}
              onClick={()=>context.emit('update:selected', tab.props?.label)}
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