<template>
  <div class="navbar">
    <div class="navbar-button is-left">
    </div>
    <h1 class="navbar-title">
      <nav-menu></nav-menu>
    </h1>
    <div class="navbar-button is-right">
      <!-- 用户名 -->
      <el-dropdown>
        <span class="el-dropdown-link navbar-item">
          {{userInfo.username}}
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

export default {
  name: 'navbar',
  components: { NavMenu },
  data () {
    return {
      userInfo: {
        username: undefined
      }
    }
  },
  created () {},
  computed: {
    ...mapState({
      // userInfo: state => state.user.info
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
