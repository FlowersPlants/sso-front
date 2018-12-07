<template>
  <div class="pull-height animated">
    <div class="index">
      <sidebar class="left"></sidebar>
      <div class="right">
        <div class="nav">
          <navbar class="navbar"></navbar>
          <!-- <tags></tags> -->
        </div>
        <div class="main">
          <div class="router">
            <!-- 获取菜单 -->
            <keep-alive>
              <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar } from '@/components'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar
  }
}
</script>

<style scoped>
.pull-height {
  height: 100%;
}
.index {
  display: flex;
  display: -webkit-flex;
  position: relative;
  height: 100%;
  background: #ffffff;
  overflow: hidden;
}
.left {
  width: 230px;
  height: 100%;
  overflow: hidden;
}
.right {
  padding-top: 93px;
  position: relative;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  flex: 1;
}
.main {
  height: 100%;
  background: #f1f4f5;
  padding: 15px;
  box-sizing: border-box;
}
.router {
  padding: 15px 8px;
  background: #ffffff;
  height: 100%;
  overflow: hidden;
  border-radius: 5px;
  box-sizing: border-box;
}
.nav {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
}
</style>
