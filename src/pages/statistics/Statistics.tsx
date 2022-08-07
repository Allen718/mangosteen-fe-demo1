import { TimeTabsLayout } from '@/components/TimeTabsLayout/TimeTabsLayout';
import { defineComponent, PropType } from 'vue';
import { Charts } from './componets/charts/Charts';
import s from './Statistics.module.scss';
export const Statistics = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <TimeTabsLayout component={Charts} />
      </div>
    )
  }
})