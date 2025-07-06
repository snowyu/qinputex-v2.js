function padStr(value, size = 2) {
  var s = String(value);
  while (s.length < size) {s = "0" + s;}
  return s;
}

function getCurrentYM() {
  const vDate = new Date();
  const result = vDate.getFullYear() + '/' + padStr(vDate.getMonth()+1, 2);
  return result;
}

export default {
  name: 'date',
  type: 'text',
  mask: 'date',
  rules: ['date'],
  attaches: {
    'append': {
      icon: 'event',
      popup: {
        ref: 'date',
        name: 'QDate',
        attrs: {
          'default-year-month': getCurrentYM()
        },
        on: {
          input(value, reason, detail, { iValue, nativeType, attaches, popupRef }) {
            // close the popup.
            if (['day', 'today'].indexOf(reason) !== -1) popupRef.value.hide();
            // if you wanna change the value here:
            return value;
          }
        }
      }

    }
  }
}
