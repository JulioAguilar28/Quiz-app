// @ts-ignore
// eslint-disable-next-line import/named
import { $vfm, VueFinalModalProperty } from 'vue-final-modal'
import { SetupContext, useContext } from '@nuxtjs/composition-api'

export default interface ComponentContext {
  $emit: Function
  $vfm: VueFinalModalProperty
}

const injectEmitter = (emit: Function, context: ComponentContext) => {
  context.$emit = emit
}

const injectModal = (vfm: VueFinalModalProperty, context: ComponentContext) => {
  context.$vfm = vfm
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $vfm: VueFinalModalProperty
  }
}

/**
 * Use this function to build component context
 * This function should be invoked within component setup
 */
export const buildComponentContext = ({ emit }: SetupContext): ComponentContext => {
  const context = useContext() as unknown as ComponentContext

  injectEmitter(emit, context)
  injectModal($vfm, context)

  return context
}
