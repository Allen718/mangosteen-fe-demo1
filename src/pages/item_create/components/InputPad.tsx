import { defineComponent, PropType, ref } from 'vue';
import { DatetimePicker, Popup } from 'vant';
import { Time } from '../../../utils/time';
import { Icon } from '../../../components/Icon/Icon';
import s from './InputPad.module.scss';
export const InputPad = defineComponent({
  props: {
    happendAt: {
      type: String as PropType<string>
    },
    amount: {
      type: Number as PropType<number>
    },
    onSubmit: {
      type: Function as PropType<() => void>
    }
  },
  emits: ['update:happendAt', 'update:amount'],
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
    const refAmount = ref(props.amount ? (props.amount / 100).toString() : '0');
    const handleSelectDate = (value: Date) => {
      refShowPop.value = false
      context.emit('update:happendAt', value.toISOString())
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
    //一个数字一个数字的删除
    const handleDeleteAmout = () => {
      let value
      if (refAmount.value.length > 1) {
        value = refAmount.value.slice(0, -1)
      } else {
        value = '0'
      }
      refAmount.value = value
    }
    return () => (
      <>
        <div class={s.dateAndAmount}>
          <span class={s.date}>
            <Icon name="date" class={s.icon} />
            <span>
              <span onClick={() => refShowPop.value = true}>{new Time(props.happendAt).format('YYYY-MM-DD')}</span>
              <Popup position='bottom' v-model:show={refShowPop.value}>
                <DatetimePicker
                  value={props.happendAt}
                  type="date"
                  title="选择年月日"
                  defaultValue={props.happendAt}
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
            } else if (button.text === '完成') {

              context.emit('update:amount', Number(refAmount.value) * 100)
              props.onSubmit?.()
            } else if (button.text === '删除') {
              handleDeleteAmout()
            } else {
              handleAppendText(button.text)

            }

          }}>{button.text}</button>)}
        </div>
      </>
    )
  }
})