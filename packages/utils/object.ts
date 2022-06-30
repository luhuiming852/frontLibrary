// 深拷贝对象
export function deepClone(obj: any): any {
  const _toString: Function = Object.prototype.toString;
  // null, undefined, non-object, function
  if (!obj || typeof obj !== "object") {
    return obj;
  }
  // DOM Node
  if (obj.nodeType && "cloneNode" in obj) {
    return obj.cloneNode(true);
  }
  // Date
  if (_toString.call(obj) === "[object Date]") {
    return new Date(obj.getTime());
  }
  // RegExp
  if (_toString.call(obj) === "[object RegExp]") {
    const flags: Array<string> = [];
    if (obj.global) {
      flags.push("g");
    }
    if (obj.multiline) {
      flags.push("m");
    }
    if (obj.ignoreCase) {
      flags.push("i");
    }

    return new RegExp(obj.source, flags.join(""));
  }
  const result: any = Array.isArray(obj)
    ? []
    : obj.constructor
    ? new obj.constructor()
    : {};

  for (const key in obj) {
    result[key] = deepClone(obj[key]);
  }
  return result;
}
