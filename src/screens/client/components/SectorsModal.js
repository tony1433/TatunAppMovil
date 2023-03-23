import React, {useEffect, useReducer, useState} from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {selectSectors} from '../../../services/local/LocalServicesSectors';
import TatunAppIcon from '../../../assets/icons/customIcons/TatunAppIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import GlobalContext, {useGlobalContext} from '../../../context/GlobalContext';

function SectorsModal(props) {
  const {visible, handleSector, closeModal} = props;
  const [loading, setLoading] = useState(false);
  const [sectors, setSectors] = useState([]);
  const {userSession} = useGlobalContext();

  const refreshSectors = async () => {
    setLoading(true);
    const sectors$ = await selectSectors(userSession.id);
    setSectors(sectors$.raw());
    setLoading(false);
  };

  useEffect(() => {
    refreshSectors();
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}>
      <View style={sectorsModalStyle.containerModal}>
        <View style={sectorsModalStyle.sectionContainer}>
          <View style={sectorsModalStyle.headerSections}>
            <View style={sectorsModalStyle.logoContainer}>
              <Image
                style={sectorsModalStyle.logoImg}
                source={require('../../../assets/images/logo.png')}
              />
            </View>
          </View>

          {loading ? (
            <View style={sectorsModalStyle.loadingContainer}>
              <Text style={sectorsModalStyle.item}>cargando....</Text>
            </View>
          ) : (
            <View style={sectorsModalStyle.listContainer}>
              <FlatList
                data={sectors}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={sectorsModalStyle.item}
                      onPress={() => handleSector(item)}>
                      <TatunAppIcon
                        name="icon_sector"
                        color={'#1190CB'}
                        size={25}
                      />
                      <Text style={sectorsModalStyle.txtSector}>
                        {item.description}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          )}

          <View style={sectorsModalStyle.footerSections}>
            <TouchableOpacity
              style={sectorsModalStyle.btnClose}
              onPress={closeModal}>
              <Icon name="close-thick" size={40} color="#FFFFFF" />
              <Text style={sectorsModalStyle.txtClose}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={sectorsModalStyle.emptyContainer} />
      </View>
    </Modal>
  );
}

export const sectorsModalStyle = StyleSheet.create({
  containerModal: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sectionContainer: {flex: 2, backgroundColor: '#FFFFFF'},
  headerSections: {flex: 0.3, backgroundColor: '#1190CB'},
  logoContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  logoImg: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  loadingContainer: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  listContainer: {flex: 1, backgroundColor: '#E5E5E5', padding: 15},
  item: {
    height: 80,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 8,
    elevation: 5,
    padding: 16,
    alignItems: 'center',
  },
  iconSector: {flex: 0.3},
  txtSector: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  footerSections: {
    flex: 0.1,
    backgroundColor: '#1190CB',
    padding: 15,
    justifyContent: 'center',
  },
  btnClose: {
    width: 120,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtClose: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  emptyContainer: {flex: 1},
});

export default SectorsModal;
