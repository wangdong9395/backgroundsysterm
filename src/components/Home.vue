<template>
    <el-container class="home">
        <el-header>
            <div>
                <img src="../assets/images/heima.png" alt="" class="avatar">
                <span class="title">后台管理系统</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside width="200px">
                            <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    background-color="#333744"
                    text-color="#fff"
                    active-text-color="#409EFF"
                    unique-opened
                    router
                    >
                    <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
                    <template slot="title">
                        <i :class="iconObj[item.id]"></i>
                        <span class="submenuItem">{{item.authName}}</span>
                    </template>
                        <el-menu-item v-for="value in item.children" :key="value.id" :index="value.path">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{value.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
            <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      menuList: [], // 菜单列表
      iconObj: {
        125: 'iconfont icon-user-group',
        103: 'iconfont icon-quanxianguanli',
        101: 'iconfont icon-shangpin-tianchong',
        102: 'iconfont icon-dingdan2',
        145: 'iconfont icon-fl-shuju'
      }
    }
  },
  created () {
    this.getMenuList()
  },
  methods: {
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      console.log(res)
      if (res.meta.status === 200) {
        console.log(res.data)
        this.menuList = res.data
      }
    },
    logout () {
      sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
    .el-container {
        height: 100%;
    }
    .el-header {
        display: flex;
        width: 100%;
        background-color: #373D41;
        padding-left: 0;
        align-items: center;
        justify-content: space-between;
        div {
            display: flex;
            align-items: center;
            .title {
            font-size: 20px;
            color: #fff;
            margin-left: 30px;
            }
        }
    }
    .el-aside {
      background-color: #333744;
    }
    .el-menu {
      border: 0;
    }
    .el-submenu .el-menu-item {
      width: 200px;
    }
    .el-main {
        background-color: #EAEDF1;
        font-size: 30px;
        font-weight: 700;
    }
    .submenuItem {
        margin: 10px;
    }
</style>
