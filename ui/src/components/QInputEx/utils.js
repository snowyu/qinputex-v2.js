const GRegisteredTypes = {};

export const ExternalInputAttachNames = ['top', 'bottom', 'before', 'after'];
export const InternalInputAttachNames = ['prepend', 'append'];
export const InputAttachNames = [...ExternalInputAttachNames, ...InternalInputAttachNames];

export function register(aType) {
  if (aType && aType.name) {
    GRegisteredTypes[aType.name] = aType;
  }
}

export function getRegisteredTypes() {
  return GRegisteredTypes;
}

const hyphenateRE = /\B([A-Z])/g;
export const hyphenate = (str) => str.replace(hyphenateRE, '-$1').toLowerCase();

register({ name: 'text', type: 'text' });
register({ name: 'textarea', type: 'textarea' });
register({ name: 'number', type: 'number' });

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

export const DateInput = {
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

export const PasswordInput = {
  name: 'password',
  type: 'password',
  attaches: {
    'before': {
      icon: 'vpn_key',
    },
    'append': {
      icon: 'visibility',
      click: function(e, { nativeType, attaches }) {
        const isVisiblePwd = nativeType.value === 'text';
        nativeType.value = isVisiblePwd ? 'password' : 'text';
        attaches.value.append.icon = isVisiblePwd ? 'visibility' : 'visibility_off';
      }
    }
  }
}

register(DateInput);
register(PasswordInput);