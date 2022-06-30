<template>
    <!-- <el-progress
        style="margin-right: 30px"
        :text-inside="true"
        :stroke-width="20"
        :percentage="row[colCfg.prop]"
        :status="
            row[colCfg.prop] <= 50
                ? 'exception'
                : row[colCfg.prop] > 50 && row[colCfg.prop] <= 70
                    ? 'warning'
                    : 'success'
        "
    ></el-progress> -->
</template>

<script lang="ts" setup>

defineProps({
    row: {
        type: Object,
        default: () => { }
    },
    colCfg: {
        type: Object,
        default: () => { }
    }
})
</script>