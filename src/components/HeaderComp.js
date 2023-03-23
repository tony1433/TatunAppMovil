import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import TatunAppIcon from '../assets/icons/customIcons/TatunAppIcon';

function HeaderComp(props) {
  const {title, handleReturn} = props;

  return (
    <View style={Styles.headerContainer}>
      <View style={Styles.returnContainer}>
        <TouchableOpacity style={Styles.btnReturn} onPress={handleReturn}>
          <TatunAppIcon name="icon_regresar" color={'#FFFFFF'} size={25} />
        </TouchableOpacity>
      </View>
      <View style={Styles.titleContainer}>
        <Text style={Styles.txtTitle}>{title}</Text>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  headerContainer: {
    flex: 0.1,
    flexDirection: 'row',
    backgroundColor: '#1190CB',
    padding: 10,
  },
  returnContainer: {
    flex: 0.1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  btnReturn: {
    width: 60,
    height: 50,
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  txtTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default HeaderComp;
