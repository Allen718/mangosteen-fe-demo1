import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import './stylesheets/vars.scss';
import './stylesheets/reset.scss';

export const App = defineComponent({
  setup() {
    return () => <>
        <div><RouterView /></div>
    </>
  }
})
