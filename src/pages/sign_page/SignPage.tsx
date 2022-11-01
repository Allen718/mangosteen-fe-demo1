import { Form, FormItem } from '@/components/Form/Form';
import { Icon } from '@/components/Icon/Icon';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Button } from '@/components/Button/Button';
import { defineComponent, PropType, reactive } from 'vue';
import s from './SignPage.module.scss';
import validate, { Rules } from '@/utils/validate';
export const SignPage = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const formData = reactive({
      email: '',
      code: '',
    })
    const errors = reactive({
      email: [],
      code: [],
    })
    const onSubmit = (e: Event) => {
      e.preventDefault();
      Object.assign(errors, {
        email: [],
        code: [],
      })
      const rule: Rules<typeof formData> = [
        { key: 'email', message: '必填', type: 'required' },
        { key: 'email', message: '必须是邮箱', type: 'pattern', regexp: /.+@+/ },
        { key: 'code', message: '必填', type: 'required' },
      ]
      Object.assign(errors, validate(formData, rule));
      console.log('formData', formData)
    };
    const handleSendVidationCode=()=>{
      console.log('需要发送验证码')
    }
    return () => (
      <MainLayout>
        {{
          title: () => '登录',
          icon: () => <Icon name="left" />,
          default: () => <><div>
            <div class={s.icon_wrapper}>
              <Icon name="mangosteen" class={s.icon} />
              <span class={s.appName}>山竹记账</span>
            </div>
            <Form onSubmit={onSubmit}>
              {{
                default: () => <>
                  <FormItem label='邮箱地址'
                    type="text"
                    placeholder='请输入邮箱，然后点击发送验证码'
                    v-model:modelValue={formData.email}
                    isHasError={Boolean(errors['email'][0])}
                    error={errors['email'] ? errors['email'][0] : '　'} />
                  <FormItem label="验证码"
                    type="validateCode"
                    placeholder='请输入六位数字'
                    v-model:modelValue={formData.code}
                    isHasError={Boolean(errors['code'][0])}
                    onClick={handleSendVidationCode}
                    error={errors['code'] ? errors['code'][0] : '　'} />
                   
                </>,
                actions: () => <div>
                  <Button class={s.button}>登录</Button>
                </div>
              }}

            </Form>
          </div>
          </>
        }}
      </MainLayout>
    )
  }
})