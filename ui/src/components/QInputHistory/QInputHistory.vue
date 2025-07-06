<template>
  <div class="q-input-history">
    <q-chip v-for="(item, index) in history" :key="index" clickable @click="onClick(item)">
      {{ item }}
    </q-chip>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QInputHistory',
  props: {
    history: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['click'],
  setup(props, { emit }) {
    function onClick(item) {
      emit('click', item);
    }

    return {
      onClick,
    };
  },
});
</script>

<style lang="sass">
.q-input-history
  .q-chip
    cursor: pointer
</style>
