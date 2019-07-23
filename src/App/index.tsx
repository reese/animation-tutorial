import React, { Component } from 'react'
import { Text, View } from 'react-native'

import { Wheel } from 'src/Wheel/Wheel'
import { styles } from './styles'

export class App extends Component {
  public render() {
    return (
      <View style={{
        height: '100%',
        width: '100%',
      }}>
        <Text style={styles.pointer}>👇</Text>
        <Wheel />
      </View>
    )
  }
}
