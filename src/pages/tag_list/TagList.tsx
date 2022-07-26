import { defineComponent, PropType, reactive } from 'vue';
import { Button } from '../../components/Button/Button';
import { EmojiListSelect } from '../../components/EmojiListSelect/EmojiListSelect';
import { Icon } from '../../components/Icon/Icon';
import { MainLayout } from '../../components/Layout/MainLayout';
import s from './TagList.module.scss';
import validate, { Rules } from '../../utils/validate';
export const TagList = defineComponent({
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
    };
    return () => (
      <div class={s.wrapper}>
        <MainLayout>
          {{
            title: () => '新建标签',
            icon: () => <Icon name='left' />,
            default: <form class={s.form} onSubmit={handleSubmit}>
              <div class={s.formRow}>
                <label class={s.formLabel}>
                  <span class={s.formItem_name}>标签名</span>
                  <div class={s.formItem_value}>
                    <input class={[s.formItem, s.input, errors?.name && s.error]} v-model={formData.name}></input>
                  </div>
                  <div class={s.formItem_errorHint}>
                    <span>{errors?.name ? errors?.name?.[0] : '　'}</span>
                  </div>
                </label>
              </div>
              <div class={s.formRow}>
                <label class={s.formLabel}>
                  <span class={s.formItem_name}>符号</span>
                  <span>{formData.sign}</span>
                  <div class={s.formItem_value}>
                    <EmojiListSelect v-model={formData.sign} error={Boolean(errors?.sign)} />
                  </div>
                  <div class={s.formItem_errorHint}>
                    <span>{errors?.sign ? errors?.sign?.[0] : '　'}</span>
                  </div>
                </label>
              </div>
              <p class={s.tips}>记账时长按标签即可进行编辑</p>
              <div class={s.formRow}>
                <div class={s.formItem_value}>
                  <Button class={[s.formItem, s.button]} >确定</Button>
                </div>
              </div>
            </form>
          }}
        </MainLayout>
      </div>
    )
  }
})