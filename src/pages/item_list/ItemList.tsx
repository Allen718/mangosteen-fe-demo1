import { defineComponent, PropType, ref, onUpdated } from 'vue';
import s from './ItemList.module.scss';
import { MainLayout } from '../../components/Layout/MainLayout';
import { Icon } from '../../components/Icon/Icon';
import { Tab, Tabs } from '@/components/Tab/Tab';
export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>

    }

  },
  setup: (props, context) => {
    const refTab = ref('本月');
    return () => (
      <div class={s.wrapper}><MainLayout>{{
        title: () => '山竹记账',
        icon: () => <Icon name="left" />,
        default: () => <div>
          <Tabs selected={refTab.value} onUpdatedTab={(label) => refTab.value = label} classPrefix="customTabs" >
            <Tab label='本月'></Tab>
            <Tab label="上个月"><div>上个月</div></Tab>
            <Tab label="今年"><div>今年</div></Tab>
            <Tab label="自定义时间"><div>自定义时间</div></Tab>
          </Tabs>
        </div>
      }}</MainLayout></div>
    )
  }
})