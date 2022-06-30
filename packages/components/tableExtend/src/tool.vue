<template>
  <div class="tool-panel">
    <div class="left-panel">
      <slot name="tool-left"></slot>
    </div>
    <div class="right-panel">
      <slot name="tool-right">
        <col-visible-setting v-if="tableProps?.isSetColumn"></col-visible-setting>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ColVisibleSetting from './colVisible.vue';
import { TableProvies } from './../type';

const parent = inject<TableProvies>("table-extend");

const tableProps = computed(() => {
  return parent?.tableProps
})

</script>