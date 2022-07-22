import { defineComponent, PropType, reactive } from 'vue';
import { Button } from '../../components/Button/Button';
import { EmojiListSelect } from '../../components/EmojiListSelect/EmojiListSelect';
import { Icon } from '../../components/Icon/Icon';
import { MainLayout } from '../../components/Layout/MainLayout';
import s from './TagList.module.scss';
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
    return () => (
      <div class={s.wrapper}>
        <MainLayout>
          {{
            title: () => '新建标签',
            icon: () => <Icon name='left' />,
            default: <form class={s.form}>
              <div class={s.formRow}>
                <label class={s.formLabel}>
                  <span class={s.formItem_name}>标签名</span>
                  <div class={s.formItem_value}>
                    <input class={[s.formItem, s.input, s.error]} v-model={formData.name}></input>
                  </div>
                  <div class={s.formItem_errorHint}>
                    <span>必填</span>
                  </div>
                </label>
              </div>
              <div class={s.formRow}>
                <label class={s.formLabel}>
                  <span class={s.formItem_name}>符号</span>
                  <span>{formData.sign}</span>
                  <div class={s.formItem_value}>
                    <EmojiListSelect v-model={formData.sign} class={[s.formItem, s.emojiList, s.error]} />
                  </div>
                  <div class={s.formItem_errorHint}>
                    <span>必填</span>
                  </div>
                </label>
              </div>
              <p class={s.tips}>记账时长按标签即可进行编辑</p>
              <div class={s.formRow}>
                <div class={s.formItem_value}>
                  <Button class={[s.formItem, s.button]}>确定</Button>
                </div>
              </div>
            </form>
          }}
        </MainLayout>
      </div>
    )
  }
})