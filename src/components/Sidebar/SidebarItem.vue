<template>
  <div class="menu-wrapper">
    <template v-for="(item, index) in menus" v-if="!item.hidden">
      <!-- 单项菜单 -->
      <el-menu-item v-if="!item.children || item.children.length === 0" :index="filterPath(item)" :key="item.label" @click="open(item)">
        <template v-if="item.meta">
          <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span slot="title" v-if="item.meta.name">{{item.meta.name}}</span>
        </template>
      </el-menu-item>
      <!-- children只有1 且再无children的菜单(一般用于添加外层Layout) -->
      <el-menu-item v-else-if="item.children.length === 1 && !item.children[0].children && !item.alwaysShow" :index="filterPath(item, item.children[0])" :key="index" @click="open(item, item.children[0])">
        <template slot="title" v-if="item.meta">
          <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span slot="title" v-if="item.meta.name">{{item.meta.name}}</span>
        </template>
        <template v-else-if="item.children[0].meta">
          <svg-icon v-if="item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span slot="title" v-if="item.children[0].meta.name">{{item.children[0].meta.name}}</span>
        </template>
      </el-menu-item>
      <!-- children大于1 的菜单 取决于alwaysShow是否打开 -->
      <el-submenu v-else :key="item.label" :index="filterPath(item)">
        <!-- 当 children == 1 时 上层菜单无meta属性时,使用第一个children的meta信息 -->
        <template slot="title" v-if="item.meta">
          <svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span slot="title" v-if="item.meta.name" class="{'el-menu--display':isCollapse}">{{item.meta.name}}</span>
        </template>
        <template slot="title" v-else-if="item.children[0].meta">
          <svg-icon v-if="item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span slot="title" v-if="item.children[0].meta.name" :class="{'el-menu--display':isCollapse}">{{item.children[0].meta.name}}</span>
        </template>
        <!-- 递归添加子菜单 -->
        <template v-for="(child, cindex) in item.children">
          <el-menu-item v-if="!child.children || child.children.length === 0" :index="filterPath(item, child)" :key="cindex" @click="open(item, child)">
            <template v-if="child.meta">
              <svg-icon v-if="child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span slot="title" v-if="child.meta.name">{{child.meta.name}}</span>
            </template>
          </el-menu-item>
          <sidebar-item v-else :menus="[child]" :key="cindex" :isCollapse="isCollapse" :pPath="parentPath(item.path)"></sidebar-item>
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
  created () {
    console.log('menus => {}', this.menus)
  },
  methods: {
    parentPath (p) {
      return this.pPath == null ? p : this.pPath + '/' + p
    },
    filterPath (item, child) {
      let path = item.path
      if (child) {
        path = item.path + '/' + child.path
      }
      return path == null ? '' : path
    },
    open (item, child) {
      let path = item.path
      if (this.pPath != null) {
        path = this.pPath + '/' + item.path
      }
      if (child) {
        path = path + '/' + child.path
      }
      this.$router.push({
        path: resolveUrlPath(path, item.meta == null ? item.name : item.meta.name),
        query: item.query
      })
    }
  }
}
</script>
