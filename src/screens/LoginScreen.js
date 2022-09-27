import React, {Component} from 'react';
import {
  StatusBar,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {loginStyle} from './styles/styles';
//import connections and services
import {axiosGet} from '../services/Axios/AxiosDefault';
import {InsertQuery, SelectQuery} from '../services/SQLite/Db';

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      cobrador: '',
      contraseña: '',
    };
  }

  //methods
  setCobrador = t => {
    this.setState({cobrador: t});
  };

  setContraseña = t => {
    this.setState({contraseña: t});
  };

  goMenu = () => {
    SelectQuery();
    this.props.navigation.replace('MenuScreen');
  };

  componentDidMount() {
    axiosGet('/cobradores').then(r => {
      setTimeout(() => {
        if (r.status == 200) {
          console.log('exito', r.value);
        } else if (r.status >= 401 && r.status <= 500) {
          console.log('error de servidor: ', r.status);
        } else if (r.status == -1) {
          console.log('error de internet: ', r.status);
        }
      }, 1000);
    });
  }

  render() {
    const {cobrador, contraseña} = this.state;
    return (
      <>
        <StatusBar backgroundColor="#1190CB" barStyle={'ligth-content'} />
        <View style={loginStyle.header} />
        <KeyboardAvoidingView
          style={loginStyle.keyAvoiding}
          behavior={'height'}
          bounces={false}>
          <ScrollView
            style={loginStyle.scroll}
            showsVerticalScrollIndicator={false}>
            <View style={loginStyle.container}>
              <View style={loginStyle.body}>
                <View style={loginStyle.logoContainer}>
                  <Image
                    style={loginStyle.logoImg}
                    source={require('../assets/images/logo.png')}
                  />
                </View>
                <View style={loginStyle.inputContainer}>
                  <View style={loginStyle.inputModel}>
                    <TextInput
                      style={loginStyle.inputCobrador}
                      onChangeText={t => this.setCobrador(t)}
                      value={this.state.cobrador}
                      placeholder="Cobrador"
                      keyboardType="default"
                    />
                  </View>
                  <View style={loginStyle.inputModel}>
                    <TextInput
                      style={loginStyle.inputContraseña}
                      onChangeText={t => this.setContraseña(t)}
                      value={this.state.contraseña}
                      placeholder="Contraseña"
                      keyboardType="default"
                    />
                  </View>
                </View>
              </View>
              {/*footer*/}
              <View style={loginStyle.footerContainer}>
                <TouchableOpacity
                  style={[
                    loginStyle.btnLogin,
                    {
                      backgroundColor:
                        cobrador != '' && contraseña != ''
                          ? '#1190CB'
                          : '#F3F3F3',
                    },
                  ]}
                  onPress={this.goMenu}>
                  <Text
                    style={[
                      loginStyle.txtButton,
                      {
                        color:
                          cobrador != '' && contraseña != ''
                            ? '#FFFFFF'
                            : '#8A8A8A',
                      },
                    ]}>
                    Iniciar Sesion
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}

export default LoginScreen;
