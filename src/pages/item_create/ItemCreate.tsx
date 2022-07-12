import { defineComponent, PropType, ref } from 'vue';
import { Icon } from '../../components/Icon/Icon';
import { MainLayout } from '../../components/Layout/MainLayout';
import { Tabs, Tab } from '../../components/Tab/Tab';
import s from './ItemCreate.module.scss';
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refTab = ref('支出')
    return () => (
      <div class={s.wrapper}>
        <MainLayout>{{
          title: () => '记一笔',
          icon: () => <Icon name="left" />,
          default: () => <Tabs selected={refTab.value} onUpdatedTab={(label) => refTab.value = label}>
            <Tab label="支出" >支出</Tab>
            <Tab label="收入" >收入</Tab>
          </Tabs>
        }}</MainLayout>
      </div>
    )
  }
})