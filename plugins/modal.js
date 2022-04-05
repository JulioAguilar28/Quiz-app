import Vue from 'vue'
import { vfmPlugin } from 'vue-final-modal/lib'

Vue.use(
  vfmPlugin({
    key: '$vfm',
    componentName: 'VueFinalModal',
    dynamicContainerName: 'ModalsContainer'
  })
)
