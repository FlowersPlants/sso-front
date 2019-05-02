<template>
  <div>
    <el-input style="width: 440px" v-model="value" @keyup.enter.native="handleSearch">
      <el-select style="width: 160px" slot="prepend" v-model="type" placeholder="请选择">
        <el-option
          v-for="(type, index) in typeList"
          :key="index"
          :label="type"
          :value="type">
        </el-option>
      </el-select>
      <el-button slot="append" @click="handleSearch()">搜索</el-button>
    </el-input>

    <div>获得的数据：<span>{{label}}</span></div>
  </div>
</template>

<script>
import {dict} from '@/utils/sys/dict'
export default {
  data () {
    return {
      type: undefined,
      value: undefined,
      label: undefined,
      dictList: [],
      typeList: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.dictList = dict.getDictList()
      // es6 数组去重Array.from(new Set(array))
      this.typeList = Array.from(new Set(this.dictList.map(e => e.type)))
    },
    handleSearch () {
      if (this.type && this.value) {
        this.label = dict.getDictLabel(this.type, this.value)
      }
    }
  }
}
</script>
