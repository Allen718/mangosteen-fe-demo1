import { Button } from '@/components/Button/Button';
import { Form, FormItem } from '@/components/Form/Form';
import validate, { Rules } from '@/utils/validate';
import { defineComponent, PropType, reactive } from 'vue';
import s from './TagForm.module.scss';
export const TagForm = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive({
      name: '',
      sign: '',
    })
    //关于错误
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({});
    const rules: Rules<typeof formData> = [
      { key: 'name', message: '必填', type: 'required' },
      { key: 'name', message: '校验不通过', type: 'pattern', regexp: /^.{1,4}$/ },
      { key: 'sign', message: '必选', type: 'required' },
    ];
    const handleSubmit = (e: Event) => {
      Object.assign(errors, {
        name: undefined,
        sign: undefined
      })
      Object.assign(errors, validate(formData, rules))
      e.preventDefault();
      console.log(formData, 'formData')
    };
    return () => (
      <div class={s.wrapper}>
        <Form onSubmit={handleSubmit}>
          {{
            default: () => <>
              <FormItem label='标签名'
                type="text"
                v-model={formData.name}
                isHasError={Boolean(errors['name'])}
                error={errors['name'] ? errors['name'][0] : '　'} />
              <FormItem label={`符号${formData.sign}`}
                type="emojiSelect" v-model={formData.sign}
                isHasError={Boolean(errors['sign'])}
                error={errors['sign'] ? errors['sign'][0] : '　'} />
            </>,
            actions: () => <div class={s.formItem_value}>
              <Button class={[s.formItem, s.button]} >确定</Button>
            </div>
          }}
        </Form>
      </div>
    )
  }
})