import { defineComponent, PropType, reactive } from 'vue';
import { Icon } from '@/components/Icon/Icon';
import { MainLayout } from '@/components/Layout/MainLayout';
import s from './TagList.module.scss';
import { TagForm } from '../tag_form/TagForm';
import { Button } from '@/components/Button/Button';

export const TagList = defineComponent({
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
            title: () => '新建标签',
            icon: () => <Icon name='left' />,
            default: () => <>
              <TagForm />
            </>

          }}
        </MainLayout>
      </div >
    )
  }
})