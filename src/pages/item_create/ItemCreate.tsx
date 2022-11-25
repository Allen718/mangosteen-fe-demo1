import { defineComponent, PropType, reactive } from 'vue';
import { Icon } from '../../components/Icon/Icon';
import { MainLayout } from '../../components/Layout/MainLayout';
import { Tabs, Tab } from '../../components/Tab/Tab';
import { InputPad } from './components/InputPad';
import s from './ItemCreate.module.scss';
import { Tags } from './components/Tags';
import { request } from '@/utils/request';
import { useRouter } from 'vue-router';


export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const router=useRouter()
    const formData = reactive({
      tagId: '',
      kind: '支出',
      happendAt: new Date().toISOString(),
      amount: 0,
    })
    const onSubmit = async () => {
      await request.post('/items', formData,
        { params: { _mock: 'itemCreate' } }
      ).catch(onerror)
      router.push('/item')
    }
    return () => (
      <div class={s.wrapper}>
        <MainLayout>{{
          title: () => '记一笔',
          icon: () => <Icon name="left" />,
          default: () => <div class={s.wrapper}>
            <Tabs
              v-model:selected={formData.kind}
              onUpdate:selected={(label) => formData.kind = label}
            // onUpdatedTab={(label) => refTab.value = label}
            >
              <Tab label="支出"  >
                <Tags kind="expenses" v-model:selected={formData.tagId} />
              </Tab>
              <Tab label="收入">
                <Tags kind="incomes" v-model:selected={formData.tagId} />
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad v-model:happendAt={formData.happendAt} v-model:amount={formData.amount} onSubmit={onSubmit} />
            </div>
          </div>
        }}
        </MainLayout>
      </div>
    )
  }
})