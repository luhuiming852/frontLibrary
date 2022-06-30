/**
 * 判断是否为undefined
 * @param val
 * @returns
 */
export function isUndefined(val: any): boolean {
  return val === undefined;
}
/**
 * 是否为数组
 * @param val
 * @returns
 */
export function isArray(val: any) {
  return Object.prototype.toString.call(val) === "[object Array]";
}
/**
 * 是否为对象
 * @param val
 * @returns
 */
export function isObject(val: any) {
  return Object.prototype.toString.call(val) === "[object Object]";
}

/**
 * 是否为日期时间
 * @param val
 * @returns
 */
export function isDate(val: any) {
  return Object.prototype.toString.call(val) === "[object Date]";
}

/**
 * 是否为空
 * @param val
 * @returns
 */
export function isEmpty(val: unknown) {
  return (
    (!val && val !== 0) ||
    (isArray(val) && (<Array<unknown>>val).length === 0) ||
    (isObject(val) && !Object.keys(val as any).length)
  );
}

/**
 * 判断对象是否为DOM元素
 * @param e
 * @returns
 */
export function isElement(e: unknown): e is Element {
  if (typeof Element === "undefined") return false;
  return e instanceof Element;
}

/**
 * 是否是客户端
 */
export const isClient = typeof window !== "undefined";
