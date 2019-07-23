import React, { Component } from 'react'
import { Animated, Text, View } from 'react-native'

import { PanGestureHandler, PanGestureHandlerGestureEvent, PanGestureHandlerStateChangeEvent } from 'react-native-gesture-handler';
import { Wheel } from 'src/Wheel/Wheel'
import { styles } from './styles'

const VELOCITY_THROTTLE = 4000

export class App extends Component {
  public state = {
    rotationAngle: new Animated.Value(0),
    spinning: false,
    velocity: new Animated.Value(0),
  }

  public render() {
    const angle = Animated.add(this.state.rotationAngle, this.state.velocity)
    const interpolatedRotationAngle = angle.interpolate({
      inputRange: [-360, 360],
      outputRange: ['-360deg', '360deg'],
    })
    return (
      <PanGestureHandler
        onGestureEvent={this.scrollHandler}
        onHandlerStateChange={this.scrollEndHandler}
      >
        <View style={{
          display: 'flex',
          height: '100%',
          width: '100%',
        }}>
          <Text style={styles.pointer}>👇</Text>
          <Wheel rotationAngle={interpolatedRotationAngle} />
        </View>
      </PanGestureHandler>
    )
  }

  private scrollHandler = (event: PanGestureHandlerGestureEvent) => {
    const offset = event.nativeEvent.translationX
    this.setState({
      rotationAngle: new Animated.Value(offset),
      velocity: new Animated.Value(event.nativeEvent.velocityX / VELOCITY_THROTTLE)
    })
  }

  private scrollEndHandler = (event: PanGestureHandlerStateChangeEvent) => {
    const offset = event.nativeEvent.translationX
    this.setState({ rotationAngle: new Animated.Value(offset) })
    this.decaySpinVelocity(event)
  }

  private decaySpinVelocity = (event: PanGestureHandlerGestureEvent) => {
    const startingVelocity = event.nativeEvent.velocityX
    Animated.decay(this.state.velocity, {
      deceleration: 0.995,
      velocity: startingVelocity
    }).start()
  }
}
