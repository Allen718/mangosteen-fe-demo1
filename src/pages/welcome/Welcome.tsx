import { defineComponent, h, Transition, VNode, ref, watchEffect } from 'vue';
import { RouteLocationNormalizedLoaded, RouterView, useRoute } from 'vue-router';
import { useSwipe } from '../../hooks/useSwipe';
import style from './Welcome.module.scss'

export const Welcome = defineComponent({
  setup: (props, context) => {
    const main = ref<HTMLElement | null>(null);
    const { direction, distance, swiping } = useSwipe(main);
    watchEffect(() => {
      if (direction.value === 'right' && distance.value) {
        if (distance.value.x > 100) {
          console.log('右滑动')
        }
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