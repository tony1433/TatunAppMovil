import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {getAuth} from '../../services/remote/ApiServices';
import {insertUser} from '../../services/local/LocalServicesUser';
import {
  selectTotalClients,
  updateNewStatusClient,
  updateStatusClient,
} from '../../services/local/LocalServicesClients';
import {selectPaymentByClient} from '../../services/local/LocalServicesPayment';
import {selectSaleCreditByClient} from '../../services/local/LocalServicesSaleCredit';
import useApiRequest from '../../hooks/useApiRequest';
import LoadModal from '../../components/LoadModal';
import {ErrorManager} from '../../utils/ErrorManager';
import {useGlobalContext} from '../../context/GlobalContext';
import {getDate} from '../../utils/Common';

function LoginScreen(props) {
  const {setUserSession} = useGlobalContext();
  const [values, setValues] = useState({username: '', password: ''});
  const [load, setLoad] = useState(false);
  const {loading, error, callEnpoint} = useApiRequest();

  const changeValues = (property, value) => {
    setValues({...values, [property]: value});
  };

  const refreshStatusClient = async () => {
    setLoad(true);
    let dateFirst = getDate(-3);
    let dateEnd = getDate(2);

    const clients$ = await selectTotalClients();
    await Promise.all(
      clients$.raw().map(async client$ => {
        const payments$ = await selectPaymentByClient(
          client$.id,
          dateFirst,
          dateEnd,
        );
        const saleCredits$ = await selectSaleCreditByClient(
          client$.id,
          dateFirst,
          dateEnd,
        );
        if (payments$.raw().length == 0 && saleCredits$.raw().length == 0) {
          await updateNewStatusClient(client$.id);
        } else if (
          payments$.raw().length != 0 ||
          saleCredits$.raw().length != 0
        ) {
          await updateStatusClient(client$.id);
        }
      }),
    );
    setLoad(false);
  };

  const handleLogin = async () => {
    const response = await callEnpoint(
      getAuth(values.username, values.password),
    );
    if (response) {
      setUserSession({id: response.id, name: response.name});
      await refreshStatusClient();
      await insertUser(response);
      props.navigation.replace('MenuScreen');
    }
  };

  useEffect(() => {
    if (error.value) {
      ToastAndroid.show(
        ErrorManager(error.status),
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
      );
    }
  }, [error]);

  return (
    <>
      <LoadModal state={loading || load} />

      <StatusBar backgroundColor="#1190CB" barStyle={'ligth-content'} />
      <View style={Styles.header} />
      <KeyboardAvoidingView
        style={Styles.keyAvoiding}
        behavior={'height'}
        bounces={false}>
        <ScrollView style={Styles.scroll} showsVerticalScrollIndicator={false}>
          <View style={Styles.mainContainer}>
            <View style={Styles.body}>
              <View style={Styles.logoContainer}>
                <Image
                  style={Styles.logoImg}
                  source={require('../../assets/images/logo.png')}
                />
              </View>
              <View style={Styles.inputContainer}>
                <View style={Styles.inputModel}>
                  <TextInput
                    style={Styles.inputCobrador}
                    placeholder="Usuario"
                    keyboardType="default"
                    value={values.username}
                    onChangeText={text => changeValues('username', text)}
                  />
                </View>
                <View style={Styles.inputModel}>
                  <TextInput
                    style={Styles.inputContraseña}
                    placeholder="Contraseña"
                    keyboardType="default"
                    secureTextEntry={true}
                    value={values.password}
                    onChangeText={text => changeValues('password', text)}
                  />
                </View>
              </View>
            </View>
            {/*footer*/}
            <View style={Styles.footerContainer}>
              <TouchableOpacity
                style={Styles.btnLogin(values)}
                onPress={handleLogin}>
                <Text style={Styles.txtButton(values)}>Iniciar Sesion</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const {height} = Dimensions.get('window');
const Styles = StyleSheet.create({
  header: {flex: 0.1, backgroundColor: '#1190CB'},
  keyAvoiding: {flex: 1},
  scroll: {flex: 1},
  mainContainer: {
    height: height,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
  },
  //body
  body: {flex: 1},
  //image school
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  //input container
  inputContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  inputModel: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#E9F0FF',
    borderRadius: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  //cobrador input
  inputCobrador: {flex: 1, color: '#000000', fontSize: 16},
  //input password
  inputContraseña: {flex: 1, color: '#000000', fontSize: 16},
  //change inputs
  inputWithText: {borderWidth: 3, borderColor: '#C1D3F9'},
  inputError: {backgroundColor: '#FF8C8C', color: '#FFFFFF'},
  //message
  txtMessage: {
    color: '#FF2734',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
  },
  //footer
  footerContainer: {flex: 0.5},
  btnLogin: values => {
    const backgroundColor =
      values.username != '' && values.password != '' ? '#1190CB' : '#F3F3F3';
    return {
      height: 50,
      backgroundColor: backgroundColor,
      borderRadius: 60,
      alignItems: 'center',
      justifyContent: 'center',
    };
  },
  txtButton: values => {
    const color =
      values.username != '' && values.password != '' ? '#FFFFFF' : '#8A8A8A';
    return {fontSize: 20, color: color};
  },
});

export default LoginScreen;
