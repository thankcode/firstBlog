<template>
  <div class="myinfo">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息维护</el-breadcrumb-item>
      <el-breadcrumb-item>个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" @click="addAdministrator">添加管理员</el-button>
      <!--      表格-->
      <el-table
              :data="tableUserData"
              border
              style="width: 100%">
        <el-table-column
                label="#"
                type="index">
        </el-table-column>
        <el-table-column
                prop="name"
                label="博名"
                width="180">
        </el-table-column>
        <el-table-column
                prop="email"
                label="邮箱"
                width="300">
        </el-table-column>
        <el-table-column
                prop="saying"
                label="简介">
        </el-table-column>
        <el-table-column
                label="操作">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" circle @click="openUpdateUserInfo(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!--    修改用户信息弹出层-->
    <el-dialog
            title="修改管理员信息"
            :visible.sync="isShowUserInfoDialog"
            width="30%"
            :before-close="closeUpdateUserInfoDialog">
      <span>
        <el-form :model="userInfo" :rules="userInfoRules" ref="userInfoRulesRule" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="头像">
            <div class="div">
              <img :src="userInfo.imgPath" alt="">
            </div>
            <el-upload
                    action="http://localhost:3000/updateImg"
                    :show-file-list="false"
                    :on-success="updateFile">
              <i class="el-icon-plus"></i>
            </el-upload>

          </el-form-item>
          <el-form-item label="博名" prop="name">
            <el-input v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="个性签名" prop="sign">
            <el-input v-model="userInfo.saying"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfo.email"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelUpdateUserInfoDialog">取 消</el-button>
        <el-button type="primary" @click="affirmUpdateUserInfoDialog">确 定</el-button>
      </span>
    </el-dialog>

    <!--    添加用户信息弹出层-->
    <el-dialog
            title="修改管理员信息"
            :visible.sync="isShowAddUserInfoDialog"
            width="30%"
            :before-close="closeAddUserInfoDialog">
      <span>
        <el-form :model="addUserInfo" :rules="userInfoRules" ref="AddUserInfoRulesRule" label-width="100px"
                 class="demo-ruleForm">
          <el-form-item label="头像">
            <div class="div">
              <img :src="addUserInfo.imgPath" alt="">
            </div>
            <el-upload
                    action="http://localhost:3000/updateImg"
                    :show-file-list="false"
                    :on-success="addUserInfoImg">
              <i class="el-icon-plus"></i>
            </el-upload>

          </el-form-item>
          <el-form-item label="博名" prop="name">
            <el-input v-model="addUserInfo.name"></el-input>
          </el-form-item>
          <el-form-item label="个性签名" prop="saying">
            <el-input v-model="addUserInfo.saying"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addUserInfo.email"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelAddUserInfoDialog">取 消</el-button>
        <el-button type="primary" @click="affirmAddUserInfoDialog">确 定</el-button>
      </span>
    </el-dialog>
    <!--    -->
  </div>
</template>

<script>
  export default {
    name: "MyInfo",
    data() {
      return {
        userInfoImg: '',
        // 用户信息
        userInfo: {},
        // 添加用户
        addUserInfo:{},
        // 校验
        userInfoRules: {
          name: [
            {required: true, message: '博名不能为空', trigger: 'blur'},
            {min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur'}
          ],
          saying: [
            {required: true, message: '个性签名不能为空', trigger: 'blur'},
            {min: 5, max: 30, message: '长度在 5 到 25个字符', trigger: 'blur'},
          ],
          email: [
            {required: true, message: '请输入邮箱地址', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ]
        },
        //  默认不显示弹出层
        isShowUserInfoDialog: false,
        // 添加用户弹出层默认不显示
        isShowAddUserInfoDialog:false,
        // table数据
        tableUserData: [],
        //当前用户id
        userID: ''
      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      // 获取用户信息
      async getUserInfo() {
        const {status, data} = await this.$http.get('authorList', {})
        if (status !== 200) return this.$message.error('服务器异常')
        this.tableUserData = data
      },
      // 对话框关闭事件
      closeUpdateUserInfoDialog() {
        this.isShowUserInfoDialog = false
        this.$refs.userInfoRulesRule.resetFields()
      },
      //打开并获取管理员信息
      async openUpdateUserInfo(row) {
        this.userID = row.id
        this.isShowUserInfoDialog = true
        const {status, data} = await this.$http.get('authorListByID', {
          params: {
            id: row.id
          }
        })
        if (status !== 200) this.message.error('服务器异常')
        console.log(data)
        this.userInfo = data[0]

      },
      // 取消并关闭更改信息
      cancelUpdateUserInfoDialog() {
        this.isShowUserInfoDialog = false
        this.$refs.userInfoRulesRule.resetFields()
      },
      // 保存关闭并更改信息
      affirmUpdateUserInfoDialog() {
        this.$refs.userInfoRulesRule.validate(async validate => {
          if (!validate) return this.$message.error('不符合规范')
          const {status, data} = await this.$http.post('updateUserInfo', {
            userInfo: this.userInfo
          })
          console.log(data)
          if (status !== 200 && data.message === '修改成功' && data.code === 200) return this.$message.error('用户信息更新失败')
          this.$message.success('更改成功')
          this.isShowUserInfoDialog = false
        })
      },
      // 更新用户头像
      async updateFile(response, file, fileList) {
        if (response.code !== 200 || response.msg !== "保存成功") return this.$message.error('异常,设置头像失败')
        this.userInfo.imgPath = response.url
        const {status, data} = await this.$http.get('updateUserImg', {
          params: {
            userID: this.userID,
            url: response.url,
          }
        })
        if (status !== 200 && data === '1') return this.$message.error('异常,设置头像失败')
        this.$message.success('头像添加成功')
      },
      // 打开添加管理员悬浮窗
      async addAdministrator() {
        this.isShowAddUserInfoDialog = true
      },
      // 关闭添加管理员弹出层
      closeAddUserInfoDialog(){
        this.isShowAddUserInfoDialog = false
        this.$refs.AddUserInfoRulesRule.resetFields()

      },
      // 取消添加admin
      cancelAddUserInfoDialog(){
        this.isShowAddUserInfoDialog = false
        this.$refs.AddUserInfoRulesRule.resetFields()
      },
      // 确认添加新用户
      affirmAddUserInfoDialog(){
        this.$refs.AddUserInfoRulesRule.validate(async validate => {
          if (!validate) return this.$message.error('不符合规范')
          const {status, data} = await this.$http.post('addUserInfo', {
            addUserInfo: this.addUserInfo
          })
          console.log(data)
          if (status !== 200 && data.message === '修改成功' && data.code === 200) return this.$message.error('用户信息更新失败')
          this.$message.success('更改成功')
          this.isShowAddUserInfoDialog = false
          this.addUserInfo = {}
          this.getUserInfo()
        })
      },
      //新增用户头像
      async addUserInfoImg(response, file, fileList) {
        if (response.code !== 200 || response.msg !== "保存成功") return this.$message.error('异常,设置头像失败')
        this.addUserInfo.imgPath = response.url
        const {status, data} = await this.$http.get('updateUserImg', {
          params: {
            url: response.url,
          }
        })
        if (status !== 200 && data === '1') return this.$message.error('异常,设置头像失败')
        this.$message.success('头像添加成功')
      }

    }
  }
</script>

<style scoped lang="less">
  .el-card {
    margin-top: 20px;

    .el-table {
      margin-top: 20px;
    }
  }

  .el-dialog {
    .div[data-v-8365c0a2] {
      height: 100px;
      width: 100px;

      img {
        height: 100%;
        width: 100%;
        background: url("../../../assets/img/user.png");
      }
    }

  }

</style>