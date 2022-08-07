import { defineComponent, PropType } from 'vue';
import { ItemSummary } from './components/ItemSummary';
import { TimeTabsLayout } from '@/components/TimeTabsLayout/TimeTabsLayout';
export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>

    }

  },
  setup: (props, context) => {
    return () => <TimeTabsLayout component={ItemSummary} />
  }
});