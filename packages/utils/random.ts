/**
 * ==============================================
 * 随机数
 * ==============================================
 */

/**
 * 生成[0-10000]的随机数,针对数据小量使用
 * @returns 随机数
 */
export function generateId(): number {
  return Math.floor(Math.random() * 10000);
}

/**
 * 生成[0-max]的随机数
 * @returns 随机数
 */
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max));
}

/**
 * 生成GUID
 * @returns
 */
export function guiID() {
  const gs = generateString;
  return `${gs()}${gs()}-${gs()}-${gs()}-${gs()}-${gs()}${gs()}${gs()}`;
}

/**
 * 随机字符串
 * @returns
 */
export function generateString(): string {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
