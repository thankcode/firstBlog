<template>
  <div class="friendsLink">
    <el-card>
      <div class="title">
        <h2>友情链接</h2>
      </div>
      <div class="link">
        <b-row align-h="around">
          <b-col lg="5" sm="12" v-for="(item,i) in linkList" class="item">
            <img :src="item.imgUrl" :alt="item.blogName">
            <span><a :href="item.link">{{ item.blogName }}</a></span>
            <p>{{ item.introduce }}</p>
          </b-col>
        </b-row>
      </div>
      <div class="intro">
        <h2>简单说明</h2>
        <p>如果要互加友链的可以在此处留言，留言后我会很快处理。</p>
      </div>
      <div class="blog_info">
        <h2>本站信息</h2>
        <P>网站名称：{{ blogInfo.name }}</P>
        <P>网站简介：{{ blogInfo.saying }}</P>
        <P>网站地址：{{ blogInfo.url }}</P>
      </div>
      <div class="comment">
        <h2>发表评论</h2>
        <div id="vcomments"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Valine from 'valine';
  export default {
    name: "FriendsLink",
    data(){
      return {
        linkList:'',
        blogInfo:''
      }
    },
    created() {
      this.getLink();
      this.getBlogInfo();
      this.loadValine();
    },
    methods:{
      async getLink(){
        const {status,data} = await  this.$http.get('getLink',{})
        if (status!==200) return this.$message.error('服务器异常')
        this.linkList = data

        new Valine({
          el: '#vcomments',
          appId: 'mAexvLpVMwVYr6rt0DJeaKYT-gzGzoHsz',
          appKey: 'tGDhhOCK5LwRcxBDSkdFf2Dg',
          visitor: true,
          avatar:'' // (''/mp/identicon/monsterid/wavatar/robohash/retro/hide)
        });
      },
      async getBlogInfo(){
        const {status,data} = await this.$http.get('blogInfo',{})
        if (status!==200) return this.$message.error('服务器异常')
        this.blogInfo = data[0]
     },
      loadValine(){

      }
    }
  }
</script>

<style scoped lang="less">
  .friendsLink{
    .title{
      border-bottom: 1px solid #EBEEF5;

    }
    .link{
      background-color: #f9f9f9;
      padding: 15px;
      margin-bottom: 20px;

      .item{
        background: #fff;
        margin-bottom: 10px;
        padding: 15px;
        box-sizing: border-box;
      }
      img{
        height: 32px;
        margin-right: 10px;
      }
      p{
        margin: 0;
        margin-top: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
      }
      span:hover{
        color: #494f54;
      }
      span{
        font-size: 15px;
        cursor: pointer;
        a{
          color: #494f54;
        }
      }
      .row{
        padding: 0 15px !important;
      }
    }
    .intro{
      font-size: 15px;
      border-bottom: 1px solid #dee2e6;
      margin-top: 10px;
    }
    .blog_info{
      font-size: 15px;
      border-bottom: 1px solid #dee2e6;
      margin-top: 10px;
    }
    .comment{
      margin-top: 10px;
    }
    h2{
      font-size: 25px;
      color: #444;
      font-weight: bold;
      margin-bottom: 20px;
    }


  }
</style>