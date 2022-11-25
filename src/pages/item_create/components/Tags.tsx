import { defineComponent, PropType, onMounted, ref } from 'vue';
import { Icon } from '@/components/Icon/Icon';
import s from './Tags.module.scss';
import { request } from '../../../utils/request';
import { Button } from '@/components/Button/Button';
import { useRouter } from 'vue-router';
export const Tags = defineComponent({
  props: {
    kind: {
      type: String as PropType<'expenses' | 'incomes'>,
      required: true,
    },
    selected: Number,
  },
  emits: ['update:selected'],
  setup: (props, context) => {
    const router = useRouter()
    const pageRef = ref({ pageSize: 25, pageNum: 1 })
    const refHasMore = ref(false);
    const tagList = ref<Tag[]>([]);
    const handleLoadMore = () => {
      fetchTagList();
    }
    const fetchTagList = async () => {
      const response = await request.get<Resources<Tag>>('/tags', {
        kind: props.kind,
        _mock: 'tagIndex',
        ...pageRef.value
      })
      tagList.value.push(...response.data.resources)
      const { pageSize, pageNum, total } = response.data.pager
      pageRef.value = { pageSize, pageNum: pageNum + 1 }
      refHasMore.value = pageSize * (pageNum - 1) + response.data.resources.length < total
    }
    onMounted(() => {
      fetchTagList();
    })
    const handleClickTag = (tag: Tag) => {
      context.emit('update:selected', tag.id)
    };
    const handleAddTag = () => {
      router.push(`/tag?kind=${props.kind}`)
    }
    return () => (
      <div>
        <div class={s.tags_wrapper} >
          <div class={s.tag} onClick={handleAddTag}>
            <div class={s.sign}>
              <Icon name="add" class={s.createTag} />
            </div>
            <div class={s.name} >
              新增
            </div>
          </div>
          {tagList.value.map((tag: Tag) =>
            <div class={[s.tag, props.selected === tag.id ? s.selected : '']} onClick={() => { handleClickTag(tag) }} >
              <div class={s.sign}>
                {tag.sign}
              </div>
              <div class={s.name}>
                {tag.name}
              </div>
            </div>
          )}
        </div>
        <div class={s.button_wraper}>{refHasMore.value ? <Button onClick={handleLoadMore}>加载更多</Button> : <span>没有更多了</span>}</div>
      </div>
    )
  }
})