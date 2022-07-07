import { defineComponent, Transition, VNode, ref, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView, useRoute, useRouter } from 'vue-router';
import { throttle } from '../../components/throttle';
import { useSwipe } from '../../hooks/useSwipe';
import style from './Welcome.module.scss'
const routerMap: Record<string, string> = {
  welcome1: '/welcome/2',
  welcome2: '/welcome/3',
  welcome3: '/welcome/4',
  welcome4: '/start',
}
export const Welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement>();
    const { direction, swiping } = useSwipe(main, { beforeTouchstart: e => e.preventDefault() });
    const router = useRouter()
    const route = useRoute()
    const touchPush = throttle(() => {
      const currentRouteName = (route.name || 'welcome1').toString()
      router.replace(routerMap[currentRouteName]);
    }, 500);
    watchEffect(() => {
      if (direction.value === 'left' && swiping.value) {
        touchPush();
      }
    })
    return () => (
      <>
        <div class={style.wrapper}>
          <header class={style.header}>
            <svg>
              <use xlinkHref='#mangosteen'></use>
            </svg>
            <h class={style.text}>山竹记账</h>
          </header>
          <main class={style.main} ref={main}>
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