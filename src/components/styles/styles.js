import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const headerTabStyle = StyleSheet.create({
  container: {
    flex: 0.1,
    backgroundColor: '#1190CB',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
});
