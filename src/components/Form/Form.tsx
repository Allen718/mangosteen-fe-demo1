import { Time } from '@/utils/time';
import { DatetimePicker, Popup } from 'vant';
import { defineComponent, PropType, computed, handleError, ref } from 'vue';
import { Button } from '../Button/Button';
import { EmojiListSelect } from '../EmojiListSelect/EmojiListSelect';
import s from './Form.module.scss';
export const Form = defineComponent({
  props: {
    onSubmit: {
      type: Function as PropType<(e: Event) => void>,
    }
  },
  setup: (props, context) => {
    return () => (
      <form class={s.form} onSubmit={props.onSubmit}>
        {context.slots.default?.()}
        {context.slots.actions?.()}
      </form>
    )
  }
})

export const FormItem = defineComponent({
  props: {
    label: {
      type: String
    },
    modelValue: {
      type: [String, Number]
    },
    type: {
      type: String as PropType<'text' | 'emojiSelect' | 'date' | 'validateCode' | 'select'>,
    },
    isHasError: {
      type: Boolean,
      defaultValue: false,
    },
    options: {
      type: Array as PropType<{ text: string, value: string | number }[]>
    },
    error: {
      type: String,
    },
    placeholder: String,
    onClick: Function as PropType<() => void>,
    countFrom: {
      type: Number,
      default: 10
    }

  },
  setup: (props, context) => {
    const refDateVisible = ref(false);
    //计时器数字
    const countRef = ref<number>(props.countFrom)
    //计时器
    const timer = ref<number>();
    //是否正在计时
    const isCounting = computed(() => !!timer.value)

    //开始计时
    const startCount = () => {
      timer.value = window.setInterval(() => {
        if (countRef.value > 0) {
          countRef.value -= 1;
        } else if (countRef.value === 0) {
          timer.value = undefined
          countRef.value = props.countFrom
          clearInterval(timer.value)
        }
      }, 1000)
    }

    context.expose({ startCount })
    const content = computed(() => {
      switch (props.type) {
        case 'text':
          return <input
            value={props.modelValue}
            placeholder={props.placeholder}
            onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
            class={[s.formItem, s.input, props.isHasError && s.error]} />
        case 'emojiSelect':
          return <EmojiListSelect
            v-model:value={props.modelValue}
            // modelValue={props.modelValue?.toString()}
            onUpdate:value={value => context.emit('update:modelValue', value)}
            error={props.isHasError}
          />
        case 'date':
          return <>
            <input
              value={props.modelValue}
              readonly
              placeholder={props.placeholder}
              onClick={() => {
                refDateVisible.value = true
              }}
              class={[s.formItem, s.input, props.isHasError && s.error]}
            />
            <Popup position='bottom' v-model:show={refDateVisible.value}>
              <DatetimePicker value={props.modelValue} type="date" title="选择年月日"
                onConfirm={(date: Date) => {
                  context.emit('update:modelValue', new Time(date).format())
                  refDateVisible.value = false
                }}
                onCancel={() => refDateVisible.value = false} />
            </Popup>
          </>

        case 'validateCode':
          return <> <input
            placeholder={props.placeholder}
            value={props.modelValue}
            onInput={(e: any) => context.emit('update:modelValue', e.target.value)}
            class={[s.formItem, s.input, s.validationCodeInput, props.isHasError && s.error]} />
            <Button class={s.validationCodeButton} onClick={props.onClick} disabled={isCounting.value}>{isCounting.value ? countRef.value : '发送验证码'}</Button>
          </>
        case 'select':
          return <select
            class={[s.formItem, s.input, s.select, props.isHasError && s.error]}
          >
            {
              props.options?.map(option => <option value={option.value} class={s.option} >{option.text}</option>)
            }
          </select >
        case undefined:
          return context.slots.default?.()
      }
    })
    return () => {
      return <div class={s.formRow}>
        <label class={s.formLabel}>
          {props.label &&
            <span class={s.formItem_name}>{props.label}</span>
          }
          <div class={s.formItem_value}>
            {content.value}
          </div>
          {props.error ?
            <div class={s.formItem_errorHint}>
              <span>{props.error}</span>
            </div> : '  '
          }
        </label>
      </div>
    }
  }
})