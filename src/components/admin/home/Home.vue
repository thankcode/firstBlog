<template>
  <div class="home">
    <el-container>
      <el-header>
        <div class="header">
          <div class="title">
            后台管理系统
          </div>
          <div class="logout">
            <el-dropdown @command="logout">
              <el-button type="primary">
                设置<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="quit">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <!-- 侧边栏 -->
          <el-menu
                  default-active="/"
                  class="el-menu-vertical-demo"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  :router="true"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>信息维护</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/adminMyinfo">个人信息</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item index="/home/adminArticle">
              <i class="el-icon-menu"></i>
              <span slot="title">文章管理</span>
            </el-menu-item>
            <el-menu-item index="/home/adminAboutBlog">
              <i class="el-icon-setting"></i>
              <span slot="title">关于博客</span>
            </el-menu-item>
            <el-menu-item index="/home/adminFriendsLink">
              <i class="el-icon-setting"></i>
              <span slot="title">友情链接</span>
            </el-menu-item>
          </el-menu>
          <!--  -->
        </el-aside>
        <el-main>
          <router-view :key="$route.fullPath"></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {}
    },
    created() {
      this.$http.get('home', {})
    },
    methods: {
      logout(e) {
        // 退出
        if (e === 'quit') {
          localStorage.removeItem('Authorization')
          this.$router.replace('/admin')
        }
      }
    }

  }
</script>

<style scoped lang="less">
  html, body, #app, .home {
    height: 100vh !important;
    min-width: 1080px;
  }

  .home {
    header {
      background: #333744;

      .header {
        display: flex;
        justify-content: space-between;

        .title {
          font-size: 30px;
          font-weight: bold;
          font-family: 华文行楷, serif;
          line-height: 60px;
        }

        .logout {
          line-height: 60px;
        }
      }
    }

    .el-container {
      height: 100%;

      .el-aside {
        background: #545c64;
      }

      .el-main {
        background: #e4e4e4;
      }
    }

  }
</style>