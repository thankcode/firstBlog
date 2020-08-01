<template>
  <div class="aothorInfo">
    <div>
      <b-card
              title="博客信息"
              img-alt="Image"
              img-top
              tag="article"
              class="mb-2"
      >
        <div class="info" v-if="this.authorInfo.author">
          <div class="div_img">
            <img src="../../assets/img/thankCode.jpg" alt="">
            <p class="name">{{ authorInfo.author.name }}</p>
            <p class="saying">{{ authorInfo.author.saying }}</p>
          </div>

          <div class="info_content">
            <div>
              <p>{{ authorInfo.articleNum.num }}</p>
              <p>文章数</p>
            </div>
            <div>
              <p>0(假)</p>
              <p>评论数</p>
            </div>
            <div>
              <p>{{ getRunTime }}</p>
              <p>运行天数</p>
            </div>
          </div>
        </div>
        <!--<b-card-text>
          Some quick example text to build on the card title and make up the bulk of the card's content.
        </b-card-text>-->
      </b-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: "authorInfo",
    data () {
      return {
        authorInfo: {}
      }
    },
    computed: {
      // 获取服务器运行时间
      getRunTime() {
        return (this.authorInfo.runTime.Value/60/60/24).toFixed(2)
      }
    },
    mounted() {
      this.getAuthorInfo()
    },
    methods: {
      async getAuthorInfo () {
        const data = await this.$http.get('author')
        if (data.status !== 200) return this.$message.error('服务器异常')
        this.authorInfo = data.data
      }
    }
  }
</script>

<style scoped>
  .card-title{
    padding-bottom: 12px;
    font-size: 16px;
    border-bottom: 2px solid slategray;
  }

  .info{
    height: 100%;
  }
  .div_img{
    height: 140px;
  }
  img{
    display: block;
    height: 72px;
    border-radius: 50%;
    margin: 0 auto;
  }
   p{
     text-align: center;
     margin: 0;
   }
   .saying{
     font-size: 14px;
     padding-bottom:20px;
     border-bottom: 1px solid #dee2e6;
   }
   .name{
     margin-top: 10px;
     font-size:16px;
     color: #6c757d ;
   }
  .info_content{
    display: flex;
    margin-top: 40px;
    height: 51px;

  }
  .info_content div{
    height: 51px;
    width: 33.33%;

  }
  .info_content div:not(:last-child){
    border-right: 1px solid #dee2e6 ;
  }
</style>