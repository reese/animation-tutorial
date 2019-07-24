import React, { Component } from 'react'
import { Animated } from 'react-native'

import wheelOfFortune from 'assets/images/wheelOfFortune.png'
import { styles } from './styles'

interface Props {
  rotationAngle: Animated.AnimatedInterpolation
}

export class Wheel extends Component<Props> {
  public render() {
    const { rotationAngle } = this.props
    return (
      <Animated.Image
        style={{
          ...styles.wheel,
          transform: [{ rotate: rotationAngle }]
        }}
        source={wheelOfFortune}
      />
    )
  }
}
