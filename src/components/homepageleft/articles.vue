<template>
  <div class="articles">
    <b-card
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2"
            v-for="item in articles" :key="item.id"
    >
      <div class="articles_item">
          <router-link :to="'/articles/' + item.id">
              <img :src="item.imgpath" alt="">
          </router-link>
          <router-link :to="'/articles/' + item.id">
              <header><h2>{{ item.theme }}</h2></header>
          </router-link>
        <div class="outline">
          <p>{{ item.outline }}</p>
        </div>
        <div class="articles_info">
          <el-tooltip content="发布日期" placement="top">
            <div>
              <i class="el-icon-s-grid"></i>
              <span>{{ item.time }}</span>
            </div>
          </el-tooltip>
          <el-tooltip content="作者" placement="top">
            <div>
              <i class="el-icon-s-custom"></i>
              <span>{{ item.author }}</span>
            </div>
          </el-tooltip>
          <el-tooltip content="阅读量" placement="top">
            <div>
              <i class="el-icon-message"></i>
              <span>{{ item.readNum }}</span>
            </div>
          </el-tooltip>
          <el-tooltip content="评论量" placement="top">
            <div>
              <i class="el-icon-chat-dot-round"></i>
              <span>{{ item.commentNum }}</span>
            </div>
          </el-tooltip>
          <el-tooltip content="分类" placement="top">
            <div>
              <i class="el-icon-aim"></i>
              <span>{{ item.classify }}</span>
            </div>
          </el-tooltip>
          <a href="javascript:void(0)">阅读全文</a>
        </div>
      </div>
    </b-card>
    <!--分页-->
    <div class="paging">
        <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
                @input="currentPageChange()"
        ></b-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "articles",
    data(){
      return {
        articles:{},
        currentPage: 1,
        /*总文章数*/
        rows: 100,
        /*每行显示条数*/
        perPage: 5
      }
    },
    mounted() {
      this.getAllArticles()
    },
    methods:{
      /*获取全部文章*/
      async getAllArticles(){
        const data = await this.$http.post('allArticle', {
          currentPage: this.currentPage
        })
        if (data.status !== 200) return this.$message.error('服务器异常')
        this.articles = data.data.newArticle
        this.rows = data.data.articleNum.num
        this.articles.forEach((item, i) => {
          item.time = item.time.substring(0,10)
        })
      },
      /*点击分页触发*/
      currentPageChange(){
        this.getAllArticles()
      }
    }
  }
</script>

<style scoped lang="less">
  .card-body{
    padding: 0;
  }
  .articles_item{
    img{
      width: 100%;
    }
    header{
      padding: 20px 20px 12px 20px;
      border-bottom: 1px solid #dee2e6;
      h2{
        color: #222;
        margin-bottom: 8px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }
    }
    .outline{
      padding: 20px;
      font-size: 15px;
      color: #444;
      line-height: 25px;
      border-bottom: 1px solid #dee2e6 ;
      p{
        margin-bottom: 16px;
      }
    }
    .articles_info{
      height: 49px;
      color: #6c757d;
      display: block;
      padding: 10px 25px;
      font-size: 12px;
      line-height: 29px;
      div{
        float: left;
        margin-right: 20px;
        i{
          margin-right: 5px;
        }
      }
      a{
        float: right;
        right: 0;
        color: #6c757d;
      }
    }
  }

</style>

