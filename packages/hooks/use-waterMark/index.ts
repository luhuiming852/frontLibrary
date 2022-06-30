type UseWaterMark = {
  /**
   * 创建水印
   */
  createWaterMark: (
    warper: string | null,
    str1: string,
    str2?: string,
    textColor?: string
  ) => void;
  /**
   * 移除水印
   */
  removeWatermark: () => void;
};
/**
 * ==============================================
 * 水印功能
 * ==============================================
 */
export default function useWaterMark(): UseWaterMark {
  const id: string = "A77B030B-E33D-C656-7642-56D6FEA46059";

  /**
   * 添加水印方法
   * @param warper 绘制容器DOM
   * @param str1 主标题
   * @param str2 副标题
   * @param textColor 文字颜色
   */
  function createWaterMark(
    warper: string | null = null,
    str1: string,
    str2?: string,
    textColor?: string
  ): void {
    let id: string = setWatermark(warper, str1, str2, textColor);
    if (document.getElementById(id) === null) {
      id = setWatermark(warper, str1, str2);
    }
  }

  /**
   * 移除水印
   */
  function removeWatermark(): void {
    const element: HTMLElement | null = document.getElementById(id);
    element?.remove();
  }

  function setWatermark(
    warper: string | null = null,
    str1: string,
    str2?: string,
    textColor: string = "#999"
  ) {
    const warperElement: Element | null =
      warper != null ? document.querySelector(warper) : document.body;
    const element: HTMLElement | null = document.getElementById(id);
    if (element !== null) {
      warperElement?.removeChild(element);
    }

    let canvas: HTMLCanvasElement | null = document.createElement("canvas");
    // 设置canvas画布大小
    canvas.width = 250;
    canvas.height = 150;

    let cans: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (cans) {
      cans.font = "16px Avenir,Helvetica,Arial,sans-serif";
      cans.fillStyle = textColor.replace(/\,\s(1|(0.\d+)\))/, ", 0.1"); //设置水印的颜色
      cans.textAlign = "left";
      cans.textBaseline = "middle";
      cans.rotate((-15 * Math.PI) / 180); // 水印旋转角度
      cans?.fillText(str1, 0, canvas.height); // 水印在画布的位置x，y轴
      str2 &&
        cans?.fillText(str2, cans.measureText(str1).width + 16, canvas.height);
    }

    let div: HTMLDivElement | null = document.createElement("div");
    div.id = id;
    div.style.pointerEvents = "none";
    div.style.top = "0px";
    div.style.left = "0px";
    div.style.position = "fixed";
    div.style.zIndex = "100000";
    const { clientWidth, clientHeight } = document.documentElement;
    div.style.width = clientWidth + "px";
    div.style.height = clientHeight + "px";
    div.style.background =
      "url(" + canvas.toDataURL("image/png") + ") left top repeat";
    warperElement?.appendChild(div);
    return id;
  }

  return {
    createWaterMark,
    removeWatermark,
  };
}
