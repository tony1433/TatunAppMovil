import React, {useState, useEffect} from 'react';
import {
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {selectTotalPayments} from '../../services/local/LocalServicesPayment';
import {selectTotalSaleCash} from '../../services/local/LocalServicesSaleCash';
import {selectTotalSaleCredit} from '../../services/local/LocalServicesSaleCredit';
import {selectTotalSpent} from '../../services/local/LocalServicesSpent';
import HeaderComp from '../../components/HeaderComp';
import {getDate} from '../../utils/Common';
import {useGlobalContext} from '../../context/GlobalContext';

function SalesScreen(props) {
  const {userSession} = useGlobalContext();
  const [totalSaleCredit, setTotalSaleCredit] = useState('0');
  const [totalSaleCash, setTotalSaleCash] = useState('0');
  const [payment, setPayment] = useState('0');
  const [totalSpent, setTotalSpent] = useState('0');
  const [total, setTotal] = useState('0');

  const handleReturn = () => {
    props.navigation.replace('MenuScreen');
  };

  const refreshSales = async () => {
    const totalPayment = await selectTotalPayments(getDate());
    const totalSaleCash = await selectTotalSaleCash(getDate());
    const totalSaleCredit = await selectTotalSaleCredit(getDate());
    const totalSpent = await selectTotalSpent(getDate());
    setPayment(totalPayment.raw()[0].total);
    setTotalSaleCash(totalSaleCash.raw()[0].total);
    setTotalSaleCredit(totalSaleCredit.raw()[0].total);
    setTotalSpent(totalSpent.raw()[0].total);
    //calcular total
    const sumTotal =
      totalPayment.raw()[0].total +
      totalSaleCash.raw()[0].total -
      totalSpent.raw()[0].total;
    setTotal(sumTotal);
  };

  useEffect(() => {
    refreshSales();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#1190CB" barStyle={'ligth-content'} />
      <HeaderComp title={'Mis ventas'} handleReturn={handleReturn} />
      <View style={Styles.container}>
        <View style={Styles.dataContainer}>
          <SafeAreaView style={Styles.safeAreaView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={Styles.elementContainer}>
                <Text style={Styles.txtElementTitle}>Fecha:</Text>
                <View style={Styles.infoElement}>
                  <Text style={Styles.txtElement}>{getDate()}</Text>
                </View>
              </View>
              <View style={Styles.elementContainer}>
                <Text style={Styles.txtElementTitle}>Venta credito:</Text>
                <View style={Styles.infoElement}>
                  <Text style={Styles.txtElement}>{totalSaleCredit}</Text>
                </View>
              </View>
              <View style={Styles.elementContainer}>
                <Text style={Styles.txtElementTitle}>Abono:</Text>
                <View style={Styles.infoElement}>
                  <Text style={Styles.txtElement}>{payment}</Text>
                </View>
              </View>
              <View style={Styles.elementContainer}>
                <Text style={Styles.txtElementTitle}>Venta contado:</Text>
                <View style={Styles.infoElement}>
                  <Text style={Styles.txtElement}>{totalSaleCash}</Text>
                </View>
              </View>

              <View style={Styles.elementContainer}>
                <Text style={Styles.txtElementTitle}>Gastos:</Text>
                <View style={Styles.infoElement}>
                  <Text style={Styles.txtElement}>{totalSpent}</Text>
                </View>
              </View>
              <View style={Styles.elementContainer}>
                <Text style={Styles.txtElementTitle}>Total dia:</Text>
                <View style={Styles.infoElement}>
                  <Text style={Styles.txtElement}>{total}</Text>
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
        </View>
      </View>
    </>
  );
}

export const Styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E5E5E5', justifyContent: 'center'},
  safeAreaView: {flex: 1},
  dataContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  elementContainer: {
    height: 100,
    flexDirection: 'row',
    marginBottom: 5,
    alignItems: 'center',
  },
  txtElementTitle: {
    flex: 0.4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  infoElement: {
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
  txtElement: {fontSize: 16, color: '#000000'},
  inputElement: {
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
  btnAction: {
    height: 50,
    backgroundColor: '#1190CB',
    borderRadius: 60,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBtnAction: {fontSize: 16, fontWeight: 'bold', color: '#FFFFFF'},
});

export default SalesScreen;
