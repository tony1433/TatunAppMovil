import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  selectClients,
  updatePositionClient,
} from '../../services/local/LocalServicesClients';
import SectorsModal from './components/SectorsModal';
import TatunAppIcon from '../../assets/icons/customIcons/TatunAppIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RecyclerListClients from './components/RecyclerListClients';
import useSearch from '../../hooks/useSearch';
import {useGlobalContext} from '../../context/GlobalContext';
import LoadModal from '../../components/LoadModal';

function ClientsScreen(props) {
  const [modalSectors, setModalSectors] = useState(false);
  const [tempClients, setTempClients] = useState([]);
  const [clients, setClients] = useState([]);
  const {search, filtered, onChangeSearch} = useSearch(
    'name_complete',
    'address',
    tempClients,
  );
  const {
    sector,
    client,
    searched,
    setSearched,
    setSector,
    setClient,
    setIndexClient,
  } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  const handleHome = () => {
    setSearched('');
    props.navigation.replace('MenuScreen');
  };

  const handlePosition = () => {
    Alert.alert(
      'Atento',
      '¿Desea volver a posicionar los clientes de este sector?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Aceptar',
          onPress: () => {
            filtered.map(async client$ => {
              await updatePositionClient(client$.item.id, client$.index);
              refreshClients(sector);
            });
          },
        },
      ],
    );
  };

  const handleModal = () => {
    setModalSectors(!modalSectors);
  };

  const handleClient = (client, index) => {
    setSearched(search);
    setClient(client);
    setIndexClient(index);
    props.navigation.replace('PaymentScreen');
  };

  const handleEdit = client => {
    setClient(client);
    props.navigation.replace('UpdateClientScreen');
  };

  const handleHistory = (client, index) => {
    setSearched(search);
    setClient(client);
    setIndexClient(index);
    props.navigation.replace('TabBarNavigator');
  };

  const handleRefresh = (client, index) => {
    setSearched(search);
    setClient(client);
    setIndexClient(index);
    props.navigation.replace('AuthorizationScreen');
  };

  const refreshClients = async sector => {
    setLoading(true);
    const clients$ = await selectClients(sector.id);
    let clientsOrder = clients$
      .raw()
      .sort((c1, c2) => c1.position - c2.position);
    const tempClients$ = [];
    clientsOrder.map((client, index) => {
      tempClients$.push({
        type: 'item',
        item: client,
        index,
        name_complete: client.name_complete,
        address: client.address,
      });
    });
    setTempClients(tempClients$);
    setClients(clientsOrder.slice(0, 10));
    setLoading(false);
  };

  const handleSector = sector => {
    setTempClients([]);
    setClient(null);
    setIndexClient(0);
    setSearched('');
    onChangeSearch('');
    setSector(sector);
    refreshClients(sector);
    setModalSectors(!modalSectors);
  };

  useEffect(() => {
    if (client) {
      tempClients.map((obj, index) => {
        if (obj.item.id == client.id) {
          setIndexClient(index);
        }
      });
    }
  }, [client]);

  useEffect(() => {
    if (sector.id != 0) {
      refreshClients(sector);
    }
  }, [sector]);

  useEffect(() => {
    if (searched != '') {
      onChangeSearch(searched);
    }
  }, [searched]);

  return (
    <>
      <LoadModal state={loading} />

      <StatusBar backgroundColor="#1190CB" barStyle={'ligth-content'} />
      <SectorsModal
        visible={modalSectors}
        handleSector={handleSector}
        closeModal={handleModal}
      />
      <View style={costumersStyle.header}>
        <View style={costumersStyle.headerLeft}>
          <TouchableOpacity
            style={costumersStyle.btnHeader}
            onPress={handleModal}>
            <Icon name="filter-variant" size={35} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={costumersStyle.headerCenter}>
          <Text style={costumersStyle.txtSector}>{sector.description}</Text>
        </View>
        <View style={costumersStyle.headerRight}>
          {search === '' && filtered.length ? (
            <TouchableOpacity
              style={costumersStyle.btnHeader}
              onPress={handlePosition}>
              <Icon name="adjust" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={costumersStyle.btnHeader}
            onPress={handleHome}>
            <TatunAppIcon name="icon_home" size={25} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={costumersStyle.container}>
        <View style={costumersStyle.filter}>
          {clients.length ? (
            <>
              <View style={costumersStyle.searchContainer}>
                <TatunAppIcon
                  name="icon_busqueda"
                  color={'#1190CB'}
                  size={25}
                />
                <TextInput
                  style={costumersStyle.inputSearch}
                  onChangeText={t => onChangeSearch(t)}
                  value={search}
                  placeholder="Buscar cliente"
                  keyboardType="default"
                />
              </View>
            </>
          ) : null}
        </View>
        <View style={costumersStyle.clientsContainer}>
          {clients.length ? (
            <RecyclerListClients
              clients={filtered}
              handleClient={handleClient}
              handleEdit={handleEdit}
              handleRefresh={handleRefresh}
              handleHistory={handleHistory}
            />
          ) : null}
        </View>
      </View>
    </>
  );
}

const costumersStyle = StyleSheet.create({
  header: {flex: 0.1, flexDirection: 'row', backgroundColor: '#1190CB'},
  headerLeft: {flex: 1, paddingHorizontal: 15},
  headerCenter: {
    flex: 2,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSector: {fontSize: 15, fontWeight: 'bold', color: '#FFFFFF'},
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
  },
  btnHeader: {
    width: 50,
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {flex: 1},
  filter: {flex: 0.2, padding: 15},
  searchContainer: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 8,
    elevation: 5,
    padding: 10,
    alignItems: 'center',
  },
  btnPosition: {
    width: 100,
    height: 30,
    backgroundColor: '#1190CB',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtPosition: {fontSize: 16, fontWeight: 'bold', color: '#FFFFFF'},
  inputSearch: {flex: 1, color: '#000000', fontSize: 16, marginLeft: 15},
  clientsContainer: {flex: 1, padding: 10},
});

export default ClientsScreen;
