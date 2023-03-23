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
  ToastAndroid,
} from 'react-native';
import {
  updateClient,
  updateInventory,
  insertPayment,
  insertSaleCash,
  insertSaleCredit,
  insertSpent,
} from '../../services/remote/ApiServices';
import useApiRequest from '../../hooks/useApiRequest';
import {
  selectAllClients,
  updateStatusClient,
} from '../../services/local/LocalServicesClients';
import {selectAllInventory} from '../../services/local/LocalServicesInventory';
import {
  selectTotalPayments,
  selectPayments,
} from '../../services/local/LocalServicesPayment';
import {
  selectTotalSaleCash,
  selectSaleCash,
} from '../../services/local/LocalServicesSaleCash';
import {
  selectTotalSaleCredit,
  selectSaleCredit,
} from '../../services/local/LocalServicesSaleCredit';
import {
  selectTotalSpent,
  selectSpent,
} from '../../services/local/LocalServicesSpent';
import HeaderComp from '../../components/HeaderComp';
import {getDate} from '../../utils/Common';
import {useGlobalContext} from '../../context/GlobalContext';
import LoadModal from '../../components/LoadModal';
import {deleteUser} from '../../services/local/LocalServicesUser';

function FinishSaleScreen(props) {
  //const {userSession} = useGlobalContext();
  const [totalSaleCredit, setTotalSaleCredit] = useState('0');
  const [totalSaleCash, setTotalSaleCash] = useState('0');
  const [payment, setPayment] = useState('0');
  const [totalSpent, setTotalSpent] = useState('0');
  const [total, setTotal] = useState('0');
  const {error, callEnpoint} = useApiRequest();
  const [load, setLoad] = useState(false);

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

  const updateClientService = async () => {
    const clients = await selectAllClients();
    clients.raw().map(async client => {
      const response = await callEnpoint(updateClient(client));
      if (response) {
        await updateStatusClient(client.id);
        console.log('cliente actualizado');
      }
    });
  };

  const updateInventoryService = async () => {
    const inventorys = await selectAllInventory(getDate());
    inventorys.raw().map(async inventory => {
      const response = await callEnpoint(updateInventory(inventory));
      if (response) {
        console.log('inventario actualizado');
      }
    });
  };

  const insertPaymentService = async () => {
    const payments = await selectPayments(getDate());
    payments.raw().map(async payment => {
      const response = await callEnpoint(insertPayment(payment));
      if (response) {
        console.log('abono insertado');
      }
    });
  };

  const insertSaleCashService = async () => {
    const sale_cash = await selectSaleCash(getDate());
    console.log('sale_cash', sale_cash.raw());
    sale_cash.raw().map(async sale => {
      const response = await callEnpoint(insertSaleCash(sale));
      if (response) {
        console.log('venta contado insertada');
      }
    });
  };

  const insertSaleCreditService = async () => {
    const sale_credit = await selectSaleCredit(getDate());

    sale_credit.raw().map(async sale => {
      const response = await callEnpoint(insertSaleCredit(sale));
      if (response) {
        console.log('venta credito insertada');
      }
    });
  };

  const insertSpentService = async () => {
    const spents = await selectSpent(getDate());
    spents.raw().map(async spent => {
      const response = await callEnpoint(insertSpent(spent));
      if (response) {
        console.log('gasto insertado');
      }
    });
  };

  const handleFinish = async () => {
    if (total != '0') {
      setLoad(true);
      await updateClientService();
      await updateInventoryService();
      await insertPaymentService();
      await insertSaleCashService();
      await insertSaleCreditService();
      await insertSpentService();
      setLoad(false);
      if (error.value && error.status == -1) {
        Alert.alert('Error', 'Ocurrio un error de red');
      } else {
        Alert.alert('Finalizado', 'Se termino la venta correctamente', [
          {
            text: 'Listo',
            onPress: async () => {
              await deleteUser();
              props.navigation.replace('LoginScreen');
            },
          },
        ]);
      }
    }
  };

  useEffect(() => {
    refreshSales();
  }, []);

  useEffect(() => {
    if (error.value) {
      console.log('error', error.e?.response?.data?.message);
    }
  }, [error]);

  return (
    <>
      <LoadModal state={load} />
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
                <Text style={Styles.txtElementTitle}>Total:</Text>
                <View style={Styles.infoElement}>
                  <Text style={Styles.txtElement}>{total}</Text>
                </View>
              </View>
              <View style={Styles.btnContainer}>
                <TouchableOpacity
                  style={Styles.btnAction}
                  onPress={handleFinish}>
                  <Text style={Styles.txtBtnAction}>Terminar venta</Text>
                </TouchableOpacity>
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
    height: 80,
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

export default FinishSaleScreen;
