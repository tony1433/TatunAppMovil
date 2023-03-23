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
import HeaderComp from '../../components/HeaderComp';
import {getDate} from '../../utils/Common';
import {useGlobalContext} from '../../context/GlobalContext';
import {updateBalanceClientService} from '../../services/remote/ApiServices';
import {updateBalanceClient} from '../../services/local/LocalServicesClients';
import useApiRequest from '../../hooks/useApiRequest';
import LoadModal from '../../components/LoadModal';
import {useEffect} from 'react/cjs/react.development';
import {ErrorManager} from '../../utils/ErrorManager';

function AuthorizationScreen(props) {
  let codeOriginal = '21846';
  const {client} = useGlobalContext();
  const [code, setCode] = useState('');
  const {loading, error, callEnpoint} = useApiRequest();

  const handleReturn = () => {
    props.navigation.replace('ClientsScreen');
  };

  const handleAccept = async () => {
    if (code == codeOriginal) {
      const response = await callEnpoint(updateBalanceClientService(client.id));
      if (response) {
        await updateBalanceClient(client.id, response.balance);
        props.navigation.replace('ClientsScreen');
      }
    } else {
      Alert.alert('Error', 'Ingresa el codigo correcto');
    }
  };

  useEffect(() => {
    if (error.value) {
      Alert.alert('Error', error.e.response.data.message);
    }
  }, [error]);

  return (
    <>
      <LoadModal state={loading} />

      <StatusBar backgroundColor="#1190CB" barStyle={'ligth-content'} />
      <HeaderComp
        title={'Codigo de confirmacion'}
        handleReturn={handleReturn}
      />
      <View style={Styles.container}>
        <View style={Styles.dataContainer}>
          <View style={Styles.elementContainer}>
            <Text style={Styles.txtElementTitle}>Codigo:</Text>
            <TextInput
              style={Styles.inputElement}
              placeholder="Ingresa el codigo"
              keyboardType={'numeric'}
              secureTextEntry={true}
              onChangeText={setCode}
              value={code}
            />
          </View>
          <View style={Styles.btnContainer}>
            <TouchableOpacity style={Styles.btnAction} onPress={handleAccept}>
              <Text style={Styles.txtBtnAction}>Aceptar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const Styles = StyleSheet.create({
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

export default AuthorizationScreen;
