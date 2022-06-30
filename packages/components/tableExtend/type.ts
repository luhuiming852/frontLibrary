import type { Ref } from "vue";

// 定义可设置table属性的结构
export type TableAttr = {
  /**rowKey */
  rowKey?: string;
  /**loading显示文本 */
  "element-loading-text"?: string;
  /**loading 图标 */
  "element-loading-spinner"?: string;
  /**loading 遮罩背景色 */
  "element-loading-background"?: string;
  /** 选中行高亮*/
  highlightCurrentRow?: boolean;
  /**斑马样式 */
  stripe?: boolean;
  /**边框 */
  border?: boolean;
  /**空数据显示文本 */
  emptyText?: string;
  /**列合并方法 */
  spanMethod?: Function;
  /**合计列计算方法 */
  summaryMethod?: Function;
  /**树形配置 */
  treeProps?: { children: string; hasChildren: string };
  /**默认展开行 */
  expandRowKeys?: Array<string | number>;
  /**默认展开全部 */
  defaultExpandAll?: boolean;
};

/**分页 */
export type Pagination = {
  /**页码 */
  pageIndex: number | undefined;
  /**每页显示数量 */
  pageSize: number | undefined;
  has: boolean;
};

/**列配置 */
export type ColumnConfig = {
  /**显示列 */
  showColumn: TableColumn[];
  /**隐藏列 */
  hiddenColumn: TableColumn[];
};

/**注入结构 */
export type TableProvies = {
  tableProps: TableProp;
  imageViewer: ImageViewer;
  tableColums: Ref<Array<TableColumn>>;
  columnConfig: ColumnConfig;
};

export type ImageViewer = {
  /**是否显示 */
  show: boolean;
  /**图片路径 */
  filePathList: any[];
  /**显示图片的索引 */
  index: number;
};

export enum FileType {
  /** 图片 */
  PICTURE = 1,
  /** PDF */
  PDF = 2,
  /** 其他 */
  OTHER = 3,
}

/**
 * 表格属性
 */
export interface TableProp {
  /**UI选项配置 */
  options?: TableAttr;
  /**表格数据源 */
  tableData?: Array<any>;
  /**表格列(所有列) */
  tableColums: Array<TableColumn>;
  /**Loading状态 */
  tableLoading?: boolean;
  /**是否显示列check,默认true */
  selectionCol?: boolean;
  /**是否显示索引列,默认true */
  indexCol?: boolean;
  /**是否能设置表格列,默认false */
  isSetColumn?: boolean;
  /**分页配置 */
  paging?: {
    pageIndex: number;
    pageSize: number;
  };
  /**总数 */
  total?: number;
  /**可选页面大小 */
  sizeList?: Array<number>;
}

export interface TableColumn {
  /**
   * 表头文本对齐方式
   */
  headerAlign?: string;
  /**
   * 表格内容对齐方式
   */
  align?: string;
  /**
   * 列绑定数据字段
   */
  prop?: string;
  /**
   * 表头名称
   */
  label?: string;
  /**
   * 是否显示
   */
  init?: boolean;
  /**
   * 表格宽度
   */
  width?: number;
  /**
   * 最小宽度
   */
  minWidth?: number;
  /**
   * 是否显示单元格内容tooltip
   */
  showOverflowTooltip?: boolean;
  /**
   * 是否能排序
   */
  sortable?: boolean;
  /** 是否固定 */
  fixed?: boolean;
  /** 是否为文件 */
  isFile?: boolean;
  /**
   * 图片类型
   */
  fileType?: FileType;
  /**
   * 数据是否为HTML
   */
  isHtml?: boolean;
  /**
   * 是否为进度条
   */
  isProgress?: boolean;
  /**
   * 是否为工序进度
   */
  isProcess?: boolean;
  /**
   * 组件配置列表
   */
  componentOption?: any;
  /**页面Id*/
  // pageId?: number;
  /**多语言配置 */
  langue?: string;
}
