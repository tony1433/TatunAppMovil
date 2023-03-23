import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import TatunAppIcon from '../../../assets/icons/customIcons/TatunAppIcon';

function OptionButton(props) {
  const {icon, option, handleOption} = props;
  return (
    <TouchableOpacity style={Styles.btnOption} onPress={handleOption}>
      <TatunAppIcon name={icon} color={'#1190CB'} size={50} />
      <Text style={Styles.textOption}>{option}</Text>
    </TouchableOpacity>
  );
}

export const Styles = StyleSheet.create({
  btnOption: {
    flex: 1,
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    marginLeft: 15,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textOption: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
  },
});

export default OptionButton;
