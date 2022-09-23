import React, {Component} from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {headerTabStyle} from './styles/styles';
//import icons
import TatunAppIcon from '../assets/icons/customIcons/TatunAppIcon';

class HeaderTabComp extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View style={headerTabStyle.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CostumersScreen');
          }}>
          <TatunAppIcon name="icon_regresar" color={'#FFFFFF'} size={25} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default HeaderTabComp;
