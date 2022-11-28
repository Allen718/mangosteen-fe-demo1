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
    const timer = ref<number>();
    const currentTag = ref()
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
    //长按跳转
    const onLongPress = (tag: Tag) => {
      router.push(`/tag/edit?kind=${props.kind}&name=${tag.name}&sign=${tag.sign}`)
    };
    //图标的开始触摸
    const handleTouchStart = (e: TouchEvent, tag: Tag) => {
      currentTag.value = e.currentTarget;
      timer.value = window.setTimeout(() => {
        onLongPress(tag)
      }, 1000)
    };
    //结束时
    const handleTouchEnd = () => {
      clearTimeout(timer.value)
    };
    //触摸移动时
    const handleTouchMove = (e: TouchEvent) => {
      const pointedElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY)
      if (currentTag.value !== pointedElement && !currentTag.value?.contains(pointedElement)) {
        clearTimeout(timer.value)
      }
    };

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
            <div
              onTouchstart={(e: TouchEvent) => { handleTouchStart(e, tag) }}
              onTouchend={handleTouchEnd}
              onTouchmove={handleTouchMove}
              class={[s.tag, props.selected === tag.id ? s.selected : '']} onClick={() => { handleClickTag(tag) }} >
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