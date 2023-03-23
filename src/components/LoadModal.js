import React from 'react';
import {View, Modal, Text, StyleSheet, Dimensions} from 'react-native';
import LottieView from 'lottie-react-native';

function LoadModal(props) {
  const {state, text} = props;
  return (
    <Modal
      statusBarTranslucent={true}
      animationType={'fade'}
      transparent
      visible={state}>
      <View style={Styles.mainContainer}>
        <LottieView
          style={Styles.lottieContainer}
          source={require('../assets/animations/circular.json')}
          autoPlay
          loop
        />
        <Text style={Styles.txtLoad}>{text}</Text>
      </View>
    </Modal>
  );
}

const SCREEN_HEIGHT = Dimensions.get('window').height;
const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: SCREEN_HEIGHT,
    backgroundColor: 'rgba(1,1,1,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieContainer: {width: 150, height: 150},
  txtLoad: {fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginTop: 15},
});

export default LoadModal;
