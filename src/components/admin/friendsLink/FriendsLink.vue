<template>
  <div class="friends_link">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>友情链接</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" @click="addFriendsLink">添加友链</el-button>
      <el-table
              :data="friendsLink"
              style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="博名">
                    <el-input v-model="props.row.blogName" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="网站地址">
                    <el-input v-model="props.row.imgUrl" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="头像">
                    <el-input v-model="props.row.link" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="个性签名">
                    <el-input v-model="props.row.introduce" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="时间">
                    <el-input :disabled="true" v-model="props.row.time" placeholder="请输入内容"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-form-item>
                  <el-button type="primary" @click="saveFriendsLinkData(props.row.id)">保存修改</el-button>
                </el-form-item>
              </el-row>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
                label="#"
                type="index">
        </el-table-column>
        <el-table-column
                label="博名"
                prop="blogName">
        </el-table-column>
        <el-table-column
                label="网站地址"
                prop="imgUrl">
        </el-table-column>
        <el-table-column
                label="头像"
                prop="link">
        </el-table-column>
        <el-table-column
                label="个性签名"
                prop="introduce">
        </el-table-column>
        <el-table-column
                label="时间"
                prop="time">
        </el-table-column>
        <el-table-column
                label="操作">
          <template slot-scope="props">
            <el-tooltip class="item" effect="dark" content="移除友链" placement="top" :enterable="false" size="mini">
              <el-button type="danger" icon="el-icon-delete" circle
                         @click="deleteFriendsLink(props.row.id)"></el-button>
            </el-tooltip>
          </template>

        </el-table-column>
      </el-table>
    </el-card>


    <!--    弹出框-->
    <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
      <span>
        <el-form ref="friendsLinkRef" :rules="friendsLinkFormRules" :model="friendData">
          <el-form-item label="博名" prop="blogName">
            <el-input v-model="friendData.blogName"></el-input>
          </el-form-item>
          <el-form-item label="头像链接" prop="imgUrl">
            <el-input v-model="friendData.imgUrl"></el-input>
          </el-form-item>
          <el-form-item label="网站地址" prop="link">
            <el-input v-model="friendData.link"></el-input>
          </el-form-item>
          <el-form-item label="个性签名" prop="introduce">
            <el-input v-model="friendData.introduce"></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="closeDialogVisible">取 消</el-button>
    <el-button type="primary" @click="saveDialogVisible">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>


<script>
  export default {
    name: "FriendsLink",
    data() {
      return {
        friendsLink: [],
        dialogVisible: false,
        friendData: {
          blogName: "",
          imgUrl: "",
          link: "",
          introduce: ""
        },
        // 校验
        friendsLinkFormRules: {
          blogName: [
            {required: true, message: '博名不能为空', trigger: 'blur'}
          ],
          imgUrl: [
            {required: true, message: '头像链接', trigger: 'blur'}
          ],
          link: [
            {required: true, message: '网站地址', trigger: 'blur'}
          ],
          introduce: [
            {required: true, message: '个性签名', trigger: 'blur'}
          ],
        }
      }
    },
    created() {
      this.getFriendsLink()
    },
    methods: {
      async getFriendsLink() {
        const {status, data} = await this.$http.get('getLink',)
        if (status !== 200) this.$message.error('服务器异常')
        this.friendsLink = data
      },
      //保存修改
      saveFriendsLinkData(id) {
        this.friendsLink.forEach(async (item, i) => {
          if (item.id === id) {
            const {status, data} = await this.$http.get('updateFriendsLink', {
              params: {
                item
              }
            })
            if (status !== 200 || data.code !== 200) return this.$message.error('服务器异常')
            this.$message.success('修改成功')
          }
        })
      },
      async deleteFriendsLink(id) {
        const result = await this.$messagebox.confirm('此操作将永久删除该友链, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if (result === 'cancel') return this.$message.info('取消删除')

        const {status, data} = await this.$http.get('deleteFriendsLink', {
          params: {
            id
          }
        })
        if (status !== 200 || data.code !== 200) return this.$message.error('服务器异常')
        this.$message.success('移除成功')
        this.getFriendsLink()
      },
      // 关闭窗口
      handleClose() {
        this.dialogVisible = false
        this.$refs.friendsLinkRef.resetFields()
      },
      closeDialogVisible() {
        this.dialogVisible = false
        this.$refs.friendsLinkRef.resetFields()
      },
      saveDialogVisible() {
        this.$refs.friendsLinkRef.validate(async validate=>{
          if (!validate) return this.$message.error('请补全信息')
          const {status,data} = await this.$http.post('saveFriendData',{
            friendData:this.friendData
          })
          console.log(data)
          if (status !== 200 || data.code !== 200) return this.$message.error('服务器异常')
          this.$message.success('添加成功')
          this.$refs.friendsLinkRef.resetFields()
          this.dialogVisible = false
        })

      },
      addFriendsLink(){
        this.dialogVisible = true
      }
    }
  }
</script>

<style scoped lang="less">
  .friends_link {
    .el-breadcrumb {
      margin-bottom: 20px;
    }

    .el-form {
      .el-form--inline .el-form-item {
        margin: 0;
      }

      .el-form-item {
        width: 200px;
      }

      .el-input {
        width: 500px;
      }

      .el-button {
        margin-top: 20px;
      }
    }

    .el-button {
      margin-bottom: 20px;
    }

  }
</style>