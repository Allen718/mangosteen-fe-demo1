import { defineComponent, ref } from 'vue';
import { Button } from '../../components/Button/Button';
import { Center } from '../../components/Center/Center';
import { FloatButton } from '../../components/FloatButton/FloatButton';
import s from './StartPage.module.scss';
import { Icon } from '../../components/Icon/Icon';
import { Navbar } from '../../components/Navbar/Navbar';
import { OverlayIcon } from '../../components/Overlay/Overlay';
import { useRouter } from 'vue-router';

export const StartPage = defineComponent({
  setup: (props, context) => {

    const history = useRouter();
    return () => (
      <div>
        <Navbar >
          {{
            icon: () => <OverlayIcon />,
            default: () => '山竹记账'
          }}
        </Navbar>
        <Center class={s.pig_wrapper}>
          <Icon name='pig' class={s.pig} />
        </Center>
        <div class={s.button_wrapper}><Button class={s.button} onClick={() => { history.push('/item/create') }}>开始记账</Button></div>
        <FloatButton></FloatButton>
      </div>
    )
  }
})