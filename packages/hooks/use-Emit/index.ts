import mitt, { Emitter, EventType } from "mitt";

interface UseEitter {
  /**
   * 全局事件对象
   */
  emitter: Emitter<Record<EventType, unknown>>;
}

type event = { key: string; value: (obj?: any) => void };

const emitter: Emitter<Record<EventType, unknown>> = mitt();

export default function useEitter(eventlist?: Array<event>): UseEitter {
  onMounted((): void => {
    if (eventlist && eventlist.length > 0) {
      for (let i = 0; i < eventlist.length; i++) {
        emitter.on(eventlist[i].key, eventlist[i].value);
      }
    }
  });

  onUnmounted((): void => {
    if (eventlist && eventlist.length > 0) {
      for (let i = 0; i < eventlist.length; i++) {
        emitter.off(eventlist[i].key, eventlist[i].value);
        // 从map中移除
        emitter.all.delete(eventlist[i].key);
      }
    }
  });

  return {
    emitter,
  };
}
