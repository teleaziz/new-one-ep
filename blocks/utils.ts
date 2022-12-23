import { Builder, Component, builder } from '@builder.io/sdk'

export function restrictedRegister(
  component: any,
  options: any,
  models: string[]
) {
   Builder.registerComponent(component, options)
}
