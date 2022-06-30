<template>
    <div class="text-button" :class="[
        `text-button-${type}`,
        disabled && 'is-disabled'
    ]" @click.prevent.stop="onClick">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    type: {
        type: String,
        default: 'primary',
        validator: (val: string) => {
            return [
                'default',
                'primary',
                'success',
                'warning',
                'info',
                'error',
            ].includes(val)
        },
    },
    disabled: Boolean
});

const emit = defineEmits(["click"])

function onClick(e: any): void {
    if (props.disabled) return;
    emit("click", e)
}

</script>