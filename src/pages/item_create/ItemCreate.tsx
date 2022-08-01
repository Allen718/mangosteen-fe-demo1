import { defineComponent, PropType, ref } from 'vue';
import { Icon } from '../../components/Icon/Icon';
import { MainLayout } from '../../components/Layout/MainLayout';
import { Tabs, Tab } from '../../components/Tab/Tab';
import { InputPad } from './components/InputPad';
import s from './ItemCreate.module.scss';
export const ItemCreate = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const refTab = ref('支出')
    const refExpensesTags = ref([
      { id: 1, name: '餐费', sign: '$', catogary: 'expenses' },
      { id: 2, name: '打车', sign: '$', catogary: 'expenses' },
      { id: 3, name: '外卖', sign: '$', catogary: 'expenses' },
      { id: 4, name: '聚餐', sign: '$', catogary: 'expenses' },
      { id: 3, name: '外卖', sign: '$', catogary: 'expenses' },
      { id: 4, name: '聚餐', sign: '$', catogary: 'expenses' },
      { id: 3, name: '外卖', sign: '$', catogary: 'expenses' },
      { id: 4, name: '聚餐', sign: '$', catogary: 'expenses' },
      { id: 3, name: '外卖', sign: '$', catogary: 'expenses' },
      { id: 4, name: '聚餐', sign: '$', catogary: 'expenses' },
      { id: 3, name: '外卖', sign: '$', catogary: 'expenses' },
      { id: 4, name: '聚餐', sign: '$', catogary: 'expenses' },
      { id: 3, name: '外卖', sign: '$', catogary: 'expenses' },
      { id: 4, name: '聚餐', sign: '$', catogary: 'expenses' },
      { id: 3, name: '外卖', sign: '$', catogary: 'expenses' },
      { id: 4, name: '聚餐', sign: '$', catogary: 'expenses' },
      { id: 3, name: '外卖', sign: '$', catogary: 'expenses' },
      { id: 4, name: '聚餐', sign: '$', catogary: 'expenses' },
      { id: 3, name: '外卖', sign: '$', catogary: 'expenses' },
      { id: 4, name: '聚餐', sign: '$', catogary: 'expenses' },
      { id: 3, name: '外卖', sign: '$', catogary: 'expenses' },
      { id: 4, name: '聚餐', sign: '$', catogary: 'expenses' },
      { id: 3, name: '外卖', sign: '$', catogary: 'expenses' },
      { id: 4, name: '聚餐', sign: '$', catogary: 'expenses' },
      { id: 3, name: '外卖', sign: '$', catogary: 'expenses' },
      { id: 4, name: '聚餐', sign: '$', catogary: 'expenses' },
    ])
    const refIncomeTags = ref([
      { id: 1, name: '工资', sign: '$', catogary: 'income' },
      { id: 2, name: '彩票', sign: '$', catogary: 'income' },
      { id: 3, name: '股票', sign: '$', catogary: 'income' },
      { id: 4, name: '基金', sign: '$', catogary: 'income' },
    ])
    return () => (
      <div class={s.wrapper}>
        <MainLayout>{{
          title: () => '记一笔',
          icon: () => <Icon name="left" />,
          default: () => <div class={s.wrapper}>
            <Tabs
              v-model:selected={refTab.value}
              onUpdate:selected={(label) =>refTab.value = label}
              // onUpdatedTab={(label) => refTab.value = label}
               >
              <Tab label="支出" class={s.tags_wrapper} >
                <div class={s.tag}>
                  <div class={s.sign}>
                    <Icon name="add" class={s.createTag} />
                  </div>
                  <div class={s.name}>
                    新增
                  </div>
                </div>
                {refExpensesTags.value.map(tag =>
                  <div class={[s.tag, s.selected]}>
                    <div class={s.sign}>
                      {tag.sign}
                    </div>
                    <div class={s.name}>
                      {tag.name}
                    </div>
                  </div>
                )}
              </Tab>
              <Tab label="收入" class={s.tags_wrapper}>
                <div class={s.tag}>
                  <div class={s.sign}>
                    <Icon name="add" class={s.createTag} />
                  </div>
                  <div class={s.name}>
                    新增
                  </div>
                </div>
                {refIncomeTags.value.map(tag =>
                  <div class={[s.tag, s.selected]}>
                    <div class={s.sign}>
                      {tag.sign}
                    </div>
                    <div class={s.name}>
                      {tag.name}
                    </div>
                  </div>
                )}
              </Tab>
            </Tabs>
            <div class={s.inputPad_wrapper}>
              <InputPad />
            </div>
          </div>
        }}
        </MainLayout>
      </div>
    )
  }
})