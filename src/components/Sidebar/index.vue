<template>
  <div class="sidebar-container is-active">
    <!-- <logo class="logo" :isCollapse="isCollapse"></logo> -->
    <div><span class="el-icon-document"></span></div>
    <el-scrollbar style="height:100%;width:100%;">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo el-scrollbar__view" mode="vertical" :show-timeout="10" background-color="#00142a" text-color="hsla(0,0%,100%,.65)" active-text-color="#409eff" :collapse="false">
        <sidebar-item :menus="menus" :isCollapse="false"></sidebar-item>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
// import Logo from './Logo.vue'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'menus'
    ])
  }
}
</script>
