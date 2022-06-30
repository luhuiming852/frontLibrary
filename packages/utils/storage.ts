/**
 * 获取用户token,包含过期时间判断
 */
 export function getToken(): any | null {
    const session = localStorage.getItem("token");
    if (!session) {
      return undefined;
    }
    const data = JSON.parse(session);
    if (data !== null) {
      if (data.expirse != null && data.expirse < new Date().getTime()) {
        localStorage.removeItem("token");
      } else {
        return data.value;
      }
    }
    return null;
  }
  
  /**
   * 设置用户token,有效期默认七天
   * @param {*} value
   */
  export function setToken(value: any, expires?: number): void {
    (!expires && (expires = 7 * 24 * 60 * 60 * 1000)) ||
      (expires = expires * 1000);
    const data = { value: value, expirse: new Date().getTime() + expires };
    localStorage.setItem("token", JSON.stringify(data));
  }
  
  /**
   * 移除token
   */
  export function removeToken(): void {
    localStorage.removeItem("token");
  }
  /**
   * 设置缓存
   * @param key key
   * @param value 值
   */
  export function setStorage(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
  /**
   * 获取缓存
   * @param key
   * @returns
   */
  export function getStorage(key: string): any {
    let session = localStorage.getItem(key);
    if (session) {
      return JSON.parse(session || "");
    }
    return session;
  }
  
  /**
   * 删除指定key的缓存
   * @param key
   */
  export function removeStorage(key: string): void {
    localStorage.removeItem(key);
  }
  