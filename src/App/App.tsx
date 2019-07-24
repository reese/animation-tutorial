import React, { Component } from 'react'
import { Animated, Text, View } from 'react-native'
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State as GestureState
} from 'react-native-gesture-handler'

import { Wheel } from 'src/Wheel/Wheel'
import { styles } from './styles'

interface State {
  rotationAngle: Animated.Value
  velocity: Animated.Value
}

const ROTATION_THROTTLE = 20
const VELOCITY_THROTTLE = 2000

export class App extends Component<State> {
  public state = {
    rotationAngle: new Animated.Value(0),
    velocity: new Animated.Value(0)
  }

  public render() {
    const angle = this.calculatedRotationAngle

    const interpolatedAngle = angle.interpolate({
      inputRange: [-360, 360],
      outputRange: ["-360deg", "360deg"]
    })

    return (
      <PanGestureHandler
        onGestureEvent={this.scrollHandler}
        onHandlerStateChange={this.scrollEndHandler}
      >
        <View style={styles.container}>
          <Text style={styles.pointer}>👇</Text>
          <Wheel rotationAngle={interpolatedAngle} />
        </View>
      </PanGestureHandler>
    )
  }

  private get calculatedRotationAngle() {
    const { rotationAngle, velocity } = this.state

    const newRotationAngle = Animated.add(rotationAngle, velocity)
    // @ts-ignore
    if (velocity._value !== 0) {
      this.setState({ rotationAngle: newRotationAngle })
    }
    return newRotationAngle
  }

  private scrollHandler = (event: PanGestureHandlerGestureEvent) => {
    const { rotationAngle } = this.state
    const offset = event.nativeEvent.translationX / ROTATION_THROTTLE
    this.setState({ rotationAngle: Animated.add(rotationAngle, new Animated.Value(offset)) })
  }

  private scrollEndHandler = (event: PanGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === GestureState.END) {
      this.decaySpinVelocity(event)
    }
  }

  private decaySpinVelocity = (event: PanGestureHandlerGestureEvent) => {
    const startingVelocity = event.nativeEvent.velocityX / VELOCITY_THROTTLE
    Animated.decay(this.state.velocity, {
      useNativeDriver: true,
      velocity: startingVelocity,
    }).start()
  }
}
