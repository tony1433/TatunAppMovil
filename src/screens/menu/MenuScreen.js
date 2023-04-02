import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import {
  getUserById,
  getProducts,
  getSectors,
  getClients,
  getInventory,
  getClient,
} from '../../services/remote/ApiServices';
import {deleteUser} from '../../services/local/LocalServicesUser';
import {insertSector} from '../../services/local/LocalServicesSectors';
import {
  insertClient,
  selectTotalClients,
  deleteClient,
} from '../../services/local/LocalServicesClients';
import {insertProduct} from '../../services/local/LocalServicesProduct';
import {insertInventory} from '../../services/local/LocalServicesInventory';
import useApiRequest from '../../hooks/useApiRequest';
import LoadingModal from '../../components/LoadModal';
import CatalogModal from './components/CatalogModal';
import OptionButton from './components/OptionButton';
import {ErrorManager} from '../../utils/ErrorManager';
import {useGlobalContext} from '../../context/GlobalContext';
import {getDate} from '../../utils/Common';

function MenuScreen(props) {
  const {userSession} = useGlobalContext();
  const [catalogModal, setCatalogModal] = useState(false);
  const [textLoad, setTextLoad] = useState('');
  const [Load, setLoad] = useState(false);
  const {loading, error, callEnpoint} = useApiRequest();

  const handleOption = async screen => {
    if (screen == 'CatalogModal') {
      setCatalogModal(true);
    } else if (screen == 'LoginScreen') {
      const response = await callEnpoint(getUserById(userSession.id));
      if (response) {
        await deleteUser();
        props.navigation.replace(screen);
      }
    } else if (screen != '') {
      props.navigation.replace(screen);
    }
  };

  const handleRefreshProducts = async () => {
    setCatalogModal(false);
    const response = await callEnpoint(getProducts());
    if (response) {
      response.map(async product => {
        await insertProduct(product);
      });
    }
  };

  const handleRefreshSectors = async () => {
    setCatalogModal(false);
    setTextLoad('Cargando informacion desde el servidor...');
    const response = await callEnpoint(getSectors(userSession.id));
    if (response) {
      setLoad(true);
      setTextLoad('Cargando informacion en la app..');
      await Promise.all(
        response.map(async sector => {
          await insertSector(sector);
        }),
      );
      setLoad(false);
      setTextLoad('');
    }
  };

  const handleRefreshClients = async () => {
    setCatalogModal(false);
    setTextLoad('Cargando informacion desde el servidor...');
    const response = await callEnpoint(getClients(userSession.id));
    if (response) {
      setLoad(true);
      setTextLoad('Cargando informacion en la app..');
      await Promise.all(
        response.map(async client => {
          await insertClient(client);
        }),
      );
      setLoad(false);
      setTextLoad('');
    }
  };

  const handleRefreshInventory = async () => {
    setCatalogModal(false);
    setTextLoad('Cargando informacion desde el servidor...');
    const response = await callEnpoint(getInventory(getDate(), userSession.id));
    if (response) {
      setLoad(true);
      setTextLoad('Cargando informacion en la app..');
      await Promise.all(
        response.map(async inventory => {
          const date$ = inventory.date.split('T');
          inventory.date = date$[0];
          await insertInventory(inventory);
        }),
      );
      setLoad(false);
      setTextLoad('');
    }
  };

  const handleDeleteClients = async () => {
    setCatalogModal(false);
    setLoad(true);
    setTextLoad('Cargando informacion en la app..');
    const clients = await selectTotalClients();
    setLoad(false);
    setTextLoad('');
    setTextLoad('Cargando informacion desde el servidor...');
    await Promise.all(
      clients.raw().map(async client => {
        const response = await callEnpoint(getClient(client.id));
        if (response) {
          await deleteClient(client.id, response[0].id_user);
        }
      }),
    );
  };

  const handleCloseCatalog = () => {
    setCatalogModal(false);
  };

  const options = [
    {option: 'Ventas', icon: 'icon_ventas', screen: 'SalesScreen'},
    {option: 'Clientes', icon: 'icon_sector', screen: 'ClientsScreen'},
    {option: 'Inventario', icon: 'icon_inventario', screen: 'InventoryScreen'},
    {option: 'Gastos', icon: 'icon_gastos', screen: 'SpentScreen'},
    {option: 'Venta contado', icon: 'icon_saldo', screen: 'SaleCashScreen'},
    {
      option: 'Actualizar catalogos',
      icon: 'icon_actualizar',
      screen: 'CatalogModal',
    },
    {
      option: 'Terminar venta',
      icon: 'icon_terminarventa',
      screen: 'FinishSaleScreen',
    },
    {
      option: 'Cerrar sesion',
      icon: 'icon_cerrasesion',
      screen: 'LoginScreen',
    },
  ];

  useEffect(() => {
    if (error.value) {
      Alert.alert('Error', ErrorManager(error.status));
    }
  }, [error]);

  return (
    <>
      <LoadingModal state={loading || Load} text={textLoad} />

      <StatusBar backgroundColor="#1190CB" barStyle={'ligth-content'} />
      <View style={Styles.header}>
        <Text style={Styles.txtUserName}>{userSession.name}</Text>
      </View>
      <FlatList
        style={Styles.listOptions}
        data={options}
        numColumns={2}
        renderItem={({item}) => {
          return (
            <OptionButton
              icon={item.icon}
              option={item.option}
              handleOption={() => handleOption(item.screen)}
            />
          );
        }}
      />
      <CatalogModal
        visible={catalogModal}
        close={handleCloseCatalog}
        handleProducts={handleRefreshProducts}
        handleSectors={handleRefreshSectors}
        handleClients={handleRefreshClients}
        handleInventory={handleRefreshInventory}
        handleDeleteClients={handleDeleteClients}
      />
    </>
  );
}

const {width} = Dimensions.get('window');
const Styles = StyleSheet.create({
  header: {
    width: width,
    height: 200,
    backgroundColor: '#1190CB',
    transform: [{scaleX: 2}],
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtUserName: {fontSize: 16, fontWeight: 'bold', color: '#FFFFFF'},
  logoImg: {
    width: 130,
    height: 150,
    resizeMode: 'contain',
  },
  listOptions: {flex: 1, paddingHorizontal: 25, marginTop: -60},
});

export default MenuScreen;
