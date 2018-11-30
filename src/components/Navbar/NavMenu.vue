<template>
  <div class="navbar-menu">
    <el-menu :default-active="activeIndex" mode="horizontal">
      <template v-for="(item, index) in items">
        <el-menu-item :index="item.parentId + ''" @click.native="openMenu(item)" :key="index">{{item.label}}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
// import { resolveUrlPath } from '@/utils/utils'
import { mapGetters } from 'vuex'

export default {
  name: 'NavMenu',
  data () {
    return {
      activeIndex: '0',
      items: [
        {label: '首页', href: '/index', parentId: 0},
        {label: '操作帮助', href: 'https://***', parentId: 1},
        {label: '联系我们', href: 'mailto://***@**.com', parentId: 2}
      ]
    }
  },
  computed: {
    ...mapGetters(['menus'])
  },
  methods: {
    openMenu (item) {
      console.log('nav menu...')
    }
  }
}
</script>
