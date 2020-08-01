<template>
  <div class="appbar">
    <div class="container">
      <div>
        <b-navbar toggleable="lg" type="dark">
          <b-navbar-brand href="#">谢谢谢</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item href="#">首页</b-nav-item>
              <b-nav-item href="#">文章归档</b-nav-item>
              <b-nav-item href="#">关于博客</b-nav-item>
              <b-nav-item href="#">友情链接</b-nav-item>
              <b-nav-item href="#">留言板</b-nav-item>
              <b-nav-item href="#">网站数据</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-form>
                <b-form-input size="sm" class="mr-sm-2" placeholder="搜索"></b-form-input>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">搜索</b-button>
              </b-nav-form>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "AppBar"
  }
</script>

<style scoped>
  .appbar{
    background: #f8f9fa;
  }
  .nav-link{
    color: rgba(0,0,0,.5) !important;
  }
  .navbar-brand{
    color: rgba(0,0,0,.9) !important;
  }


</style>