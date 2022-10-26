import React from 'react'
import { Welcome } from 'src/scenes/welcome'

import { Routes } from './routes'
import { Stack } from './types'

export const AppContainer = () => (
  <Stack.Navigator>
    <Stack.Screen name={Routes.Welcome} component={Welcome} />
  </Stack.Navigator>
)
