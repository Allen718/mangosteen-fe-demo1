import { defineComponent, PropType } from 'vue';
import s from './ItemList.module.scss';
import { MainLayout } from '../../components/Layout/MainLayout';
import { Icon } from '../../components/Icon/Icon';
export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}><MainLayout>{{
        title: () => '记一笔',
        icon: () => <Icon name="left" />,
        default: () => <div></div>
      }}</MainLayout></div>
    )
  }
})