import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import React, { useLayoutEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import { ScreenContainer } from 'react-native-screens'
import { Routes } from 'src/navigation/routes'
import { SceneProps } from 'src/navigation/types'

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
})

export const Welcome: SceneProps<Routes.Welcome> = ({ navigation }) => {
  useLayoutEffect(() => {
    const options: NativeStackNavigationOptions = {
      headerTitle: 'Welcome',
      headerTransparent: true,
    }
    navigation.setOptions(options)
  }, [navigation])

  return (
    <ScreenContainer style={styles.container}>
      <Text>Welcome to the new React Native project</Text>
    </ScreenContainer>
  )
}
