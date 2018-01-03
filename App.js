import React from 'react';
import {StyleSheet, Text, PanResponder, View, Animated, Easing, Dimensions} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    
    this.state.minX = 50;
    this.state.maxValue = 500;
    this.state.rightSpace = 100;
  }
  
  limitX(x) {
    return Math.min(Math.max(this.state.minX, parseInt(x)), this.state.maxX);
  }
  
  xAsValue(left) {
    return parseInt((left - this.state.minX) * this.state.percentX);
  }
  
  move(evt, gestureState, top) {
    let left = this.limitX(gestureState.moveX);
    let value = this.xAsValue(left);
    this.setState({
      value: (value),
      top: top,
      left: left
    });
    this.animatedValue.x = left;
  }
  
  componentWillMount() {
    this.state.maxX = Dimensions.get('window').width - this.state.rightSpace;
    this.state.percentX = this.state.maxValue / (this.state.maxX - this.state.minX);
    this.state.value = 0;
    let left = this.limitX(163);
    let value = this.xAsValue(left);
    this.setState({
      value
    });
    this.animatedValue = new Animated.ValueXY({
      x: left,
      y: 0
    });
    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        Animated.timing(
          // Animate value over time
          this.animatedValue.y, // The value to drive
          {
            toValue: -54,
            easing: Easing.elastic(2),
            duration: 550,
          }
        ).start();
        
      },
      onPanResponderMove: (evt, gestureState) => {
        this.move(evt, gestureState, -40);
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.move(evt, gestureState, 0);
        Animated.timing(
          // Animate value over time
          this.animatedValue.y, // The value to drive
          {
            toValue: 0,
            easing: Easing.back(),
            duration: 250,
          }
        ).start();
      },
    });
  }
  
  render() {
    const animatedStyle = {
      transform: this.animatedValue.getTranslateTransform()
    };
 
    return (
      <View style={styles.container}>
        <View style={styles.slider}>
          <Text style={styles.minText}>0</Text>
          <Animated.View
            style={[styles.button, animatedStyle]}
            {...this.state.panResponder.panHandlers}
          >
            <View style={styles.buttonInner}>
              <Text style={styles.buttonText}>{this.state.value}</Text>
            </View>
          </Animated.View>
          <Text style={styles.maxText}>500</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12
  },
  slider: {
    width: '100%',
    height: 54,
    backgroundColor: '#4a73fe',
    justifyContent: 'center',
    borderRadius: 6,
  },
  minText: {
    color: '#ffffff',
    height: 20,
    position: 'absolute',
    left: 12,
    top: '50%',
    marginTop: -10
  },
  maxText: {
    color: '#ffffff',
    height: 20,
    position: 'absolute',
    right: 12,
    top: '50%',
    marginTop: -10
  },
  button: {
    backgroundColor: '#4a73fe',
    height: 54,
    width: 54,
    position: 'absolute',
    marginLeft: -27,
    top: 0,
    borderRadius: 54,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonInner: {
    backgroundColor: '#d6e7f7',
    height: 42,
    width: 42,
    position: 'absolute',
    left: '50%',
    marginLeft: -21,
    bottom: 6,
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: '#4a73fe',
  }
});


