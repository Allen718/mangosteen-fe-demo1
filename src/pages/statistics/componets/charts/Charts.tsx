import { Form, FormItem } from '@/components/Form/Form';
import { defineComponent, PropType, ref } from 'vue';
import { Bars } from '../barChart/BarChart';
import { LineChart } from '../lineChart/LineChart';
import { PieChart } from '../pieChart/PieChart';
import s from './Charts.module.scss';
export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: true
    },
    endDate: {
      type: String as PropType<string>,
      required: true
    }
  },
  setup: (props, context) => {
    const modelValue = ref();
    const options = [
      { text: '支出', value: 'expense' },
      { text: '收入', value: 'income' }
    ];
    return () => (
      <div class={s.wrapper}>
        <div class={s.select_wrapper}>
          <label>类型</label>
          <select
            class={s.select}
            value={modelValue}
            placeholder="请选择类型"
            onChange={(e: any) => {
              modelValue.value = e.target.value
            }}
          >
            {
              options.map(option => <option value={option.value} class={s.option} >{option.text}</option>)
            }
          </select >
        </div>
        <LineChart />
        <PieChart />
        <Bars />
      </div>
    )
  }
})