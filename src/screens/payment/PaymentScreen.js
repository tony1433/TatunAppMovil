import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {insertPayment} from '../../services/local/LocalServicesPayment';
import {
  updateBalanceClient,
  selectBalanceClient,
} from '../../services/local/LocalServicesClients';
import HeaderComp from '../../components/HeaderComp';
import {useGlobalContext} from '../../context/GlobalContext';
import {getDate, getHour} from '../../utils/Common';

function PaymentScreen(props) {
  const [payment, setPayment] = useState('');
  const {client, userSession, setClient} = useGlobalContext();

  const handleReturn = () => {
    props.navigation.replace('ClientsScreen');
  };

  const onChangePayment = payment$ => {
    if (payment$ > client.balance) {
      Alert.alert(
        'Ocurrio un error !',
        'No puedes abonar mas de lo que debe el cliente',
      );
      setPayment('');
    } else {
      setPayment(payment$);
    }
  };

  const handlePayment = async () => {
    if (payment != '') {
      const date = getDate();
      const hour = getHour();
      const payment$ = {
        date: date,
        hour: hour,
        total: payment,
        id_client: client.id,
        id_user: userSession.id,
      };
      await insertPayment(payment$);
      const newBalance = client.balance - payment;
      await updateBalanceClient(client.id, newBalance);
      props.navigation.replace('SaleCreditScreen');
    } else {
      Alert.alert('Ocurrio un error !', 'Llena el campo de abono');
    }
  };

  const handleNoPayment = () => {
    props.navigation.replace('SaleCreditScreen');
  };

  return (
    <>
      <StatusBar backgroundColor="#1190CB" barStyle={'ligth-content'} />
      <HeaderComp title={'Abono'} handleReturn={handleReturn} />
      <View style={Styles.container}>
        <View style={Styles.payContainer}>
          <View style={Styles.elementPay}>
            <Text style={Styles.txtElementPay}>Cliente:</Text>
            <View style={Styles.infoPay}>
              <Text style={Styles.txtPay}>{client.name_complete}</Text>
            </View>
          </View>
          <View style={Styles.elementPay}>
            <Text style={Styles.txtElementPay}>Saldo actual:</Text>
            <View style={Styles.infoPay}>
              <Text style={Styles.txtPay}>{client.balance}</Text>
            </View>
          </View>
          <View style={Styles.elementPay}>
            <Text style={Styles.txtElementPay}>Abono:</Text>
            <TextInput
              style={Styles.inputPay}
              onChangeText={t => onChangePayment(t)}
              value={payment}
              placeholder="Digita abono"
              keyboardType={'numeric'}
            />
          </View>
          <View style={Styles.btnContainer}>
            <TouchableOpacity style={Styles.btnPayment} onPress={handlePayment}>
              <Text style={Styles.txtBtnPayment}>Guardar abono</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.btnPayment}
              onPress={handleNoPayment}>
              <Text style={Styles.txtBtnPayment}>No abonar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

export const Styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E5E5E5', justifyContent: 'center'},
  payContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  elementPay: {
    height: 100,
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  txtElementPay: {
    flex: 0.4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  infoPay: {
    flex: 1,
    height: 50,
    backgroundColor: '#E9F0FF',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1190CB',
    marginLeft: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtPay: {fontSize: 16, color: '#000000'},
  inputPay: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
    backgroundColor: '#E9F0FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1190CB',
    marginLeft: 15,
    textAlign: 'center',
  },
  btnContainer: {flex: 0.4},
  btnPayment: {
    height: 50,
    backgroundColor: '#1190CB',
    borderRadius: 60,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBtnPayment: {fontSize: 16, fontWeight: 'bold', color: '#FFFFFF'},
});

export default PaymentScreen;
