import { request } from '../../utils/request';
import { defineComponent, PropType, ref, onMounted } from 'vue';
import { Icon } from '../../components/Icon/Icon';
import { MainLayout } from '../../components/Layout/MainLayout';
import { Tabs, Tab } from '../../components/Tab/Tab';
import { InputPad } from './components/InputPad';
import s from './ItemCreate.module.scss';
import { Tags } from './components/Tags';


export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refTab = ref('支出')
    const refTagId = ref<number>();
    const refHappendAt = ref<string>()
    const refAmount = ref<number>()
    return () => (
      <div class={s.wrapper}>
        <MainLayout>{{
          title: () => '记一笔',
          icon: () => <Icon name="left" />,
          default: () => <div class={s.wrapper}>
            <Tabs
              v-model:selected={refTab.value}
              onUpdate:selected={(label) => refTab.value = label}
            // onUpdatedTab={(label) => refTab.value = label}
            >
              <Tab label="支出"  >
                <Tags kind="expenses" v-model:selected={refTagId.value} />
              </Tab>
              <Tab label="收入">
                <Tags kind="incomes" v-model:selected={refTagId.value} />
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              {refHappendAt.value}
              {refAmount.value}
              <InputPad v-model:happendAt={refHappendAt.value} v-model:amount={refAmount.value} />
            </div>
          </div>
        }}
        </MainLayout>
      </div>
    )
  }
})