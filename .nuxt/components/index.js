export { default as AlertInpueDialog } from '../../components/AlertInpueDialog.vue'
export { default as AlertMessageDialog } from '../../components/AlertMessageDialog.vue'
export { default as EnvListDialog } from '../../components/EnvListDialog.vue'
export { default as LightOpenTypeDialog } from '../../components/LightOpenTypeDialog.vue'
export { default as LoopItem } from '../../components/LoopItem.vue'
export { default as NuxtLogo } from '../../components/NuxtLogo.vue'
export { default as OrderChangeDeviceTypeDialog } from '../../components/OrderChangeDeviceTypeDialog.vue'
export { default as OrderCurtainsTypeDialog } from '../../components/OrderCurtainsTypeDialog.vue'
export { default as OrderEditDialog } from '../../components/OrderEditDialog.vue'
export { default as OrderLightTypeDialog } from '../../components/OrderLightTypeDialog.vue'
export { default as OrderListPopChildDialog } from '../../components/OrderListPopChildDialog.vue'
export { default as OrderMusicTypeDialog } from '../../components/OrderMusicTypeDialog.vue'
export { default as OrderPowerTypeDialog } from '../../components/OrderPowerTypeDialog.vue'
export { default as OrderSceneTypeDialog } from '../../components/OrderSceneTypeDialog.vue'
export { default as OrderSwitchKeyTypeDialog } from '../../components/OrderSwitchKeyTypeDialog.vue'
export { default as OrderSwitchTypeDialog } from '../../components/OrderSwitchTypeDialog.vue'
export { default as RoomListDialog } from '../../components/RoomListDialog.vue'
export { default as SceneListDialog } from '../../components/SceneListDialog.vue'
export { default as TplListDialog } from '../../components/TplListDialog.vue'
export { default as Tutorial } from '../../components/Tutorial.vue'
export { default as TreeDeviceRoomTree } from '../../components/tree/DeviceRoomTree.vue'
export { default as Toast } from '../../components/toast/index.js'

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
