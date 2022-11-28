import { Button } from '@/components/Button/Button';
import { Icon } from '@/components/Icon/Icon';
import { MainLayout } from '@/components/Layout/MainLayout';
import { defineComponent, PropType } from 'vue';
import { Dialog } from 'vant';
import { TagForm } from '../tag_form/TagForm';
import s from './TagEdit.module.scss';
import { request } from '../../../utils/request';
import { useRouter } from 'vue-router';
export const TagEdit = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    const router = useRouter()
    //删除标签
    const onDelete = () => {
      Dialog.confirm({
        title: '确认',
        message: '你真的要删除吗?'
      }).then(() => {
        // request.delete(`/tags/${router.id}`)
        router.back()
      })
    };
    //删除标签和记账
    return () => (
      <div class={s.wrapper}>
        <MainLayout>
          {{
            title: () => '编辑标签',
            icon: () => <Icon name='left' onClick={() => {
              router.back()
            }} />,
            default: () => <>
              <TagForm />
              <div class={s.actions}>
                <Button level='danger' class={s.removeTags} onClick={onDelete}>删除标签</Button>
                <Button level='danger' class={s.removeTagsAndItems} onClick={onDelete}>删除标签和记账</Button>
              </div>
            </>
          }}
        </MainLayout>
      </div >
    )
  }
})