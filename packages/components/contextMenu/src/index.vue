<template>
    <div class="contextmenu" v-click-outside="hide" v-show="visiable"
        :style="{ top: position.top, left: position.left }" ref="contextMenuRef">
        <div class="contextmenu-wrap">
            <ul class="contextmenu-items">
                <slot :data="menuList" name="items">
                    <li v-for="item in menuList" :key="item.key" @click="onMenuClick(item)">
                        {{ item.label }}
                    </li>
                </slot>
            </ul>
        </div>
    </div>
</template>

<script  lang="ts" setup>
import type { PropType } from 'vue';
import { ClickOutside as vClickOutside } from '@packages/directives'

defineProps({
    menuList: {
        type: Array as PropType<Record<string, any>>,
        default: [],
        required: true
    }
})

defineExpose({
    hide,
    show
})

const emit = defineEmits(['menuClick'])

const contextMenuRef = ref<any>(null)

const visiable = ref<boolean>(false)

const position: any = reactive<{ left: number, top: number }>({
    left: 0,
    top: 0,
})
/**
 * 菜单点击
 * @param params 
 */
function onMenuClick(params: any) {
    hide();
    emit('menuClick', params)
}

/**
 * 右键菜单显示
 */
function show(e: any) {
    e.preventDefault()
    const top = e.clientY + 10;
    const left = e.clientX - 10;
    position.top = `${top}px`;
    position.left = `${left}px`;
    visiable.value = true;
}

function hide() {
    visiable.value = false;
}

onMounted(() => {
    contextMenuRef.value.addEventListener("contextmenu", show);
});

onBeforeUnmount(() => {
    contextMenuRef.value.removeEventListener("contextmenu", show);
});

</script>

<!-- <style scoped lang="scss">
@import './../styles/index.scss';
</style> -->

