import { FunctionalComponent } from 'vue';
import pig from '../../../assets/icons/pig.svg';
import style from '../Welcome.module.scss';

export const First: FunctionalComponent = () => {
  return (
    <div class={style.card}>
      <svg>
        <use xlinkHref='#pig'></use>
      </svg>
      <h2>会挣钱<br />还会省钱</h2>
    </div>
  )
}

First.displayName = 'First'