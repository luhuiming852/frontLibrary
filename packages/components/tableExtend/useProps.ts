import type { PropType } from "vue";
import { TableAttr, TableColumn } from "./type";

/**表单组件属性 */
export default function useProps() {
  return {
    /**UI选项配置 */
    options: {
      type: Object as PropType<TableAttr>,
      default: () => {
        return {};
      },
    },
    /**表格数据源 */
    tableData: {
      type: Array,
      default: [],
    },
    /**表格列(所有列) */
    tableColums: {
      type: Array as PropType<Array<TableColumn>>,
      default: () => [],
    },
    /**loading显示状态 */
    tableLoading: Boolean,
    /**是否显示列check */
    selectionCol: {
      type: Boolean,
      default: () => true,
    },
    /**是否显示索引列 */
    indexCol: {
      type: Boolean,
      default: () => true,
    },
    /**是否能设置表格列 */
    isSetColumn: {
      type: Boolean,
      default: () => false,
    },
    /**是否显示分页 */
    paging: {
      type: Object as PropType<{ pageIndex: number; pageSize: number }>,
    },
    /**总数 */
    total: Number,
    /**可选页面大小 */
    sizeList: {
      type: Array as PropType<Array<number>>,
      default: () => [15, 20, 30],
    },
  };
}
