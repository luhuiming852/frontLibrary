import {
  ColumnConfig,
  ImageViewer,
  Pagination,
  TableAttr,
  TableColumn,
  FileType,
} from "./type";

/**
 * useTable
 */
export default function useTable(i18nInstance?: any) {
  const props: any = getCurrentInstance()?.props;
  /**
   * 默认外观配置
   * @type {*}
   */
  const defalutTableAttr: TableAttr = {
    rowKey: "Id",
    "element-loading-text": "加载中…",
    "element-loading-background": "rgba(0, 0, 0, 0.2)",
    highlightCurrentRow: true,
    stripe: true,
    border: true,
  };
  /**
   * 默认列配置
   * @type {*}
   */
  const defColSetting: TableColumn = {
    headerAlign: undefined,
    align: undefined,
    prop: undefined,
    label: undefined,
    init: true,
    width: undefined,
    showOverflowTooltip: false,
    sortable: undefined,
    fixed: undefined,
  };

  /**表格属性 */
  const tableAttribute = ref({
    ...defalutTableAttr,
    ...(Object.keys(props.options).length > 0 ? toRefs(props.options) : {}),
  });

  // 列设置
  const colSetDialogOption = ref(false);

  /** 选中行 */
  const selectionOptions = reactive<Record<string, any>>({
    count: 0,
    rows: [],
  });

  /**分页设置 */
  const pagination = computed<Pagination>({
    get() {
      return {
        pageIndex: props.paging?.pageIndex || 1,
        pageSize: props.paging?.pageSize || 15,
        has: props.paging?.pageIndex > 0 && props.paging?.pageSize > 0,
      };
    },
    set(options) {
      const { pageIndex, pageSize } = options;
      props.paging && pageIndex && (props.paging.pageIndex = pageIndex);
      props.paging && pageSize && (props.paging.pageSize = pageSize);
    },
  });

  /**图片视图配置 */
  const imageViewer = reactive<ImageViewer>({
    /**是否显示 */
    show: false,
    /**图片路径 */
    filePathList: [] as any[],
    /**显示图片的索引 */
    index: 0,
  });

  /**显示、隐藏列 */
  const columnConfig = reactive<ColumnConfig>({
    showColumn: [],
    hiddenColumn: [],
  });

  /**
   * 表格显示列
   * @type {*}
   */
  const colSettingList = computed<TableColumn[]>(() => {
    const colList = columnConfig.showColumn.map(
      (item: TableColumn, index: number) => {
        item.langue && (item.label = i18nInstance(item.langue));
        return { ...defColSetting, ...item };
      }
    );
    // 设置默认显示列(显示优化)
    if (!colList || colList.length === 0) {
      return [
        {
          prop: "default-prop",
          init: true,
          label: "",
        },
      ];
    }
    return colList;
  });

  /**
   * 是否包含图片预览功能
   * @type {*}
   */
  const hasImageViewer = computed<boolean>(() => {
    return colSettingList.value.some(
      (f: TableColumn) => f.fileType == FileType.PICTURE
    );
  });

  return {
    defColSetting,
    selectionOptions,
    /**表格配置属性 */
    tableAttribute,
    colSetDialogOption,
    pagination,
    imageViewer,
    columnConfig,
    colSettingList,
    hasImageViewer,
  };
}
