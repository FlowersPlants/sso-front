<template>
  <div class="sidebar-container is-active">
    <!-- <logo class="logo" :isCollapse="isCollapse"></logo> -->
    <el-scrollbar style="height:100%;width:100%;">
      <el-menu router :default-active="$route.path" class="el-menu-vertical-demo el-scrollbar__view" mode="vertical" :show-timeout="10" background-color="#00142a" text-color="hsla(0,0%,100%,.65)" active-text-color="#409eff" :collapse="false">
        <sidebar-item :menus="menus" :isCollapse="false"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'menus'
    ])
  }
}
</script>

<style>
/* .sidebar-container {
  width: 240px;
} */
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 226px;
  min-height: 400px;
  height: 100%;
}
</style>
