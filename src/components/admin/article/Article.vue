<template>
  <div class="article">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!--      添加文章-->
      <el-button type="primary" @click="openNewArticleDialog">新增文章</el-button>
      <el-table
              :data="articleList"
              style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form :rules="newArticleRules" ref="articleDataRuleForm" label-width="100px">
              <el-row :gutter="20">
                <el-col :span="6">
                  <el-form-item label="主题" prop="">
                    <el-input v-model="props.row.theme"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="大纲" prop="">
                    <el-input v-model="props.row.outline"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="作者" prop="">
                    <el-input v-model="props.row.author"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="分类" prop="">
                    <el-input v-model="props.row.classify"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-form-item label="图片上传" prop="verify">
                  <el-upload
                          action="http://localhost:3000/updateImage"
                          list-type="picture-card"
                          :on-success="(response, file, fileList)=>updateImg(response, file, fileList,props.row.id)">
                    <i class="el-icon-plus"></i>
                  </el-upload>
                  <i style="color: #ff0000">注意：图片和正文内容(Ctrl+s)修改后自动保存</i>
                  <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" alt="">
                  </el-dialog>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit(props.row.id)">保存修改</el-button>
                </el-form-item>
              </el-row>
            </el-form>
            <mavon-editor v-model="props.row.content" @change="saveMavon"/>
          </template>
        </el-table-column>
        <el-table-column
                label="#"
                type="index">
        </el-table-column>
        <el-table-column
                label="主题"
                prop="theme">
        </el-table-column>
        <el-table-column
                label="大纲"
                prop="outline">
        </el-table-column>
        <el-table-column
                label="时间"
                prop="time">
        </el-table-column>
        <el-table-column
                label="作者"
                prop="author">
        </el-table-column>
        <el-table-column
                label="分类"
                prop="classify">
        </el-table-column>
        <el-table-column
                label="图片"
                prop="imgpath">
          <template slot-scope="scope">
            <img :src="scope.row.imgpath" alt="" style="width: 50px;height: 50px">
          </template>
        </el-table-column>
        <el-table-column
                label="管理">
          <template slot-scope="props">
            <el-tooltip class="item" effect="dark" content="删除文章" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteArticle(props.row.id)"></el-button>
            </el-tooltip>
          </template>

        </el-table-column>
      </el-table>

    </el-card>

    <!--    弹出层-->
    <el-dialog
            title="提示"
            :visible.sync="newArticleDialogVisible"
            width="50%"
            :before-close="newArticleDialogClose">
      <span>
        <!--表单-->
        <el-form :model="newArticle" :rules="newArticleRules" ref="newArticleRef" label-width="100px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="主题" prop="theme">
                <el-input v-model="newArticle.theme"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="大纲" prop="outline">
                  <el-input v-model="newArticle.outline"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
               <el-form-item label="作者" prop="author">
              <el-input v-model="newArticle.author"></el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="分类" prop="classify">
                  <el-input v-model="newArticle.classify"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="图片上传" prop="verify">
            <el-upload
                    action="http://localhost:3000/updateImage"
                    list-type="picture-card"
                    :on-success="addImg">
              <i class="el-icon-plus"></i>
            </el-upload>
            <i style="color: #ff0000">注意：图片选中后自动保存</i>
            <el-dialog :visible.sync="newArticleImg">
              <img width="100%" alt="">
            </el-dialog>
          </el-form-item>
            </el-form>
        <!--        表单-->
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="unaddArticles">取 消</el-button>
        <el-button type="primary" @click="AddNewArticles">确 定</el-button>
      </span>
      <mavon-editor v-model="newArticle.content"/>
    </el-dialog>
  </div>
</template>


<script>
  export default {
    name: "Article",
    data() {
      return {
        // 所有文章
        articleList: [],
        newArticleRules: {
          theme: [
            {required: true, message: '博名不能为空', trigger: 'blur'},
            {min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur'}
          ],
          outline: [
            {required: true, message: '大纲不能为空', trigger: 'blur'}
          ],
          author: [
            {required: true, message: '作者不能为空', trigger: 'blur'},
            {min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur'}
          ],
          classify: [
            {required: true, message: '分类不能为空', trigger: 'blur'},
            {min: 3, max: 9, message: '长度在 3 到 9 个字符', trigger: 'blur'}
          ]
        },
        // 图片是否显示
        dialogVisible: false,
        // 图片路径
        dialogVisibleURL: '',
        md: "",
        newArticle: {
          theme: '',
          outline: '',
          author: '',
          classify: '',
          content: '',
          imgpath: ''
        },
        //默认是否显示
        newArticleImg: false,
        newArticleDialogVisible: false
      }
    },
    created() {
      this.getArticleList()
    },
    methods: {
      async getArticleList() {
        const {status, data} = await this.$http.get('getArticleList', {})
        if (status !== 200) this.$message.error('服务器异常')
        this.articleList = data
      },
      async updateImg(response, file, fileList, id) {
        if (response.code === 200 && response.msg === '保存成功') {
          const {status, data} = await this.$http.post('updateImgUrlByID', {
            id,
            imgpath: response.url
          })
          if (data.code !== 200) return this.$message.error('服务器异常')
          this.$message.success('更新成功')

          this.articleList.forEach((item, i) => {
            if (item.id === id) {
              item.imgpath = response.url
            }
          })
        }
      },
      // 存在问题:表单不是通过el-form中的model渲染而成的，所以无法进行表单校验
      onSubmit(id) {
        this.articleList.forEach(async (item, i) => {
          if (item.id === id) {
            item.content = this.md
            const {status, data} = await this.$http.post('updateArticlesInfo', {
              article: item
            })
            if (status !== 200 || data.code !== 200) this.$message.error('服务器异常')
            this.$message.success('更新成功')
          }
        })
      },
      //保存md
      saveMavon(value, render) {
        // value 原值
        // render 解析成html
        this.md = value

      },
      // 关闭事件
      newArticleDialogClose() {
        this.newArticleDialogVisible = false
        this.$refs.newArticleRef.resetFields()
      },
      // 打开新增文章窗口
      openNewArticleDialog() {
        this.newArticleDialogVisible = true
      },
      // 取消保存文章
      unaddArticles(){
        this.newArticleDialogVisible = false
        this.$refs.newArticleRef.resetFields()
      },
      //保存新文章
      async AddNewArticles(){
        let bool = true;
        console.log(this.newArticle)
        for (const key in this.newArticle) {
          if (!this.newArticle[key]){
            bool = false
            break
          }
        }
        if (!bool) return this.$message.error('请补全信息')
        const {status,data}  = await this.$http.post('addNewArticle',{
          article:this.newArticle
        })
        if (status !== 200 || data.code !== 200) this.$message.error('服务器异常')
        this.$message.success('添加成功')
        this.newArticleDialogVisible = false
        this.getArticleList()
        this.$refs.newArticleRef.resetFields()
      },
      // 新文章img
      addImg(response, file, fileList){
        this.newArticle.imgpath = response.url
      },
      //删除文章
      async deleteArticle(id){
        console.log(id)
        const result = await this.$messagebox.confirm ('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err=>err)
        // 取消删除
        if (result === 'cancel') return this.$message.info('取消删除')
        //确认删除

        const {status,data} = await this.$http.post('delArticleById',{
          id
        })
        if (status !== 200 && data.code !== 200) this.$message.error('服务器异常')
        this.$message.error('删除成功')
        this.getArticleList()
      }
    },

  }
</script>

<style scoped lang="less">
  .el-card {
    margin-top: 20px;

    .el-table {
      margin-top: 20px;
    }
  }


</style>