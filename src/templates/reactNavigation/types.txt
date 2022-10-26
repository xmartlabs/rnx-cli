import { ParamListBase } from '@react-navigation/native'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import React from 'react'

export interface ParamList extends ParamListBase {}

export type SceneProps<T extends keyof ParamList> = React.FunctionComponent<
  NativeStackScreenProps<ParamList, T>
>

export type NavigationProp<T extends keyof ParamList> =
  NativeStackNavigationProp<ParamList, T>

export const Stack = createNativeStackNavigator<ParamList>()
