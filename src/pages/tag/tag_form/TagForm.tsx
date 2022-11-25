import { Button } from '@/components/Button/Button';
import { Form, FormItem } from '@/components/Form/Form';
import validate, { hasError, Rules } from '@/utils/validate';
import { defineComponent, PropType, reactive } from 'vue';
import s from './TagForm.module.scss';
import { request } from '../../../utils/request';
import { useRoute, useRouter } from 'vue-router';
export const TagForm = defineComponent({
  setup: (props, context) => {
    const route = useRoute();
    const router = useRouter()
    const formData = reactive({
      name: '',
      sign: '',
      kind: route.query.kind!.toString(),
    })
    //关于错误
    const errors = reactive<{ [k in keyof typeof formData]?: string[] }>({});
    const rules: Rules<typeof formData> = [
      { key: 'name', message: '必填', type: 'required' },
      { key: 'name', message: '校验不通过', type: 'pattern', regexp: /^.{1,4}$/ },
      { key: 'sign', message: '必选', type: 'required' },
    ];
    const handleSubmit = async (e: Event) => {
      Object.assign(errors, {
        name: '',
        sign: '',
      })
      Object.assign(errors, validate(formData, rules))
      if (!hasError(errors)) {
        await request.post('/tags', formData, {
          params: {
            _mock: 'tagCreate'
          }
        }).catch()
        router.back()
      }
      e.preventDefault();
    };
    return () => (
      <div class={s.wrapper}>
        <Form onSubmit={handleSubmit}>
          {{
            default: () => <>
              <FormItem label='标签名(1-4个字符)'
                type="text"
                v-model:modelValue={formData.name}
                isHasError={Boolean(errors['name'])}
                error={errors['name'] ? errors['name'][0] : '　'} />
              <FormItem label={`符号${formData.sign}`}
                type="emojiSelect"
                v-model:modelValue={formData.sign}
                isHasError={Boolean(errors['sign'])}
                error={errors['sign'] ? errors['sign'][0] : '　'} />
            </>,
            actions: () => <div class={s.formItem_value}>
              <Button class={[s.formItem, s.button]} type="submit">确定</Button>
            </div>
          }}
        </Form>
      </div>
    )
  }
})