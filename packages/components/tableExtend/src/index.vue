<template>
  <div class="table-extend">
    <div class="tool-panel">
      <div class="left-panel">
        <slot name="tool-left"></slot>
      </div>
      <div class="right-panel">
        <slot name="tool-right">
          <col-visible-setting v-if="isSetColumn"></col-visible-setting>
        </slot>
      </div>
    </div>
    <el-table ref="tableRef" v-bind="tableAttribute" :data="tableData" v-loading="tableLoading" height="100%"
      @sort-change="tableSort" @selection-change="handleSelectionChange" @row-click="rowClick"
      @row-dblclick="rowDblClick">
      <el-table-column v-if="selectionCol" type="selection" width="48"></el-table-column>
      <el-table-column v-if="indexCol" class="table-index" type="index" width="58"></el-table-column>
      <template v-for="item in colSettingList" :key="item.prop">
        <el-table-column v-if="isUpload(item.prop)" v-bind="item">
          <template #default="scope">
            <file-col v-bind="{ row: scope.row, colCfg: item }"></file-col>
          </template>
        </el-table-column>
        <el-table-column v-else-if="item.isHtml" v-bind="item">
          <template #default="scope">
            <div v-html="item.prop && scope.row[item.prop]"></div>
          </template>
        </el-table-column>
        <el-table-column v-else-if="item.isProgress" v-bind="item" width="700">
          <template #default="scope">
            <progress-col v-bind="{ row: scope.row, colCfg: item }"></progress-col>
          </template>
        </el-table-column>
        <el-table-column v-else-if="item.isProcess" v-bind="item">
          <template #default="scope">
            <component :is="componentList?.get(item.prop).componentTag" :component="item.componentOption"
              :model="scope.row.progressData"></component>
          </template>
        </el-table-column>
        <template v-else>
          <el-table-column v-if="item.init" v-bind="item">
            <template #default="scope">
              <slot :name="`col_${item.prop}`" :data="scope.row">
                <value-col v-bind="{ row: scope.row, colCfg: item }"></value-col>
              </slot>
            </template>
          </el-table-column>
        </template>
      </template>
      <slot name="operatColumn"></slot>
      <!-- 空 -->
      <template #empty>
        <el-empty :image-size="60"></el-empty>
      </template>
    </el-table>
    <el-pagination v-if="pagination.has" background @size-change="pageSizeChange" @current-change="currentChange"
      :current-page="pagination.pageIndex" :page-sizes="sizeList" :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    <el-image-viewer v-if="hasImageViewer" ref="imageViewerRef" v-show="imageViewer.show"
      :url-list="imageViewer.filePathList" :initial-index="imageViewer.index" hide-on-click-modal
      @close="imageViewer.show = false"></el-image-viewer>
  </div>
</template>

<script lang="ts" setup>
// import { ElTable, ElTableColumn, ElPagination, ElImageViewer, ElEmpty, vLoading } from 'element-plus';
import useTable from "./../useTable";
import type { TableProvies } from "./../type";
import useProps from './../useProps';
import useProvies from './../useProvies';
import FileCol from './fileCol.vue';
import ProgressCol from './progressCol.vue';
import ValueCol from './valueCol.vue';
import ColVisibleSetting from './colVisible.vue';

const props = defineProps(useProps());

const emit = defineEmits([
  "tableSort",
  "handleSelectionChange",
  "currentChange",
  "pageSizeChange",
  "rowClick",
  "rowDblClick"
]);

const { t: i18nInstance } = useI18n();

const {
  selectionOptions,
  tableAttribute,
  pagination,
  imageViewer,
  columnConfig,
  colSettingList,
  hasImageViewer,
} = useTable(i18nInstance);

provide<TableProvies>("table-extend", {
  tableProps: props,
  imageViewer,
  tableColums: toRef(props, "tableColums"),
  columnConfig,
});

const { isUpload, componentList } = useProvies();

const tableRef = ref<any>(null);

const imageViewerRef = ref<any>(null);

watch(
  () => props.tableColums,
  () => {
    columnConfig.showColumn = props.tableColums;
  }
)

onMounted((): void => {
  nextTick(() => {
    props.tableColums && props.tableColums.length > 0 && (columnConfig.showColumn = props.tableColums);
  })
})

defineExpose({
  clearSelection
})

/**
 * 排序
 */
function tableSort(column: any) {
  emit("tableSort", {
    sortName: column.prop,
    sortType:
      column.order === "descending"
        ? "desc"
        : column.order === "ascending"
          ? "asc"
          : "",
  });
}

/**
 * 行勾选事件
 */
function handleSelectionChange(rows: any) {
  selectionOptions.rows = rows;
  selectionOptions.count = rows && rows.length;
  emit("handleSelectionChange", rows);
}

/**
 * 行点击事件
 */
function rowClick(rows: any[]) {
  emit("rowClick", rows);
}

/**
 * 双击事件
 */
function rowDblClick(rows: any) {
  emit('rowDblClick', rows);
}

/**
 * 当前页改变
 */
function currentChange(current: number): void {
  if (!current) return;
  pagination.value.pageIndex = current;
  emit("currentChange", pagination.value);
}

/**
 * 页面大小改变
 */
function pageSizeChange(pagesize: number): void {
  if (!pagesize) return;
  pagination.value.pageIndex = 1;
  pagination.value.pageSize = pagesize;
  emit("pageSizeChange", pagination.value);
}

function clearSelection() {
  tableRef.value?.clearSelection();
}

</script>

<!-- <style lang="scss">
@import "./styles/table-extend.scss";
</style> -->