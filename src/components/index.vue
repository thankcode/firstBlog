<template>
  <div class="home_page">
    <!--导航栏-->
    <app-bar></app-bar>
    <!--首页主体区-->
    <div class="home_page_article">
      <b-container class="bv-example-row">
        <b-row align-h="between">
          <!--左侧文章-->
          <b-col lg="7" sm="12">
            <!--文章-->
            <!-- :key="$route.fullPath" 解决请求不跳转-->

            <router-view :key="$route.fullPath"></router-view>
          </b-col>
          <!--右侧导航-->
          <b-col lg="4" sm="12">
            <!--博主信息-->
            <author-info></author-info>
            <new-article></new-article>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>

</template>

<script>

  import AppBar from "./appbar/AppBar";
  import authorInfo from "./homepageright/authorInfo";
  import newArticle from "./homepageright/newArticleTitle";
  import articles from "./homepageleft/articles";

export default {
  name: 'index',
  components: {
    AppBar,
    authorInfo,
    newArticle,
    articles
  }
}
</script>

<style scoped lang="less">
  .home_page_article{
    margin-top: 30px;;
  }
</style>
