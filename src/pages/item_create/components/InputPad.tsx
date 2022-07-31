import { defineComponent, PropType, ref } from 'vue';
import { DatetimePicker, Popup } from 'vant';
import { Time} from '../../../utils/time';
import { Icon } from '../../../components/Icon/Icon';
import s from './InputPad.module.scss';
export const InputPad = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const buttons = [
      { text: '1' },
      { text: '2' },
      { text: '3' },
      { text: '清空' },
      { text: '4' },
      { text: '5' },
      { text: '6' },
      { text: '+' },
      { text: '7' },
      { text: '8' },
      { text: '9' },
      { text: '-' },
      { text: '.' },
      { text: '0' },
      { text: '删除' },
      { text: '完成', },

    ];
    const refShowPop = ref(false);
    const refDate = ref();
    const refAmount = ref('0');
    const handleSelectDate = (value: Date) => {
      refDate.value = value;
      refShowPop.value = false
    };
    const handleAppendText = (n: string) => {
      const dotIndex = refAmount.value.indexOf('.');
      //限制位数
      if (refAmount.value.length >= 13) {
        return
      }
      //保留小数点后两位
      if (dotIndex >= 0 && refAmount.value.length - dotIndex > 2) {
        return
      }
      if (n === '0') {
        if (refAmount.value === '0') {
          return;
        }
      } else if (n === '.') {
        if (dotIndex >= 0) {
          return;
        }
      } else {
        if (refAmount.value === '0') {
          return refAmount.value = n
        }
      }

      refAmount.value += n
    };
    return () => (
      <>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name="date" class={s.icon} />
            <span>
              <span onClick={() => refShowPop.value = true}>{new Time(refDate.value).format('YYYY-MM-DD')}</span>
              <Popup position='bottom' v-model:show={refShowPop.value}>
                <DatetimePicker
                  // v-model={refDate.value}
                  value={refDate.value}
                  type="date"
                  title="选择年月日"
                  defaultValue={refDate.value}
                  onConfirm={handleSelectDate}
                  onCancel={() => refShowPop.value = false}
                />
              </Popup>
            </span>
          </span>
          <span class={s.amount}>{refAmount.value}</span>
        </div>
        <div class={s.buttons}>
          {buttons.map(button => <button onClick={() => {
            if (button.text === '清空') {
              return refAmount.value = '0'
            }
            handleAppendText(button.text)
          }}>{button.text}</button>)}
        </div>
      </>
    )
  }
})