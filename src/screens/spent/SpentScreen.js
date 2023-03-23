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
import {insertSpent} from '../../services/local/LocalServicesSpent';
import {selectTotalPayments} from '../../services/local/LocalServicesPayment';
import {selectTotalSaleCash} from '../../services/local/LocalServicesSaleCash';
import HeaderComp from '../../components/HeaderComp';
import {getDate} from '../../utils/Common';
import {useGlobalContext} from '../../context/GlobalContext';

function SpentScreen(props) {
  const {userSession} = useGlobalContext();
  const [description, setDescription] = useState('');
  const [total, setTotal] = useState('0');

  const handleReturn = () => {
    props.navigation.replace('MenuScreen');
  };

  const handleSpent = async () => {
    const totalPayment$ = await selectTotalPayments(getDate());
    const totalSaleCash = await selectTotalSaleCash(getDate());
    if (total != '' && description != '') {
      if (
        totalPayment$.raw()[0].total != null ||
        totalSaleCash.raw()[0].total != null
      ) {
        if (parseInt(total) <= totalPayment$.raw()[0].total) {
          if (total == '0') {
            Alert.alert('Error', 'El  gasto no puede ser igual a 0');
            return;
          }
          const spent = {
            date: getDate(),
            description: description,
            total: total,
            id_user: userSession.id,
          };
          await insertSpent(spent);
          props.navigation.replace('MenuScreen');
        } else {
          Alert.alert('Error', 'No puedes agregar un gasto mayor a los abonos');
        }
      } else {
        Alert.alert('Error', 'Aun no realizas ventas o abonos');
      }
    } else {
      Alert.alert('Error', 'Llena todos los campos');
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#1190CB" barStyle={'ligth-content'} />
      <HeaderComp title={'Ingresar gasto'} handleReturn={handleReturn} />
      <View style={Styles.container}>
        <View style={Styles.dataContainer}>
          <View style={Styles.elementContainer}>
            <Text style={Styles.txtElementTitle}>Total:</Text>
            <TextInput
              style={Styles.inputElement}
              placeholder="Ingresa la cantidad de gasto"
              keyboardType={'numeric'}
              onChangeText={setTotal}
              value={total}
            />
          </View>
          <View style={Styles.elementContainer}>
            <Text style={Styles.txtElementTitle}>Descripcion:</Text>
            <TextInput
              style={Styles.inputElement}
              placeholder="Ingresa la descripcion"
              keyboardType={'default'}
              onChangeText={setDescription}
              value={description}
            />
          </View>
          <View style={Styles.btnContainer}>
            <TouchableOpacity style={Styles.btnAction} onPress={handleSpent}>
              <Text style={Styles.txtBtnAction}>Guardar gasto</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

export const Styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E5E5E5', justifyContent: 'center'},
  dataContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  elementContainer: {
    height: 100,
    flexDirection: 'row',
    marginBottom: 15,
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

export default SpentScreen;
