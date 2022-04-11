// @ts-ignore
// eslint-disable-next-line import/named
import { $vfm, VueFinalModalProperty } from 'vue-final-modal'
import { SetupContext, useContext, useRoute, useRouter } from '@nuxtjs/composition-api'
// eslint-disable-next-line import/named
import VueRouter, { Route } from 'vue-router'

export default interface ComponentContext {
  $emit: Function
  $vfm: VueFinalModalProperty
  $router: VueRouter
  $route: Route
}

const injectRouter = (router: VueRouter, context: ComponentContext) => {
  context.$router = router
}

const injectRoute = (route: Route, context: ComponentContext) => {
  context.$route = route
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
  const router = useRouter()
  const route = useRoute().value

  injectEmitter(emit, context)
  injectRouter(router, context)
  injectRoute(route, context)
  injectModal($vfm, context)

  return context
}
