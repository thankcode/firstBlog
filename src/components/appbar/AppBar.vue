<template>
  <div class="appbar">
    <div class="container">
      <div>
        <b-navbar toggleable="lg" type="dark">
          <b-navbar-brand href="#">谢谢谢</b-navbar-brand>

          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item><router-link to='/'>首页</router-link></b-nav-item>
              <b-nav-item><router-link to='/filling'>文章归档</router-link></b-nav-item>
              <b-nav-item><router-link to='/aboutBlog'>关于博客</router-link></b-nav-item>
              <b-nav-item><router-link to='/friendsLink'>友情链接</router-link></b-nav-item>
              <b-nav-item>留言板</b-nav-item>
              <b-nav-item>网站数据</b-nav-item>
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
    background: #b9b9b9;
  }
  .nav-link{
    color: #f8f9fa !important;
  }
  .navbar-brand{
    color: #f8f9fa !important;
  }
  a{
    color: #FFF !important;
  }


</style>