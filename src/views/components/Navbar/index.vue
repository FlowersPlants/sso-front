<template>
  <div class="navbar">
    <div class="navbar-button is-left">
      <breadcrumb class="breadcrumb-container"></breadcrumb>
    </div>
    <h1 class="navbar-title">
      <nav-menu></nav-menu>
    </h1>
    <div class="navbar-button is-right">
      <!-- 用户名 -->
      <el-dropdown>
        <span class="el-dropdown-link navbar-item">
          {{userInfo.name}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/">首页</router-link>
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout" divided>退出系统</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import NavMenu from './NavMenu'
import Breadcrumb from './Breadcrumb'

export default {
  name: 'navbar',
  components: { NavMenu, Breadcrumb },
  computed: {
    ...mapState({
      userInfo: state => state.user.info
    }),
    ...mapGetters(['webInfo'])
  },
  methods: {
    logout () {
      this.$store.dispatch('LogOut').then(() => {
        window.location.reload()
      })
    }
  }
}
</script>

<style>
.navbar-title {
  margin: 0;
}
.navbar-button {
  position: absolute;
  top: 20px;
  right: 40px;
}
.navbar-button span {
  color: #ffffff;
}

.breadcrumb-container {
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 50px;
}
</style>
