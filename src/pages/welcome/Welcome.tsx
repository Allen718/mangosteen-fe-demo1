import { defineComponent, h, Transition, VNode } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView, useRoute } from 'vue-router';
import logo from '../../assets/icons/mangosteen.svg'
import style from './Welcome.module.scss'

export const Welcome = defineComponent({
  setup: (props, context) => {
    return () => (
      <>
        <div class={style.wrapper}>
          <header class={style.header}>
            <img class={style.img} src={logo} />
            <h class={style.text}>山竹记账</h>
          </header>
          <main class={style.main}>
            <RouterView name="main">
              {({ Component: X, route: R }: { Component: VNode, route: RouteLocationNormalizedLoaded }) =>
                <Transition enterFromClass={style.slide_fade_enter_from} enterActiveClass={style.slide_fade_enter_active}
                  leaveToClass={style.slide_fade_leave_to} leaveActiveClass={style.slide_fade_leave_active}>
                  {X}
                </Transition>
              }
            </RouterView>
          </main>
          <footer class={style.footer}>
            <RouterView name="footer" />
          </footer>
        </div>
      </>
    )
  }
})