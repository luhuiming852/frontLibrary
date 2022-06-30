<template>
    <template v-if="column?.disPlayedValue != undefined">
        <template
            v-if="!rowHasPenetrate(colCfg.prop)"
        >{{ column?.disPlayedValue != undefined ? column?.disPlayedValue : '--' }}</template>
        <template v-else>
            <span
                class="has-more"
                @click="columnItemClick(row, colCfg.prop)"
            >{{ column?.disPlayedValue != undefined ? column?.disPlayedValue : '--' }}</span>
        </template>
    </template>
    <template v-else>
        <template
            v-if="!rowHasPenetrate(colCfg.prop)"
        >{{ row[colCfg.prop] != undefined ? row[colCfg.prop] : "--" }}</template>
        <template v-else>
            <span
                class="has-more"
                @click="columnItemClick(row, colCfg.prop)"
            >{{ column != undefined ? column : "--" }}</span>
        </template>
    </template>
</template>

<script lang="ts" setup>
import useProvies from "./../useProvies";

const { columnItemClick, rowHasPenetrate } = useProvies();

const props = defineProps({
    row: {
        type: Object,
        default: () => { }
    },
    colCfg: {
        type: Object,
        default: () => { }
    }
})

const column = computed(() => {
    const { row, colCfg } = props
    return row[colCfg.prop]
})

</script>