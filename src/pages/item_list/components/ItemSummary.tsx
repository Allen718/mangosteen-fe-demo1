import { FloatButton } from '@/components/FloatButton/FloatButton';
import { defineComponent, PropType, ref, onMounted, reactive } from 'vue';
import s from './ItemSummary.module.scss';
import { request } from '../../../utils/request';
type Item = {
  id: number,
  name: string,
  userId: number,
  amount: number,
  tagInfo: { sign: string, tagId: number }[],
  happendAt: string,
  kind: 'incomes' | 'expenses'

};
export const ItemSummary = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      // required: true
    },
    endDate: {
      type: String as PropType<string>,
      // required: true
    }
  },
  setup: (props, context) => {
    const ItemList = ref<Item[]>([])
    const pageInfo = reactive({
      pageNum: 1,
      pageSize: 25,

    })
    const hasMore = ref(true)
    onMounted(async () => {
      if (!props.startDate || !props.endDate) {
        return
      }
      const response = await request.get<Resources<Item>>('/items', {
        happen_after: props.endDate,
        happen_before: props.startDate,
        pageNum: pageInfo.pageNum,
        _mock: 'itemIndex'
      })
      const { resources, pager } = response.data;
      ItemList.value.push(...resources)
      hasMore.value = pager.total - ((pager.pageNum - 1) * pager.pageSize + resources.length) > 0
    })
    return () => (
      <div class={s.wrapper}>
        <ul class={s.total}>
          <li><span>收入</span><span>128</span></li>
          <li><span>支出</span><span>99</span></li>
          <li><span>净收入</span><span>39</span></li>
        </ul>

        <ol class={s.list}>
          {
            ItemList.value?.map((item) =>
              <li>
                <div class={s.sign}>
                  <span>{item.tagInfo[0].sign}</span>
                </div>
                <div class={s.text}>
                  <div class={s.tagAndAmount}>
                    <span class={s.tag}>{item.name}</span>
                    <span class={s.amount}>￥{item.amount}</span>
                  </div>
                  <div class={s.time}>
                    {item.happendAt}
                  </div>
                </div>
              </li>)
          }

        </ol>
        <div class={s.more}>向下滑动加载更多</div>
        <FloatButton iconName='add' />
      </div>
    )
  }
})