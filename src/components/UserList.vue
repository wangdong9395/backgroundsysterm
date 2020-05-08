<template>
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card>
        <!-- 搜索与添加部分 -->
       <div class="serachAndAdd">
          <el-input placeholder="请输入内容" v-model="serchInput" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="serchUser"></el-button>
        </el-input>
        <el-button class="addUser" type="primary" @click="addUser">添加用户</el-button>
       </div>
        <!-- 用户列表 -->
         <el-table
    :data="userinfo"
    border
    style="width: 100%">
    <el-table-column
    label="#"
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="username"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      >
    </el-table-column>
    <el-table-column
      prop="mobile"
      label="电话"
      >
    </el-table-column>
    <el-table-column
      prop="role_name"
      label="角色"
      >
    </el-table-column>
    <el-table-column
      label="状态"
      >
     <template v-slot="scope">
       <el-switch v-model="scope.row.mg_state" @change="changeState(scope.row)"></el-switch>
     </template>
    </el-table-column>
    <el-table-column
      label="操作"
      width="180px"
      >
     <template v-slot="scope">
       <el-button type="primary" icon="el-icon-edit" size="mini" @click="editUser(scope.row.id)"></el-button>
       <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.id)"></el-button>
       <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
     </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
   <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage1"
      :page-sizes="[1, 5, 10]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNumber"
     >
    </el-pagination>
      </el-card>
      <!-- 添加用户 -->
      <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      >
        <el-form ref="addUserForm" :model="addUserForm" :rules="addUserFormRules" label-width="80px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addUserForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addUserForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUserForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addUserForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAddUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改编辑用户信息 -->
       <el-dialog
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      >
        <el-form ref="editUserForm" :model="editUserForm" :rules="editUserFormRules" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="editUserForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editUserForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="editUserForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="comfirmEdit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'UserList',
  data () {
    var checkMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('电话不能为空'))
      } else {
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if (!regMobile.test(value)) {
          return callback(new Error('请输入合法的电话'))
        }
        callback()
      }
    }
    return {
      queryInfo: {
        query: '',
        pagenum: 1, // 当前页码
        pagesize: 5 // 每页显示条数
      },
      userinfo: [],
      totalNumber: 0,
      currentPage1: 1,
      serchInput: '',
      addDialogVisible: false,
      editDialogVisible: false, // 是否展示修改用户对话框
      addUserForm: { // 添加用户信息
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserForm: { // 编辑用户信息
        id: '',
        username: '',
        email: '',
        mobile: ''
      },
      uId: '', // 用户id
      type: '', // 用户状态
      addUserFormRules: { // 添加用户的表单验证规则
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: checkMobile, trigger: 'blur' }
        ]
      },
      editUserFormRules: { // 修改用户的表单验证规则
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, validator: checkMobile, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      console.log(res)
      if (res.meta.status === 200) {
        this.userinfo = res.data.users
        this.totalNumber = res.data.total
      }
    },
    handleSizeChange (val) {
      this.queryInfo.pagesize = val
      this.queryInfo.pagenum = 1
      this.getUserList()
      this.currentPage1 = 1
    },
    handleCurrentChange (val) {
      this.queryInfo.pagenum = val
      this.getUserList()
    },
    addUser () {
      this.addDialogVisible = true
    },
    // 确认添加用户
    confirmAddUser (addUserForm) {
      this.$refs.addUserForm.validate(async (valid) => {
        if (valid) {
          const res = await this.$http.post('users', this.addUserForm)
          console.log(res)
          this.getUserList()
          this.addDialogVisible = false
        } else {
          return false
        }
        this.$refs.addUserForm.resetFields()
      })
    },
    // 关闭增加用户信息的dialog
    // closeAddUserDialog (addUserForm) {
    //   this.$refs.addUserForm.resetFields()
    // },
    // 确认修改用户
    async comfirmEdit (editUserForm) {
      this.$refs.editUserForm.validate(async (valid) => {
        if (valid) {
          console.log(valid)
          // console.log(this.editUserForm)
          const { data: res } = await this.$http.put('users/' + this.editUserForm.id, {
            email: this.editUserForm.email,
            mobile: this.editUserForm.mobile
          })
          // console.log(res)
          if (res.meta.status === 200) {
            this.$message.success('用户信息修改成功')
            this.editDialogVisible = false
            this.getUserList()
          } else {
            this.$message.error('用户信息修改失败')
          }
        } else {
          // console.log(valid)
          return false
        }
      })
    },
    // 删除用户
    async deleteUser (id) {
      // console.log(id)
      const { data: res } = await this.$http.delete('users/' + id)
      console.log(res)
      if (res.meta.status === 200) {
        this.$message.success('该用户已删除')
        this.getUserList()
      } else {
        this.$message.error('删除用户失败')
      }
    },
    // 修改编辑用户信息
    editUser (id) {
      console.log(id)
      this.userinfo.filter((item, index, array) => {
        if (item.id === id) {
          // console.log(item)
          this.editUserForm.username = item.username
          this.editUserForm.email = item.email
          this.editUserForm.mobile = item.mobile
          this.editUserForm.id = id
        }
      })
      this.editDialogVisible = true
    },
    // 用户搜索
    async serchUser () {
      this.queryInfo.query = this.serchInput
      const { data: res } = await this.$http.get('users', { params: this.queryInfo })
      console.log(res)
      if (res.meta.status === 200) {
        this.getUserList()
      }
    },
    // 改变switch的状态
    async changeState (info) {
      // console.log(info.id, info.mg_state)
      this.uId = info.id
      this.type = info.mg_state
      const { data: res } = await this.$http.put('users/' + this.uId + '/state/' + this.type)
      console.log(res)
      if (res.meta.status === 200) {
        this.$message.success('状态更新成功')
      } else {
        res.mg_state = !res.mg_state
        this.$message.error('状态更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 10px;
}
.el-input-group {
  width: 300px;
}
.addUser {
  margin-left: 20px;
}
.serachAndAdd {
  margin-bottom: 15px;
}
.el-pagination {
  margin-top: 15px;
}
</style>
