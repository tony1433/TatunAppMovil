import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const drawerStyle = StyleSheet.create({
  headerStyle: {height: 90, backgroundColor: '#1190CB'},
  headerTitleStyle: {
    alingItems: 'center',
    color: '#FFFFFF',
    fontSize: 20,
  },
  txtTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
