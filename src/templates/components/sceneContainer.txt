import * as React from 'react'
import {
  Keyboard,
  StatusBar,
  StatusBarProps,
  StyleProp,
  TouchableWithoutFeedback,
  ViewStyle,
} from 'react-native'
import { Edge, SafeAreaView } from 'react-native-safe-area-context'

import { styles } from './styles'

interface LayoutProps {
  edges?: Edge[]
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
  barStyle?: StatusBarProps['barStyle']
}

const dismissKeyboard = () => Keyboard.dismiss()

export const SceneContainer: React.FunctionComponent<LayoutProps> = ({
  edges = ['left', 'right'],
  style,
  children,
  barStyle,
}) => (
  <TouchableWithoutFeedback onPress={dismissKeyboard}>
    <SafeAreaView style={[styles.container, style]} edges={edges}>
      <StatusBar barStyle={barStyle} />
      {children}
    </SafeAreaView>
  </TouchableWithoutFeedback>
)
