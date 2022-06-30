/**
 * 树形数据扁平化处理
 * @param data 数据
 * @param key key属性
 * @param children children属性
 */
export function treeFlat(
  listData: any[],
  key: string = "key",
  children: string = "children"
): Record<string, any> {
  const map: Record<string, any> = {};
  const flat = (data: any[], parentKey?: string) => {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      const mapKey = item[key];
      if (map[mapKey]) {
      } else {
        map[mapKey] = item;
        if (parentKey) map[mapKey].parent = map[parentKey];
        const itemChildren = item[children];
        if (itemChildren && itemChildren.length > 0) {
          flat(itemChildren, item[key]);
        }
      }
    }
  };
  flat(listData);
  return map;
}
