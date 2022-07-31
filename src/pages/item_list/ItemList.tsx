import { defineComponent, PropType, ref, onUpdated, reactive, watchEffect } from 'vue';
import s from './ItemList.module.scss';
import { MainLayout } from '../../components/Layout/MainLayout';
import { Icon } from '../../components/Icon/Icon';
import { Time } from '@/utils/time';
import { Tab, Tabs } from '@/components/Tab/Tab';
import { ItemSummary } from './components/ItemSummary';
import { Overlay } from 'vant';
export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>

    }

  },
  setup: (props, context) => {
    const refTab = ref('这个月');
    //时间弹框
    const refOverlayVisible = ref(false);
    watchEffect(() => {
      if (refTab.value === '自定义时间') {
        refOverlayVisible.value = true
      }
    })
    const time = new Time(new Date());
    const timeList = [
      {
        label: '本月',
        start: time.firstDayOfMonth(),
        end: time.lastDayOfMonth()
      },
      {
        label: '上个月',
        start: time.add(-1, 'month').firstDayOfMonth(),
        end: time.add(-1, 'month').lastDayOfMonth()
      },
      {
        label: '今年',
        start: time.firstDayOfYear(),
        end: time.lastDayOfYear()
      }
    ]
    const customTime = reactive({
      start: new Time(),
      end: new Time(),
    });
    return () => (
      <div class={s.wrapper}><MainLayout>{{
        title: () => '山竹记账',
        icon: () => <Icon name="left" />,
        default: () =>
          <div>
            <Tabs selected={refTab.value} onUpdatedTab={(label) => refTab.value = label} classPrefix="customTabs" >
              <Tab label="这个月">
                <div>
                  <ItemSummary startDate={timeList[0].start.format()} endDate={timeList[0].end.format()} />
                </div>
              </Tab>
              <Tab label="上个月"><div> <ItemSummary startDate={timeList[1].start.format()} endDate={timeList[1].start.format()} /></div></Tab>
              <Tab label="今年"><div><ItemSummary startDate={timeList[2].start.format()} endDate={timeList[2].start.format()} /></div></Tab>
              <Tab label="自定义时间"><div><ItemSummary startDate={customTime.start.format()}
                endDate={customTime.end.format()} /></div></Tab>
            </Tabs>
          </div>

      }}
      </MainLayout>
        <Overlay show={refOverlayVisible.value} class={s.overlay} >
          <div class={s.overlay_inner}>
            <header>
              请选择时间
            </header>
            <main>
              <form>
                <div>

                </div>
                <div>

                </div>
              </form>
            </main>
          </div>
        </Overlay>

      </div>
    )
  }

})