

<template>
  <div v-if="hasTopOrBottomSlots" class="q-field-ex">
    <div v-if="slots.top || attaches.top" class="row q-field-top">
      <component :is="genAttach('top')" />
    </div>
    <component :is="componentName" ref="inputBox" v-bind="inputProps" v-model="iValue">
      <template v-for="(slot, name) in internalQInputSlots" #[name]>
        <component :is="slot" />
      </template>
    </component>
    <div v-if="slots.bottom || attaches.bottom" class="row q-field-bottom">
      <component :is="genAttach('bottom')" />
    </div>
  </div>
  <component v-else :is="componentName" ref="inputBox" v-bind="inputProps" v-model="iValue">
    <template v-for="(slot, name) in internalQInputSlots" #[name]>
      <component :is="slot" />
    </template>
  </component>
</template>

<script setup>
import { defineOptions, ref, computed, watch, onMounted, useAttrs, useSlots, h, nextTick, resolveComponent, markRaw } from 'vue';
import { useI18n } from 'vue-i18n';
import { QInput, QSelect, QBtn, QPopupProxy, QCard, QToolbar, QToolbarTitle, QCardSection } from 'quasar';
import merge from 'lodash.merge';
import { getRegisteredTypes, register, ExternalInputAttachNames, InternalInputAttachNames, hyphenate } from './utils.js';

defineOptions({ name: 'QInputEx' });

const { t } = useI18n();

