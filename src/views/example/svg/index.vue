<template>
  <el-scrollbar>
    <div class="icons-container">
      <div class="icons-wrapper">
        <div v-for="item of iconsMap" :key="item" @click="handleClick(item,$event)">
          <div class="icon-item">
            <svg-icon :icon-class="item" />
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
</template>

<script>
import icons from '@/icons/generateIconsView'

export default {
  name: 'icons',
  data () {
    return {
      iconsMap: []
    }
  },
  mounted () {
    const iconsMap = icons.state.iconsMap.map(i => {
      return i.default.id.split('-')[1]
    })
    this.iconsMap = iconsMap
  },
  methods: {
    handleClick (text, event) {
      this.$emit('onSelected', text)
    }
  }
}
</script>

<style scoped>
.icons-container {
  margin: 10px;
  overflow: hidden;
}
.icons-container .icons-wrapper {
  margin: 0 auto;
}
.icons-container .icon-item {
  margin: 5px;
  height: 60px;
  text-align: center;
  width: 60px;
  float: left;
  font-size: 25px;
  color: #24292e;
  cursor: pointer;
}
.icons-container span {
  display: block;
  font-size: 14px;
  margin-top: 10px;
}
</style>
