import { defineComponent, ref } from "vue";
import { RouterView } from "vue-router";
import './app.scss'
import './stylesheets/vars.scss';
import './stylesheets/reset.scss';

export const App = defineComponent({
  setup() {
    return () => <>
        <div><RouterView /></div>
    </>
  }
})
