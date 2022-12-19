
import { defineComponent, PropType, ref, reactive, watchEffect, DefineComponent } from 'vue';
import { Overlay } from 'vant';
import { Time } from '@/utils/time';
import { Form, FormItem } from '../Form/Form';
import { MainLayout } from '../Layout/MainLayout';
import { OverlayIcon } from '../Overlay/Overlay';
import { Tab, Tabs } from '../Tab/Tab';
import s from './TimeTabsLayout.module.scss';

const demo = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
    },
    endDate: {
      type: String as PropType<string>,
    }
  },
})
export const TimeTabsLayout = defineComponent({
  props: {
    component: {
      type: Object as PropType<typeof demo>,
      required: true,
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
      start: '',
      end: '',
    });
    //关于错误
    const errors = reactive<{ [k in keyof typeof customTime]?: string[] }>({});

    const handleSubmit = () => {
      console.log('调用了');
    };
    return () => (
      <div class={s.wrapper}><MainLayout>{{
        title: () => '山竹记账',
        icon: () => <OverlayIcon />,
        default: () =>
          <div>
            <Tabs v-model:selected={refTab.value} onUpdate:selected={(label) => refTab.value = label} classPrefix="customTabs" >
              <Tab label="这个月">
                <div>
                  <props.component startDate={timeList[0].start.format()} endDate={timeList[0].end.format()} />
                </div>
              </Tab>
              <Tab label="上个月"><div>
                <props.component startDate={timeList[1].start.format()} endDate={timeList[1].start.format()} />
              </div></Tab>
              <Tab label="今年"><div>
                <props.component startDate={timeList[2].start.format()} endDate={timeList[2].start.format()} />
              </div></Tab>
              <Tab label="自定义时间">
                <div>
                  <props.component
                    startDate={customTime.start}
                    endDate={customTime.end}
                  />
                </div>
              </Tab>
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