<template>
    <el-popover placement="bottom" title="列显示设置" :width="220">
        <template #reference>
            <el-icon>
                <Setting />
            </el-icon>
        </template>
        <div class="set-column-list-wrap">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAllColumns" @change="onCheckAllColumnChange">全选
            </el-checkbox>
            <el-checkbox-group class="set-column-check-group" v-model="checkColumnProp" @change="onCheckedColumnChange">
                <div class="group-item" v-for="colum in tableColums" :key="colum.prop">
                    <el-checkbox class="set-column-check" :label="colum.prop">{{ colum.label }}</el-checkbox>
                    <div class="fixed-wrap">
                        <el-icon :class="['fixed-icon', colum.fixed === 'left' && 'active']" title="固定到左边"
                            @click="onChangeFixed('left', colum)">
                            <Upload />
                        </el-icon>
                        <el-divider direction="vertical" />
                        <el-icon :class="['fixed-icon', colum.fixed === 'right' && 'active']" title="固定到右边"
                            @click="onChangeFixed('right', colum)">
                            <Upload />
                        </el-icon>
                    </div>
                </div>
            </el-checkbox-group>
        </div>
    </el-popover>
</template>

<script lang="ts" setup>
import type { TableProvies } from './../type';


const tableProps = inject<TableProvies>("table-extend");

/**显示列设置-全选 */
const checkAllColumns = ref<boolean>(true);
/**显示列设置-全选状态 */
const isIndeterminate = ref<boolean>(false);
/**列设置-选中列 */
const checkColumnProp = computed<Array<string | undefined>>(() => {
    return tableProps && tableProps.columnConfig.showColumn.map((m) => m.prop) || [];
})

const tableColums = computed(() => {
    return tableProps?.tableColums.value || []
})

/**显示列全选 */
function onCheckAllColumnChange(e: boolean) {
    if (e) {
        tableProps && (
            tableProps.columnConfig.showColumn = tableColums.value)
    } else {
        tableProps && (
            tableProps.columnConfig.showColumn = []);
    }
}

/**显示列设置-列显示/隐藏切换 */
function onCheckedColumnChange(colProps: Array<string>) {
    if (tableProps) {
        tableProps.columnConfig.showColumn = tableColums.value.filter((f: any) => colProps.includes(f.prop));
        const checkedCount = colProps.length;
        checkAllColumns.value = checkedCount === tableColums.value.length;
        isIndeterminate.value = checkedCount > 0 && checkedCount < tableColums.value.length;
    }
}

/**固定列 */
function onChangeFixed(type: 'left' | 'right', prop: any) {
    if (prop.fixed === type) {
        prop.fixed = undefined;
    }
    else {
        prop.fixed = type;
    }
}

</script>