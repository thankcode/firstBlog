<template>
  <div class="about_blog">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>关于博客</span>
      </div>
      <div class="text item">
        <div class="basicsInfo">
          <el-tooltip content="发布日期" placement="top" :enterable="false">
            <div>
              <i class="el-icon-film"></i>
              <span>{{ basicsInfo.time }}</span>
            </div>
          </el-tooltip>
          <el-tooltip content="作者" placement="top" :enterable="false">
            <div>
              <i class="el-icon-user-solid"></i>
              <span>{{ basicsInfo.name }}</span>
            </div>
          </el-tooltip>
          <el-tooltip content="阅读量" placement="top" :enterable="false">
            <div>
              <i class="el-icon-place"></i>
              <span>{{ basicsInfo.read }}</span>
            </div>
          </el-tooltip>
        </div>
      </div>
      <div class="content">
        <h2>关于博客</h2>
        <p>{{ basicsInfo.aboutBlog1 }}</p>
        <p>{{ basicsInfo.aboutBlog2 }}</p>
        <p>{{ basicsInfo.aboutBlog3 }}</p>
      </div>
      <div class="bloggerEmail">
        <h2>博主联系方式</h2>
        <p>Email：{{ basicsInfo.email }}</p>
      </div>
      <div class="comment">
          <div id="vcomments"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Valine from 'valine';

  export default {
    name: "AboutBlog",
    data(){
      return{
        // 基本信息
        basicsInfo:''
      }
    },
    created() {
      console.log(1)
      this.getBasicsInfo()
    },
    methods:{
      async getBasicsInfo(){
        const {status,data} = await  this.$http.get('getBasicsInfo',{})
        if (status!==200) return this.$message.error('服务器异常')
        console.log(data)
        data[0].time = data[0].time.substring(0,10)

        this.basicsInfo = data[0]
        new Valine({
          el: '#vcomments',
          appId: 'mAexvLpVMwVYr6rt0DJeaKYT-gzGzoHsz',
          appKey: 'tGDhhOCK5LwRcxBDSkdFf2Dg',
          visitor: true,
          avatar:'' // (''/mp/identicon/monsterid/wavatar/robohash/retro/hide)
        });
      }
    },
    computed:{
      getTimeFormat(){
        return (time)=>{
          return time.substring(0,10)
        }
      }
    }
  }
</script>

<style scoped lang="less">

  .el-card{
    border-bottom: 1px solid #EBEEF5;
  }
  .text{
    .basicsInfo{
      display: flex;
      justify-content: flex-start;
      font-size: 12px;
      color: #707281;

      i{
        margin-right: 4px;
      }
      div{
        margin-right: 20px;

      }
    }
  }
  .content{
    margin-top: 15px;
    border-top: 1px solid #EBEEF5;
    padding-top: 10px;
    h2{
      font-size: 25px;
      color: #444;
      font-weight: bold;
      margin-bottom: 20px;
    }
    p{
      font-size: 15px;
      margin-bottom: 20px;
      color: #444;
      line-height: 25px;
    }
  }
  .bloggerEmail{
    h2{
      font-size: 25px;
      color: #444;
      font-weight: bold;
      margin-bottom: 20px;
    }
    p{
      font-size: 15px;
      margin-bottom: 20px;
      color: #444;
      line-height: 25px;
    }
  }

</style>