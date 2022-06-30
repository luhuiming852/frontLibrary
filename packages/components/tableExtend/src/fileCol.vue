<template>
    <template v-if="isImage(row, colCfg.prop)">
        <text-button @click="onPreviewPicture(row[colCfg.prop])">查看图片</text-button>
    </template>
    <template v-else-if="isFile(row, colCfg.prop)">
        <text-button @click="downLoadFiles(row[colCfg.prop])">下载文件</text-button>
    </template>
    <template v-else>
        <text-button disabled>--</text-button>
    </template>
</template>

<script lang="ts" setup>
import type { TableProvies } from "./../type";
import { useFile } from "@packages/hooks";
import useProvies from "./../useProvies";

const { isImage, isFile } = useProvies();
const { downLoadFiles } = useFile();

const tableProps = inject<TableProvies>("table-extend");

defineProps({
    row: {
        type: Object,
        default: () => { }
    },
    colCfg: {
        type: Object,
        default: () => { }
    }
})

/**
 * 图片视图
 */
function onPreviewPicture(files: any[]) {
    if (!files || files.length === 0) return;
    if (tableProps) {
        const { imageViewer } = tableProps
        imageViewer.show = true;
        imageViewer.filePathList = files.map((m) => m.url);
    }
}

</script>