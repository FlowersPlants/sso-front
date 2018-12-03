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

<style>
.index {
  display: flex;
  display: -webkit-flex;
}
.left {
  width: 240px;
}
.right {
  width: 100%;
}
</style>
