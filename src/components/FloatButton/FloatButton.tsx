import { defineComponent } from 'vue';
import { Icon } from '../Icon/Icon';
import style from './FloatButton.module.scss';

export const FloatButton = defineComponent({
  props: {
    iconName: {
      type: String
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={style.floatButton}>
        <Icon name="add" class={style.icon} />
      </div>
    )
  }
})