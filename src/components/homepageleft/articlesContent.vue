<template>
  <div >
    <!--正文内容-->
    <div v-highlight class="articlesContent" v-html="bodyContent_md"></div>
    <div class="footer">
      <div class="footer_content">
        <span>最后编辑：{{ time }}</span>
        <el-tooltip placement="top">
          <div slot="content">本文为原创文章<br/>版权归 谢谢谢 所有<br/>转载请联系博主获得授权</div>
          <span>©著作权归作者所有</span>
        </el-tooltip>
      </div>
      <div class="button">
        <el-button icon="el-icon-thumb" @click="addLike()" :disabled="!isForbid">点赞 {{ like }}</el-button>
        <el-button icon="el-icon-s-promotion">分享</el-button>
      </div>
      <div class="pageTurning">
        <b-row align-h="between">
          <b-col lg="6" sm="12" class="left">
            <div>上一篇</div>
            <div>
              <el-tooltip placement="top">
                <div slot="content">{{ pageTurning }}</div>
                <router-link :to="'/articles/' + pageTurningID">
                  {{ pageTurning }}
                </router-link>
              </el-tooltip>
            </div>

          </b-col>
          <b-col lg="6" sm="12" class="right">
            <div>下一篇</div>
            <div>
              <el-tooltip placement="top">
                <div slot="content">{{ nextPage }}</div>
                  <router-link :to="'/articles/' + nextPageID">
                    {{ nextPage }}
                  </router-link>
              </el-tooltip>
            </div>
          </b-col>
        </b-row>
      </div>
      <!--发表评论-->
      <div class="publish_comment">
        <div id="vcomments"></div>
        <!-- <h2>发表评论</h2>
          <el-form ref="form" :model="formData" :rules="formRoles">
            <b-row align-h="between">
              <b-col lg="12">
                
                <mark-down @md-child="getMDContent"></mark-down>
              </b-col>
            </b-row>
          
            <b-row align-h="between">
              <b-col lg="6" sm="12">
                <el-form-item label="姓名" prop="name">
                  <el-input v-model="formData.name"></el-input>
                </el-form-item>
              </b-col>
              <b-col lg="6" sm="12"  >
                <el-form-item label="电子邮件地址" prop="email">
                  <el-input v-model="formData.email"></el-input>
                </el-form-item>
              </b-col>
              <b-col lg="6" sm="12">
                <el-form-item label="网站（选填）">
                  <el-input v-model="formData.url"></el-input>
                </el-form-item>
              </b-col>

            </b-row>
            <b-row>
              <b-col lg="6" sm="12">
                <el-form-item>
                  <el-button type="primary" @click="submitFrom">提交</el-button>
                  <el-button @click="resetFrom">重置</el-button>
                </el-form-item>
              </b-col>
            </b-row>
          </el-form> -->
      </div>
      <!--评论-->
      <!-- <div class="comment">
        <h2>{{ commentTitle }}</h2>
        <div class="comment_index" v-for="item in commentData" :key="item.id">
            <b-media>
              <template v-slot:aside>
                <b-img blank blank-color="#ccc" width="42"  alt="placeholder"></b-img>
              </template>
              <h5 class="mt-0">{{ item.user }}</h5>
              
              <p>
                {{ item.content }}
              </p>
              <b-media v-if="item.children.id">
                <template v-slot:aside>
                  <b-img blank blank-color="#ccc" width="42" alt="placeholder"></b-img>
                </template>

                <h5 class="mt-0" >Nested Media</h5>
                <p class="mb-0">
                  回复
                </p>
              </b-media>
            </b-media>
        </div>
      </div> -->

      <!-- 阅读量配置 -->
      <!-- 
          <span id="<Your/Path/Name>" class="leancloud_visitors" data-flag-title="Your Article Title">
            <em class="post-meta-item-text">阅读量 </em>
            <i class="leancloud-visitors-count">1000000</i>
          </span>
      -->
    </div>
  </div>
</template>

