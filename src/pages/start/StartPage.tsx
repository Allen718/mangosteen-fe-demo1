import { defineComponent, ref } from 'vue';
import { Button } from '../../components/Button/Button';
import { Center } from '../../components/Center/Center';
import { FloatButton } from '../../components/FloatButton/FloatButton';
import s from './StartPage.module.scss';
import { Icon } from '../../components/Icon/Icon';
import { Navbar } from '../../components/Navbar/Navbar';
import { Overlay } from '../../components/Overlay/Overlay';

export const StartPage = defineComponent({
  setup: (props, context) => {
    const refOverlayVisible = ref(false)
    const onClickMenu = () => {
      refOverlayVisible.value = !refOverlayVisible.value
    }
    return () => (
      <div>
        <Navbar >
          {{
            icon: () => <Icon name='menu' width={57} height={36} onClick={onClickMenu} />,
            default: () => '山竹记账'
          }}
        </Navbar>
        <Center class={s.pig_wrapper}>
          <Icon name='pig' class={s.pig} />
        </Center>
        <div class={s.button_wrapper}><Button class={s.button}>开始记账</Button></div>
        <FloatButton></FloatButton>
        {refOverlayVisible.value && <Overlay onClose={() => refOverlayVisible.value = false} />}

      </div>
    )
  }
})