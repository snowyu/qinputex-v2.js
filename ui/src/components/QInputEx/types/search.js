import { TEXT_INPUT_TYPE } from './text';
import QInputHistory from '../../QInputHistory/QInputHistory.vue';

/**
 * search input type
 */
export const SEARCH_INPUT_TYPE = {
  ...TEXT_INPUT_TYPE,
  name: 'search',
  on: {
    keyup(event, { iValue, emit }) {
      if (event.keyCode === 13) {
        if (iValue.value) {
          emit('search', iValue.value);
        }
      }
    },
  },
  attaches: {
    append: {
      icon: 'search',
      click(e, { iValue, emit }) {
        if (iValue.value) {
          emit('search', iValue.value);
        }
      },
    },
    bottom: {
      name: QInputHistory,
      on: {
        click(text, index, { iValue, inputBox }) {
          if (text !== iValue.value) {
            iValue.value = text;
          }
          inputBox.value.focus();
        },
      },
    },
  },
};

export default SEARCH_INPUT_TYPE;
