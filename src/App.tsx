import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import './stylesheets/reset.scss';

export const App = defineComponent({
  setup() {
    return () => <>
        <div><RouterView /></div>
    </>
  }
})
