import React, { Component } from 'react'
import { Animated } from 'react-native'

import wheelOfFortune from 'assets/images/wheelOfFortune.png'
import { styles } from './styles'

export class Wheel extends Component {
  public render() {
    return (
      <Animated.Image
        style={styles.wheel}
        source={wheelOfFortune}
      />
    )
  }
}
