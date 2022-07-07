import { Ref, onMounted, ref, computed, onUnmounted } from 'vue';
type Point = {
  x: number,
  y: number,
};
interface Options {
  beforeTouchstart?: (e: TouchEvent) => void
  afterTouchstart?: (e: TouchEvent) => void
  beforeTouchMove?: (e: TouchEvent) => void
  AfterTouchMove?: (e: TouchEvent) => void
  beforeTouchEnd?: (e: TouchEvent) => void
  AfterTouchEnd?: (e: TouchEvent) => void
};
export const useSwipe = (element: Ref<HTMLElement | undefined>, options?: Options) => {
  const start: Ref<Point | undefined> = ref()
  const end: Ref<Point | undefined> = ref();
  const swiping = ref(false);

  const distance = computed(() => {
    if (!start.value || !end.value) { return null }
    return {
      x: end.value.x - start.value.x,
      y: end.value.y - start.value.y
    }
  })
  const direction = computed(() => {
    if (!distance.value) { return '' }
    if (Math.abs(distance.value.x) > Math.abs(distance.value.y)) {
      return distance.value.x > 0 ? 'right' : 'left'
    } else {
      return distance.value.y > 0 ? 'down' : 'up'
    }
  })
  const onStart = (e: TouchEvent) => {
    options?.beforeTouchstart?.(e)
    swiping.value = true
    end.value = start.value = { x: e.touches[0].screenX, y: e.touches[0].screenY }
    options?.afterTouchstart?.(e)
  };
  const onMove = (e: TouchEvent) => {
    if (!start.value) { return }
    end.value = { x: e.touches[0].screenX, y: e.touches[0].screenY, }
  };
  const onEnd = (e: TouchEvent) => {
    swiping.value = false
  };
  onMounted(() => {
    if (!element.value) { return }
    element.value.addEventListener('touchstart', onStart)
    element.value.addEventListener('touchmove', onMove)
    element.value.addEventListener('touchend', onEnd)
  })
  onUnmounted(() => {
    if (!element.value) { return }
    element.value.removeEventListener('touchstart', onStart)
    element.value.removeEventListener('touchmove', onMove)
    element.value.removeEventListener('touchend', onEnd)
  })
  return { distance, direction, swiping }
};