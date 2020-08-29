<template>
  <div class="newArticle">
    <b-card
            title="最新文章"
            img-alt="Image"
            img-top
            tag="article"
            class="mb-2"
    >
      <ul class="newArticle_title">
        <li v-for="item in newArticleTitle" :key="item.id">
          <router-link :to="'/articles/' + item.id">
              <p>{{ item.theme }}</p>
          </router-link>
        </li>
      </ul>
    </b-card>
  </div>
</template>

<script>
  export default {
    name: "newArticle",
    data(){
      return {
        newArticleTitle:[]
      }
    },
    mounted(){
      this.getNewArticleTitle()
    },
    methods: {
      async getNewArticleTitle(){
        const data = await this.$http.get('newArticle')
        if (data.status !== 200) return this.$message.error('服务器异常')
        this.newArticleTitle = data.data.newArticle
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
  ul,li{
    padding:0;
    margin:0;
    list-style:none
  }
  li{
    padding: 10px 0;
    border-bottom: 1px solid #dee2e6 ;
  }
  ul,li p {
    margin: 0;
    font-size: 14px;
    color: #6c757d ;
  }

</style>