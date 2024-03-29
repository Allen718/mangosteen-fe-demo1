import { defineComponent, PropType, ref, computed } from 'vue';
import { emojiList } from './EmojiList';
import s from './EmojiListSelect.module.scss';
export const EmojiListSelect = defineComponent({
  props: {
    modelValue: {
      type: String
    },
    error: {
      type: Boolean
    },
    // onUpdateModelValue: {
    //   type: Function as PropType<(emoji: String) => void>
    // },
  },
  emits:['update:value'],
  setup: (props, context) => {
    const refSelected = ref(0)
    const table: [string, string[]][] = [
      ['表情', ['face-smiling', 'face-affection', 'face-tongue', 'face-hand',
        'face-neutral-skeptical', 'face-sleepy', 'face-unwell', 'face-hat',
        'face-glasses', 'face-concerned', 'face-negative', 'face-costume'
      ]],
      ['手势', ['hand-fingers-open', 'hand-fingers-partial', 'hand-single-finger',
        'hand-fingers-closed', 'hands', 'hand-prop', 'body-parts']],
      ['人物', ['person', 'person-gesture', 'person-role', 'person-fantasy',
        'person-activity', 'person-sport', 'person-resting']],
      ['衣服', ['clothing']],
      ['动物', ['cat-face', 'monkey-face', 'animal-mammal', 'animal-bird',
        'animal-amphibian', 'animal-reptile', 'animal-marine', 'animal-bug']],
      ['植物', ['plant-flower', 'plant-other']],
      ['自然', ['sky & weather', 'science']],
      ['食物', [
        'food-fruit', 'food-vegetable', 'food-prepared', 'food-asian',
        'food-marine', 'food-sweet'
      ]],
      ['运动', ['sport', 'game']],
    ]
    const onClickEmoji = (emoji: String) => {
      // props.onUpdateModelValue && props.onUpdateModelValue(emoji)
      context.emit('update:value', emoji)
    };
    const emojis = computed(() => {
      const catagorys = table[refSelected.value][1]
      const emojis = catagorys.map(category => emojiList.find(item => item[0] === category)?.[1]
        .map(item => <li
          class={item === props.modelValue ? s.selectedEmoji : ''}
          onClick={() => { onClickEmoji(item) }}
        >{item}</li>))
      return emojis;
    })
    return () => (
      <div class={[s.formItem, s.emojiList, props.error && s.error]}>
        <nav>
          {table?.map((i, index) => <span
            class={index === (refSelected.value) ? s.selected : ''}
            onClick={() => refSelected.value = index}
          >
            {i[0]}
          </span>)}
        </nav>
        <ol>
          {emojis.value}
        </ol>
      </div>
    )
  }
})