<template>
  <div class="filing">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>文章归档</span>
      </div>
      <div v-for="item in articleCreateTimes" class="text item">
          <h2>{{ getYear(item[0].time) }}</h2>
          <ul v-for="item1 in item" >
            <router-link :to="'/articles/' + item1.id">
              <li>{{ getMonth(item[0].time) +  item1.outline }}</li>
            </router-link>
          </ul>
      </div>
    </el-card>
  </div>
</template>

<script>

  import Valine from 'valine'
  export default {
    name: "DocumentFiling",
    data(){
      return {
        articleCreateTimes:{}
      }
    },
    mounted() {
      this.getTimes();
    },
    methods:{
      async getTimes(){
        const {status,data} = await this.$http.get('getTimes',{})
        if (status!==200) return this.$message.error('服务器异常')
        data.forEach((item,i)=>{
          item.time = item.time.substring(0,10)

          this.articleCreateTimes[item.time] = []
        })

        const obj = Object.keys(this.articleCreateTimes)

        data.forEach((item,i)=>{
          if (obj.indexOf(item.time) !==-1){
            this.articleCreateTimes[item.time].push(item)
          }
        })
        this.articleCreateTimes = JSON.parse(JSON.stringify(this.articleCreateTimes))


        new Valine({
          el: '#vcomments',
          appId: 'mAexvLpVMwVYr6rt0DJeaKYT-gzGzoHsz',
          appKey: 'tGDhhOCK5LwRcxBDSkdFf2Dg',
          visitor: true,
          avatar:'' // (''/mp/identicon/monsterid/wavatar/robohash/retro/hide)
        });

      },

    },
    computed:{
      getYear(){
        return (y)=>{
          return y.substring(0,7).replace('-','年')
        }
      },
      getMonth(){
        return (m)=>{
          return m.substring(8,11) + '日' + '  '
        }
      },

    }
  }
</script>

<style scoped lang="less">
  .filing{
    .box-card{
      margin-bottom: 20px;
      .text{
        h2{
          color: #444;
          font-size: 25px;
          font-weight: bold;
        }
        ul{
          margin-top: 16px;
          font-size: 15px;
          li{
            color: #6c757d;
          }
          li:hover{
            color: #494f54;
          }
        }
      }
      .clearfix{
        span{
          color: #222;
          font-size: 25px;
          font-weight: bold;
        }
      }
    }
  }
</style>