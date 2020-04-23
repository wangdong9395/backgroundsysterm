<template>
    <el-container class="home">
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
}
</script>

<style lang="less" scoped>
    .el-container {
        height: 100%;
    }
    .el-header {
        width: 100%;
        background-color: #373D41;
    }
    .el-aside {
        width: 200px;
        background-color: #333744;
    }
    .el-main {
        background-color: #EAEDF1;
    }
</style>
