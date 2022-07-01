import { defineComponent } from 'vue';
export const Home = defineComponent({
  setup: (props, context) => {
    return () => (
      <div>
        this is home
      </div>
    )
  }
})