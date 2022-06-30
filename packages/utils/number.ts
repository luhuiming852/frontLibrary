/**
 * 数字转成千分位
 * @param num
 * @returns
 */
export function thousandSeparator(num: number): string {
  if (!num) {
    return "0";
  }
  return ("" + num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");
}
