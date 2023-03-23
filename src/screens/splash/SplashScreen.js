import React, {useEffect} from 'react';
import {StatusBar, View, Text, Image, StyleSheet} from 'react-native';
import {selectUser} from '../../services/local/LocalServicesUser';
import {useGlobalContext} from '../../context/GlobalContext';

function SplashScreen(props) {
  const {setUserSession} = useGlobalContext();

  const getSession = async () => {
    const user$ = await selectUser();
    if (user$.length != 0) {
      setTimeout(() => {
        setUserSession({id: user$.raw()[0].id, name: user$.raw()[0].name});
        props.navigation.replace('MenuScreen');
      }, 3000);
      return;
    }

    setTimeout(() => {
      props.navigation.replace('LoginScreen');
    }, 3000);
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#FFFFFF" barStyle={'dark-content'} />
      <View style={Styles.mainContainer}>
        <Image
          style={Styles.logoImg}
          source={require('../../assets/images/logo.png')}
        />
      </View>
    </>
  );
}

export const Styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
