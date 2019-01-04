<template>
  <div class="menu-wrapper">
    <template v-for="(menu, index) in menus" v-if="!menu.hidden">
      <!-- 单项菜单 -->
      <el-menu-item v-if="!menu.children || menu.children.length === 0" :index="filterPath(menu)" :key="menu.label" @click="open(menu)">
        <template v-if="menu.meta">
          <svg-icon v-if="menu.meta.icon" :icon-class="menu.meta.icon"></svg-icon>
          <span slot="title" v-if="menu.meta.title">{{menu.meta.title}}</span>
        </template>
      </el-menu-item>
      <!-- children只有1 且再无children的菜单(一般用于添加外层Layout) -->
      <el-menu-item v-else-if="menu.children.length === 1 && !menu.children[0].children" :index="filterPath(menu, menu.children[0])" :key="index" @click="open(menu, menu.children[0])">
        <template slot="title" v-if="menu.meta">
          <svg-icon v-if="menu.meta.icon" :icon-class="menu.meta.icon"></svg-icon>
          <span slot="title" v-if="menu.meta.title">{{menu.meta.title}}</span>
        </template>
        <template v-else-if="menu.children[0].meta">
          <svg-icon v-if="item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span slot="title" v-if="menu.children[0].meta.title">{{menu.children[0].meta.title}}</span>
        </template>
      </el-menu-item>
      <!-- children大于1的菜单 -->
      <el-submenu v-else :key="menu.label" :index="filterPath(menu)">
        <!-- 当 children == 1 时 上层菜单无meta属性时,使用第一个children的meta信息 -->
        <template slot="title" v-if="menu.meta">
          <svg-icon v-if="menu.meta.icon" :icon-class="menu.meta.icon"></svg-icon>
          <span slot="title" v-if="menu.meta.title" class="{'el-menu--display':isCollapse}">{{menu.meta.title}}</span>
        </template>
        <template slot="title" v-else-if="menu.children[0].meta">
          <svg-icon v-if="menu.children[0].meta.icon" :icon-class="menu.children[0].meta.icon"></svg-icon>
          <span slot="title" v-if="menu.children[0].meta.title" :class="{'el-menu--display':isCollapse}">{{menu.children[0].meta.title}}</span>
        </template>
        <!-- 递归添加子菜单 -->
        <template v-for="(child, cindex) in menu.children">
          <el-menu-item v-if="!child.children || child.children.length === 0" :index="filterPath(menu, child)" :key="cindex" @click="open(menu, child)">
            <template v-if="child.meta">
              <svg-icon v-if="child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span slot="title" v-if="child.meta.title">{{child.meta.title}}</span>
            </template>
          </el-menu-item>
          <sidebar-menu v-else :menus="[child]" :key="cindex" :isCollapse="isCollapse" :pPath="parentPath(menu.path)"></sidebar-menu>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
import { resolveUrlPath } from '@/utils/utils'

export default {
  name: 'SidebarItem',
  props: {
    menus: {
      type: Array
    },
    isCollapse: {
      type: Boolean
    },
    pPath: {
      type: String
    }
  },
  methods: {
    parentPath (p) {
      return this.pPath == null ? p : this.pPath + '/' + p
    },
    filterPath (menu, child) {
      let path = menu.path
      if (child) {
        path = menu.path + '/' + child.path
      }
      return path == null ? '' : path
    },
    open (menu, child) {
      let path = menu.path
      if (this.pPath != null) {
        path = this.pPath + '/' + menu.path
      }
      if (child) {
        path = path + '/' + child.path
      }
      let toPath = resolveUrlPath(path, menu.meta == null ? menu.title : menu.meta.title)
      this.$router.push({
        path: toPath,
        query: menu.query
      })
    }
  }
}
</script>
