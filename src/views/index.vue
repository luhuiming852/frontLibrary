<template>
    <div class="page-container">
        <div class="side-container">
            <el-menu default-active="0">
                <el-menu-item :index="`${index}`" v-for="item, index in menus" :key="item.name"
                    @click="menuClick(item)">
                    <el-icon>
                        <Menu />
                    </el-icon>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="main-container">
            <router-view v-slot="{ Component }">
                <component :is="Component" />
            </router-view>
        </div>
    </div>
</template>

<script lang="ts" setup>
const router = useRouter()

const menus = ref<any[]>([{
    name: "动态页面1",
    route: "/dynamic/db28730d-dd23-4f9d-92ba-31f42c90f607"
}, {
    name: "工具库",
    route: "/tool"
}])

function menuClick(item: any): void {
    router.push({ path: item.route })
}

</script>

<style lang="scss" scoped>
.page-container {
    display: flex;
    flex: 1 0 0%;
}

.side-container {
    width: 200px;
}

.main-container {
    padding: 0 30px;
    flex: 1 0 0%;
    display: flex;
    flex-direction: column;
}
</style>