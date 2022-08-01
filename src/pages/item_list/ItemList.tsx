import { defineComponent, PropType, ref, onUpdated, reactive, watchEffect } from 'vue';
import s from './ItemList.module.scss';
import { MainLayout } from '../../components/Layout/MainLayout';
import { Icon } from '../../components/Icon/Icon';
import { Time } from '@/utils/time';
import { Tab, Tabs } from '@/components/Tab/Tab';
import { ItemSummary } from './components/ItemSummary';
import { Overlay } from 'vant';
import { Form, FormItem } from '@/components/Form/Form';
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
      start: new Time().format(),
      end: new Time().format(),
    });
    //关于错误
    const errors = reactive<{ [k in keyof typeof customTime]?: string[] }>({});

    const handleSubmit = () => {
      console.log('调用了');
    };
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
              <Tab label="自定义时间"><div>
                <ItemSummary
                  startDate={customTime.start}
                  endDate={customTime.end}
                /></div></Tab>
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
              <Form onSubmit={handleSubmit}>
                {{
                  default: () => <>
                    <FormItem label='开始时间'
                      type="date"
                      v-model={customTime.start}
                      isHasError={Boolean(errors['start'])}
                      error={errors['start'] ? errors['start'][0] : '　'} />
                    <FormItem label="结束时间"
                      type="date" v-model={customTime.end}
                      isHasError={Boolean(errors['end'])}
                      error={errors['end'] ? errors['end'][0] : '　'} />
                  </>,
                  actions: () => <div class={s.formItem_value}>
                    <button class={[s.formItem, s.button]} type="submit" >确定</button>
                    <button class={[s.formItem, s.button]} onClick={() => { refOverlayVisible.value = false }} >取消</button>
                  </div>
                }}
              </Form>
            </main>
          </div>
        </Overlay>

      </div>
    )
  }

})