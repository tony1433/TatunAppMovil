import React, {Component} from 'react';
import {StatusBar, View, TouchableOpacity, Text} from 'react-native';
import {menuStyle} from './styles/styles';
//import icons
import TatunAppIcon from '../assets/icons/customIcons/TatunAppIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

class MenuScreen extends Component {
  btnEvent = screen => {
    this.props.navigation.replace(screen);
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor="#1190CB" barStyle={'ligth-content'} />
        <View style={menuStyle.header} />
        <View style={menuStyle.Container}>
          <View style={menuStyle.sectionContainer}>
            <TouchableOpacity style={menuStyle.btnMenuLeft}>
              <TatunAppIcon name="icon_ventas" color={'#1190CB'} size={50} />
              <Text style={menuStyle.textOptionMenu}>Ventas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={menuStyle.btnMenuRight}
              onPress={() => this.btnEvent('CostumersScreen')}>
              <TatunAppIcon name="icon_sector" color={'#1190CB'} size={50} />
              <Text style={menuStyle.textOptionMenu}>Clientes</Text>
            </TouchableOpacity>
          </View>
          <View style={menuStyle.centerContainer}>
            <TouchableOpacity style={menuStyle.btnMenuLeft}>
              <TatunAppIcon
                name="icon_inventario"
                color={'#1190CB'}
                size={50}
              />
              <Text style={menuStyle.textOptionMenu}>Inventario</Text>
            </TouchableOpacity>
            <TouchableOpacity style={menuStyle.btnMenuRight}>
              <TatunAppIcon name="icon_gastos" color={'#1190CB'} size={50} />
              <Text style={menuStyle.textOptionMenu}>Gastos</Text>
            </TouchableOpacity>
          </View>
          <View style={menuStyle.bottomContainer}>
            <TouchableOpacity style={menuStyle.btnMenuLeft}>
              <Icon name="account-cash" color={'#1190CB'} size={50} />
              <Text style={menuStyle.textOptionMenu}>Venta contado</Text>
            </TouchableOpacity>
            <TouchableOpacity style={menuStyle.btnMenuRight}>
              <TatunAppIcon
                name="icon_actualizar"
                color={'#1190CB'}
                size={50}
              />
              <Text style={menuStyle.textOptionMenu}>Actualizar catalogos</Text>
            </TouchableOpacity>
          </View>
          <View style={menuStyle.bottomContainer}>
            <TouchableOpacity style={menuStyle.btnMenuLeft}>
              <TatunAppIcon
                name="icon_terminarventa"
                color={'#1190CB'}
                size={50}
              />
              <Text style={menuStyle.textOptionMenu}>Terminar venta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={menuStyle.btnMenuRight}
              onPress={() => this.btnEvent('LoginScreen')}>
              <TatunAppIcon
                name="icon_cerrasesion"
                color={'#1190CB'}
                size={50}
              />
              <Text style={menuStyle.textOptionMenu}>Cerrar sesion</Text>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  }
}

export default MenuScreen;
