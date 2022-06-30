<template>
    <el-popover placement="bottom" title="列显示设置">
        <template #reference>
            <el-icon class="btn-col-setting">
                <setting />
            </el-icon>
        </template>
        <div class="set-column-list-wrap">
            <el-checkbox
                :indeterminate="isIndeterminate"
                v-model="checkAllColumns"
                @change="onCheckAllColumnChange"
            >全选</el-checkbox>
            <el-checkbox-group
                class="set-column-check-group"
                v-model="checkColumnProp"
                @change="onCheckedColumnChange"
            >
                <el-checkbox
                    class="set-column-check"
                    v-for="colum in tableColums"
                    :label="colum.prop"
                    :key="colum.prop"
                >{{ colum.label }}</el-checkbox>
            </el-checkbox-group>
        </div>
    </el-popover>
</template>

<script lang="ts" setup>
// import { ElPopover, ElIcon, ElCheckbox, ElCheckboxGroup } from 'element-plus';
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

</script>