import { Button } from '@/components/Button/Button';
import { Icon } from '@/components/Icon/Icon';
import { MainLayout } from '@/components/Layout/MainLayout';
import { defineComponent, PropType } from 'vue';
import { TagForm } from '../tag_form/TagForm';
import s from './TagEdit.module.scss';
export const TagEdit = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <MainLayout>
          {{
            title: () => '编辑标签',
            icon: () => <Icon name='left' />,
            default: () => <>
              <TagForm />
              <div class={s.actions}>
                <Button level='danger' class={s.removeTags} onClick={() => { }}>删除标签</Button>
                <Button level='danger' class={s.removeTagsAndItems} onClick={() => { }}>删除标签和记账</Button>
              </div>
            </>
          }}
        </MainLayout>
      </div >
    )
  }
})