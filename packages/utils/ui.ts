/**
 * ==============================================
 * 强依赖element-plus
 * ==============================================
 */
import { ElMessage, ElMessageBox } from "element-plus";

/**
 * 获取静态图片中指定名称的完整路径
 * 图片默认在/assets/images下
 * @param fileName
 * @returns
 */
export function getImageUrl(fileName: string) {
  return (
    (fileName &&
      new URL(`./../../assets/images/${fileName}`, import.meta.url).href) ||
    ""
  );
}

/**
 * 确认提示框
 * @param str 提示信息
 * @param callback 确认回调函数
 */
export function confirmBox(str: string, callback: () => any | void) {
  ElMessageBox.confirm(`此操作将${str}, 是否继续?`, "提示", {
    // confirmButtonText: "确定",
    // cancelButtonText: "取消",
    type: "warning",
    beforeClose: (
      action: "confirm" | "cancel" | "close",
      instance: any,
      done: () => void
    ) => {
      if (action === "confirm") {
        setTimeout(() => {
          done();
        }, 0);
      } else {
        done();
      }
    },
  })
    .then(async () => {
      callback && callback();
    })
    .catch(() => {});
}

/**
 * 同步的确认提示框
 * @param str 提示信息
 * @param callback 确认回调函数
 * @returns
 */
export function confirmBoxAsync(
  str: string,
  callback: () => any | void
): Promise<any> {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(`${str}`, "Tip", {
      // confirmButtonText: "确定",
      // cancelButtonText: "取消",
      type: "warning",
      beforeClose: (action, instance, done) => {
        if (action === "confirm") {
          setTimeout(() => {
            done();
          }, 0);
        } else {
          done();
        }
      },
    }).then(() => {
      resolve(callback && callback());
    });
  });
}

/**
 * 消息提示
 * @export
 * @param type 类型
 * @param message 消息
 * @param html 是否为html
 * @param duration 消失时间
 */
export function messageAlert(
  type: "success" | "warning" | "error",
  message: string = "",
  html: boolean = false,
  duration: number = 3000
) {
  ElMessage({
    showClose: true,
    message: message,
    type: type,
    duration,
    dangerouslyUseHTMLString: html,
  });
}
