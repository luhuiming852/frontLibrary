import * as echarts from "echarts/core";

const echartMap: Map<string, echarts.ECharts> = new Map();
/**
 * echarts类
 * @returns echartsType
 */
export default function useEcharts() {
  /**
   * 渲染图表
   * @param option
   * @param domId
   * @param isdark
   */
  function renderChart(option: any, domId: string, isdark: boolean = false) {
    let chart = echartMap.get(domId);
    chart && chart.dispose() && removeChart(domId);
    const chartDom = document.querySelector(domId);
    if (!chartDom) return;
    chart = echarts.init(
      chartDom as HTMLElement,
      (isdark && "dark") || undefined
    );

    chart.setOption({ ...option });
    echartMap.set(domId, chart);
  }

  /**
   * 删除图表
   * @param {string} domId
   */
  function removeChart(domId: string) {
    echartMap.delete(domId);
  }

  return {
    renderChart,
    removeChart,
  };
}
