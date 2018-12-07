<template>
  <div class="navbar-menu">
    <el-menu
      :default-active="activeIndex"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      mode="horizontal">
      <template v-for="(item, index) in items">
        <el-menu-item :index="item.parentId + ''" @click.native="openMenu(item)" :key="index">{{item.label}}</el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
// import { resolveUrlPath } from '@/utils/utils'
import { mapGetters } from 'vuex'
import CFG from '@/utils/cfg'

export default {
  name: 'NavMenu',
  data () {
    return {
      activeIndex: '0'
    }
  },
  computed: {
    ...mapGetters(['menus']),
    items () {
      return CFG.NavMenu
    }
  },
  methods: {
    openMenu (item) {
      console.log('nav menu...')
    }
  }
}
</script>