<script>

  import marker from 'marked'
  import MarkDown from "../md/MarkDown";
  
  import Valine from 'valine';

  export default {
    name: "articlesContent",
    data(){
      return {
        bodyContent: '',
        time: '',
        like: 0,
        isForbid: true,
        id: 0,
        pageTurning: '',
        pageTurningID: '',
        nextPage: '',
        nextPageID: '',
        /*表单提交数据*/
        formData: {
          content: "",
          name: '',
          email: '',
          url:''
        },
        // 评论数据
        commentData:[],
        /*表单校验规则*/
        formRoles:{
          name:[
            { required: true, message: '请输入昵称', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          email:[
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ]
        },
        /*评论标题*/
        commentTitle: '暂无评论'

      };
    },
    components:{
      MarkDown
    },
    computed:{
      bodyContent_md(){
        return marker(this.bodyContent)
      }

    },
    mounted() {
      this.getBodyContent();
      this.getNewArticleTitle()
    },
    methods:{
      async getBodyContent() {
        const data = await this.$http.post('bodycontent', {
          id: this.$route.params.id
        })
        if (!data || data.status !== 200) return this.$message.error('服务器异常')
        this.bodyContent = data.data.bodycontent.content
        this.time = data.data.bodycontent.time.substring(0,10)
        this.like = data.data.bodycontent.likeNum
        this.id = data.data.bodycontent.id
        this.isForbid = data.data.isForbid

        // // 刷新评论
        //    const res1 = await this.$http.get('getComment', {
        //     params:{
        //       id: this.$route.params.id
        //     }
        //   }) 
        //   if(res1.status !== 200){
        //     this.$message.error('服务器异常')
        //     return 
        //   }

        //   this.commentData = res1.data
        //   console.log(this.commentData)


          // 评论回复
          new Valine({
            el: '#vcomments',
            appId: 'mAexvLpVMwVYr6rt0DJeaKYT-gzGzoHsz',
            appKey: 'tGDhhOCK5LwRcxBDSkdFf2Dg',
            visitor: true,
            avatar:'' // (''/mp/identicon/monsterid/wavatar/robohash/retro/hide)
        });
      },
      // 点赞
      async addLike(){
        const data = await this.$http.post('addLike', {
          id:this.$route.params.id,
          like:this.like
        })
        if (data.status !== 200) return this.$message.error('服务器异常')
        this.like ++
        this.isForbid = false
      },
      async getNewArticleTitle(){
        const data = await this.$http.get('newArticle')
        if (data.status !== 200) return this.$message.error('服务器异常')

        let index
        data.data.newArticle.forEach((item, i) => {
          if (this.$route.params.id +'' === item.id+''){
            index = i
          }
        })

        if (index === 0) {
          this.pageTurning = '没有了'
          this.nextPage = data.data.newArticle[index+1].theme

          this.nextPageID = data.data.newArticle[index+1].id
          this.pageTurningID = this.$route.params.id
          return
        }
        if (index === data.data.newArticle.length-1){
          this.pageTurning = data.data.newArticle[index-1].theme
          this.nextPage = '没有了'

          this.pageTurningID = data.data.newArticle[index-1].id
          this.nextPageID = this.$route.params.id

          return
        }

        this.pageTurning = data.data.newArticle[index-1].theme
        this.pageTurningID = data.data.newArticle[index-1].id

        this.nextPage = data.data.newArticle[index+1].theme
        this.nextPageID = data.data.newArticle[index+1].id
      },
      /*自定义md中间发射事件 getMDContent*/
      getMDContent(data){
        this.formData.content = data
      },
      /*重置表单*/
      // resetFrom(){
      //   this.$refs['form'].resetFields()
      // },
      // /*提交表单*/ 
      //  submitFrom(){
      //   this.$refs['form'].validate(async result => {
      //     if (!result || this.formData.content === '') {
      //       return this.$message.error('表单验证失败')
      //     }
          
      //     const res = await this.$http.post('addComment', {
      //       formData:this.formData,
      //       id:this.$route.params.id,
      //     })
      //     if(res.status !== 200){
      //       this.$message.error('服务器异常')
      //       return 
      //     }
      //     this.$message.success('评论成功')

      //     // 刷新评论
      //     const res1 = await this.$http.get('getComment', {
      //       params:{
      //         id: this.$route.params.id
      //       }
      //     }) 
      //     if(res1.status !== 200){
      //       this.$message.error('服务器异常')
      //       return 
      //     }

      //     this.commentData = res1.data
      //     console.log(this.commentData)
      //   })
      // }
    }
  }
</script>

<style scoped lang="less">
  .articlesContent{
    background: #fff;
    padding: 20px;
    border-right: 2px solid #dee2e6;
    border-left: 2px solid #dee2e6;
    border-radius: 4px 4px 0 0;
  }
  .footer{
    background: #fff;
    border-right: 2px solid #dee2e6;
    border-left: 2px solid #dee2e6;
    padding: 5px 20px 20px 20px;
    margin-bottom: 20px;
    .footer_content{
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
      span{
        font-size: 15px;
        font-weight: bold;
      }
    }
    .button{
      display: flex;
      justify-content: center;
      margin-bottom: 15px;
    }
    .pageTurning{
      padding: 20px;
      border-bottom: 1px solid #dee2e6;
      border-top: 1px solid #dee2e6;
      overflow: hidden;
      .right{
        text-align: right;
        div:first-child{
          margin-bottom: 5px;
        }
      }
      .left{
        div:first-child{
          margin-bottom: 5px;
        }
      }
    }
    .publish_comment{
      padding: 20px;
      h2{
        font-size: 25px;
        font-weight: 700;
        margin-bottom: 30px
      }
      .el-form{
        width: 100%;
      }
    }
    .comment{
      border-top: 1px solid #dee2e6;
      border-bottom: 1px solid #dee2e6;
      padding-bottom: 20px;
      h2{
        font-size: 25px;
        font-weight: 700;
        margin-bottom: 20px;
        margin-top: 20px
      }
    }

  }

  a{
    color: #6c757d ;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
  }

  .comment{
    .comment_index{
      padding: 20px 0;
      border-top: 1px solid #dee2e6;
      border-bottom: 1px solid #dee2e6;
    }
  }

</style>