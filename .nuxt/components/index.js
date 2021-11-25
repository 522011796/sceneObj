export const AlertInpueDialog = () => import('../../components/AlertInpueDialog.vue' /* webpackChunkName: "components/alert-inpue-dialog" */).then(c => wrapFunctional(c.default || c))
export const AlertMessageDialog = () => import('../../components/AlertMessageDialog.vue' /* webpackChunkName: "components/alert-message-dialog" */).then(c => wrapFunctional(c.default || c))
export const EnvListDialog = () => import('../../components/EnvListDialog.vue' /* webpackChunkName: "components/env-list-dialog" */).then(c => wrapFunctional(c.default || c))
export const LightOpenTypeDialog = () => import('../../components/LightOpenTypeDialog.vue' /* webpackChunkName: "components/light-open-type-dialog" */).then(c => wrapFunctional(c.default || c))
export const LoopItem = () => import('../../components/LoopItem.vue' /* webpackChunkName: "components/loop-item" */).then(c => wrapFunctional(c.default || c))
export const NuxtLogo = () => import('../../components/NuxtLogo.vue' /* webpackChunkName: "components/nuxt-logo" */).then(c => wrapFunctional(c.default || c))
export const OrderCurtainsTypeDialog = () => import('../../components/OrderCurtainsTypeDialog.vue' /* webpackChunkName: "components/order-curtains-type-dialog" */).then(c => wrapFunctional(c.default || c))
export const OrderEditDialog = () => import('../../components/OrderEditDialog.vue' /* webpackChunkName: "components/order-edit-dialog" */).then(c => wrapFunctional(c.default || c))
export const OrderLightTypeDialog = () => import('../../components/OrderLightTypeDialog.vue' /* webpackChunkName: "components/order-light-type-dialog" */).then(c => wrapFunctional(c.default || c))
export const OrderListPopChildDialog = () => import('../../components/OrderListPopChildDialog.vue' /* webpackChunkName: "components/order-list-pop-child-dialog" */).then(c => wrapFunctional(c.default || c))
export const OrderMusicTypeDialog = () => import('../../components/OrderMusicTypeDialog.vue' /* webpackChunkName: "components/order-music-type-dialog" */).then(c => wrapFunctional(c.default || c))
export const OrderPowerTypeDialog = () => import('../../components/OrderPowerTypeDialog.vue' /* webpackChunkName: "components/order-power-type-dialog" */).then(c => wrapFunctional(c.default || c))
export const OrderSceneTypeDialog = () => import('../../components/OrderSceneTypeDialog.vue' /* webpackChunkName: "components/order-scene-type-dialog" */).then(c => wrapFunctional(c.default || c))
export const OrderSwitchKeyTypeDialog = () => import('../../components/OrderSwitchKeyTypeDialog.vue' /* webpackChunkName: "components/order-switch-key-type-dialog" */).then(c => wrapFunctional(c.default || c))
export const OrderSwitchTypeDialog = () => import('../../components/OrderSwitchTypeDialog.vue' /* webpackChunkName: "components/order-switch-type-dialog" */).then(c => wrapFunctional(c.default || c))
export const RoomListDialog = () => import('../../components/RoomListDialog.vue' /* webpackChunkName: "components/room-list-dialog" */).then(c => wrapFunctional(c.default || c))
export const SceneListDialog = () => import('../../components/SceneListDialog.vue' /* webpackChunkName: "components/scene-list-dialog" */).then(c => wrapFunctional(c.default || c))
export const TplListDialog = () => import('../../components/TplListDialog.vue' /* webpackChunkName: "components/tpl-list-dialog" */).then(c => wrapFunctional(c.default || c))
export const Tutorial = () => import('../../components/Tutorial.vue' /* webpackChunkName: "components/tutorial" */).then(c => wrapFunctional(c.default || c))

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
