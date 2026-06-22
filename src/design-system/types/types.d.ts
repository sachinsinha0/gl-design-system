import { config } from "../theme"

declare module "*.svg" {
    import React from "react"
    import { SvgProps } from "react-native-svg"
    const content: React.FC<SvgProps>
    export default content
  }

export type Conf = typeof config

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}
