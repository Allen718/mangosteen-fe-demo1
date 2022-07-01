import { defineComponent, PropType } from 'vue';
export const Foo = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <div>
        hello this is foo
      </div>
    )
  }
})