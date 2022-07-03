import { defineComponent } from 'vue';
import { RouterView ,RouterLink} from 'vue-router';
import logo from '../../assets/icons/mangosteen.svg'
import style from './Welcome.module.scss'

export const Welcome = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={style.wrapper}>
        <header class={style.header}>
          <img class={style.img} src={logo} />
          <h class={style.text}>山竹记账</h>
        </header>
        <div class={style.main}>
          <RouterView />
        </div>
        <footer class={style.footer}>
          <RouterLink class={style.fake} to="/start" >跳过</RouterLink>
          <RouterLink to="/welcome/2" >下一页</RouterLink>
          <RouterLink to="/start" >跳过</RouterLink>
        </footer>
      </div>
    )
  }
})