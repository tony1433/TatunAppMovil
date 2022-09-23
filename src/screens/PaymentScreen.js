import React, {Component} from 'react';
import {View, StatusBar, Text, TextInput, TouchableOpacity} from 'react-native';
import {paymentStyle} from './styles/styles';
import HeaderTabComp from '../components/HeaderTabComp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class PaymentScreen extends Component {
  state = {
    abono: 0,
  };
  setAbono = text => {
    this.setState({abono: text});
  };
  render() {
    const {infoCostumer} = this.props.route.params;
    return (
      <>
        <StatusBar backgroundColor="#1190CB" barStyle={'ligth-content'} />
        <HeaderTabComp navigation={this.props.navigation} />
        <View style={paymentStyle.container}>
          <View style={paymentStyle.titleContainer}>
            <Text style={paymentStyle.txtTitle}>Abono</Text>
          </View>
          <View style={paymentStyle.payContainer}>
            <View style={paymentStyle.elementPay}>
              <Text style={paymentStyle.txtElementPay}>Cliente:</Text>
              <View style={paymentStyle.infoPay}>
                <Text style={paymentStyle.txtPay}>
                  {infoCostumer.nombre_completo}
                </Text>
              </View>
            </View>
            <View style={paymentStyle.elementPay}>
              <Text style={paymentStyle.txtElementPay}>Saldo actual:</Text>
              <View style={paymentStyle.infoPay}>
                <Text style={paymentStyle.txtPay}>{infoCostumer.saldo}</Text>
              </View>
            </View>
            <View style={paymentStyle.elementPay}>
              <Text style={paymentStyle.txtElementPay}>Abono:</Text>
              <TextInput
                style={paymentStyle.inputPay}
                onChangeText={t => this.setAbono(t)}
                value={this.state.cobrador}
                placeholder="Digita abono"
                keyboardType={'numeric'}
              />
            </View>
            <View style={paymentStyle.btnContainer}>
              <TouchableOpacity style={paymentStyle.btnPayment}>
                <Text style={paymentStyle.txtBtnPayment}>Guardar abono</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </>
    );
  }
}

export default PaymentScreen;