const props = defineProps({
  modelValue: {},
  type: { type: [String, Object], default: 'text' },
  slotAfterAttach: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);
const attrs = useAttrs();
const slots = useSlots();

const inputBox = ref(null);
const iValue = ref(props.modelValue);
const iType = ref(null);
const attaches = ref({});
const nativeType = ref('text');
const mask = ref('');
const rules = ref(null);
const inValue = ref(null);
const outValue = ref(null);
const componentProps = ref({});

let mReason = null;
let mDetail = null;

const GRegisteredTypes = getRegisteredTypes();

// function bindObj(obj, that) {
//   if (obj) {
//     Object.keys(obj).forEach(k => {
//       if (typeof obj[k] === 'function') {
//         obj[k] = obj[k].bind(that);
//       }
//     });
//   }
//   return obj;
// }

watch(() => props.modelValue, (newValue) => {
  iValue.value = newValue;
});

watch(iValue, (newValue) => {
  emit('update:modelValue', newValue, mReason, mDetail);
});

function clearType() {
  iValue.value = '';
  mask.value = '';
  iType.value = null;
  rules.value = null;
  nativeType.value = 'text';
  attaches.value = {};
  resetValidation();
}

function resetValidation() {
  if (inputBox.value && inputBox.value.resetValidation) {
    nextTick(() => inputBox.value.resetValidation());
  }
}

function cloneType(aType) {
  iType.value = aType;
  mask.value = attrs.mask || aType.mask;
  rules.value = attrs.rules || aType.rules;
  inValue.value = aType.inValue;
  outValue.value = aType.outValue;
  nativeType.value = aType.type;
  componentProps.value = aType.props;
  // if (componentProps.value) {
  //   bindObj(componentProps.value, this);
  // }
  const vAttaches = {};
  if (aType.attaches) {
    Object.keys(aType.attaches).forEach((attachName) => {
      const src = aType.attaches;
      if (Array.isArray(src[attachName])) {
        vAttaches[attachName] = src[attachName].map((item) => {
          const newItem = { ...item };
          if (newItem.popup && newItem.popup.name) {
            newItem.popup.name = markRaw(newItem.popup.name);
          }
          return newItem;
        });
      } else {
        const newItem = { ...src[attachName] };
        if (newItem.popup && newItem.popup.name) {
          newItem.popup.name = markRaw(newItem.popup.name);
        }
        vAttaches[attachName] = newItem;
      }
    });
  }
  attaches.value = vAttaches;
  resetValidation();
}

watch(() => props.type, (newType) => {
  const vInputType = typeof newType === 'string' ? GRegisteredTypes[newType] :
    newType && newType.name ? merge({}, GRegisteredTypes[newType.name], newType) : newType;
  if (!vInputType) { throw new Error(`The input '${newType}' type is not exists`); }
  clearType();
  cloneType(vInputType);
}, { immediate: true });

const componentName = computed(() => (nativeType.value === 'select' ? QSelect : QInput));

const inputProps = computed(() => {
  return {
    ...attrs,
    filled: true,
    mask: mask.value,
    rules: rules.value,
    type: nativeType.value,
    ...componentProps.value
  };
});

const hasTopOrBottomSlots = computed(() => {
  return (slots.top || attaches.value.top) || (slots.bottom || attaches.value.bottom);
});

const internalQInputSlots = computed(() => {
  const result = {};
  const qInputSlots = ['prepend', 'append', 'before', 'after']; // These are the slots QInput provides

  qInputSlots.forEach(name => {
    const generatedContent = genAttach(name);
    if (generatedContent && generatedContent.length > 0) {
      result[name] = () => generatedContent;
    }
  });
  return result;
});

function getPopupComponent(popup) {
  const comp = (typeof popup === 'object') ? popup.name : popup;
  return typeof comp === 'string' ? resolveComponent(comp) : comp;
}

function getPopup(aName) {
  // This needs to be handled differently in Vue 3, likely with template refs
  // This is a placeholder for now
  return null;
}

function genAttach(name) {
  let vAttach = attaches.value[name];
  const vSlot = slots[name];
  if (vAttach || vSlot) {
    const vSlotAfterAttach = props.slotAfterAttach;
    const result = [];
    if (vSlot && !vSlotAfterAttach) { result.push(vSlot()); }
    if (vAttach) {
      if (!Array.isArray(vAttach)) { vAttach = [vAttach]; }
      vAttach.forEach((item) => {
        result.push(getAttach(item));
      });
    }
    if (vSlot && vSlotAfterAttach) { result.push(vSlot()); }
    return result;
  }
  return null;
}

function getAttach(attach) {
  if (attach.name) {
    const vCompName = typeof attach.name === 'string' ? attach.name : attach.name.name;
    const vCompAttrs = attrs[hyphenate(vCompName)] || {};
    const props = { ...attach.props, ...vCompAttrs };
    const on = {};
    if (attach.on) {
      Object.assign(on, attach.on);
      // bindObj(on, this); // 'this' is not available in setup context for binding
    }
    return h(attach.name, { ...props, ...on });
  } else if (attach.icon || attach.caption) {
    const btnProps = { flat: true, dense: true, ...attach.attrs };
    if (attach.icon) btnProps.icon = attach.icon;
    if (attach.caption) btnProps.label = attach.caption;

    const btnOn = {};
    if (attach.click) btnOn.onClick = (e) => attach.click(e, { iValue, nativeType, attaches }); // 'this' is not available in setup context for binding

    if (attach.popup) {
      return h(QBtn, { ...btnProps, ...btnOn }, () => [getPopupVNode(attach)]);
    } else {
      return h(QBtn, { ...btnProps, ...btnOn });
    }
  }
  return null;
}

function getPopupVNode(attach) {
  const vPopup = attach.popup;
  const toValue = vPopup.toValue;
  const vValue = typeof toValue === 'function' ? toValue(iValue.value) : iValue.value;

  const popupProps = { maxHeight: '100vh', breakpoint: 800, ...vPopup.attrs };
  const compAttrs = { modelValue: vValue, filled: true, ...attrs, ...vPopup.attrs };
  const compName = getPopupComponent(vPopup);
  const caption = vPopup.caption || iType.value.name;

  const compOn = { ...vPopup.on };
  const onInput = compOn.input || vPopup['@input'];
  delete compOn.input;
  // bindObj(compOn, this); // 'this' is not available in setup context for binding

  compOn['onUpdate:modelValue'] = (value, reason, detail) => {
    if (typeof reason === 'object') {
      detail = reason;
      reason = '';
    }
    reason = reason || vPopup.ref || iType.value.name;
    mReason = reason;
    mDetail = detail;
    if (typeof onInput === 'function') {
      const v = onInput(value, reason, detail, { iValue, nativeType, attaches, popupRef }); // Pass relevant reactive variables
      if (v !== undefined) { value = v; }
    }
    iValue.value = value;
  };

  const comp = h(compName, { ...compAttrs, ...compOn });

  const popupRef = ref(null);

  return h(QPopupProxy, { ...popupProps, ref: popupRef }, () =>
    h(QCard, null, () => [
      h(QToolbar, null, () => [
        h(QBtn, { flat: true, round: true, icon: attach.icon }),
        h(QToolbarTitle, null, () => t('Please select', {type: caption})),
        h(QBtn, { flat: true, round: true, color: 'secondary', icon: 'close', onClick: () => popupRef.value.hide() })
      ]),
      h(QCardSection, null, () => comp)
    ])
  );
}


// Expose public methods
defineExpose({
  focus: () => inputBox.value?.focus(),
  resetValidation,
  getPopup
});

onMounted(() => {
  // Initial setup
});

</script>

