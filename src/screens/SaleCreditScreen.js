import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {saleCreditStyle} from './styles/styles';
import HeaderTabComp from '../components/HeaderTabComp';

class SaleCreditScreen extends Component {
  render() {
    const {infoCostumer} = this.props.route.params;
    return (
      <>
        <HeaderTabComp navigation={this.props.navigation} />
        <View style={saleCreditStyle.container}>
          <View style={saleCreditStyle.titleContainer}>
            <Text style={saleCreditStyle.txtTitle}>Venta credito</Text>
          </View>
          <View style={saleCreditStyle.clientName}>
            <Text style={saleCreditStyle.txtTitleInfo}>Cliente:</Text>
            <View style={saleCreditStyle.nameContainer}>
              <Text style={saleCreditStyle.txtClientName}>
                {infoCostumer.nombre_completo}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  }
}

export default SaleCreditScreen;
