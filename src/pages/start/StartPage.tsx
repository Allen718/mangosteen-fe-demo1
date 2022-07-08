import { defineComponent } from 'vue';
import { Button } from '../../components/Button/Button';
import { FloatButton } from '../../components/FloatButton/FloatButton';

export const StartPage = defineComponent({
  setup: (props, context) => {
    return () => (
      <div>
        <div>
          <Button onClick={() => { console.log('你点击button了') }}>你好</Button>
        </div>
        <div>
          <FloatButton iconName="add" />
        </div>
      </div>
    )
  }
})