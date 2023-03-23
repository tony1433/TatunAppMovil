import React from 'react';
import {View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
//import icons
import TatunAppIcon from '../assets/icons/customIcons/TatunAppIcon';

function HeaderTabComp(props) {
  const handleReturn = () => {
    props.navigation.navigate('CostumersScreen');
  };

  return (
    <View style={Styles.container}>
      <TouchableOpacity onPress={handleReturn}>
        <TatunAppIcon name="icon_regresar" color={'#FFFFFF'} size={25} />
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 0.1,
    backgroundColor: '#1190CB',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
});

export default HeaderTabComp;
