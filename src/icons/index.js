import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon' // svg组件
import generateIconsView from './generateIconsView.js' // all icon selector

Vue.component('svg-icon', SvgIcon)

const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
const iconMap = requireAll(req)

generateIconsView.generate(iconMap) // all icon selector
