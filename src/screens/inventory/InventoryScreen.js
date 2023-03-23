import React, {useEffect, useState} from 'react';
import {StatusBar, View, FlatList, StyleSheet} from 'react-native';
import {
  selectInventory,
  deleteInventory,
} from '../../services/local/LocalServicesInventory';
import HeaderComp from '../../components/HeaderComp';
import ProductInventory from './components/ProductInventory';
import {getDate} from '../../utils/Common';

function InventoryScreen(props) {
  const [inventory, setInventory] = useState([]);

  const handleReturn = () => {
    props.navigation.replace('MenuScreen');
  };

  const refreshInventory = async () => {
    const inventory$ = await selectInventory(getDate());
    setInventory(inventory$.raw());
  };

  const deleteInventoryf = async () => {
    await deleteInventory();
  };

  useEffect(() => {
    //deleteInventoryf();
    refreshInventory();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#1190CB" barStyle={'ligth-content'} />
      <HeaderComp title={'Inventario'} handleReturn={handleReturn} />
      <View style={Styles.container}>
        <View style={Styles.listProductsContainer}>
          <FlatList
            style={Styles.list}
            data={inventory}
            contentContainerStyle={{flexGrow: 1}}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => {
              return (
                <ProductInventory
                  product={item.description}
                  quantity={item.quantity}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

export const Styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E5E5E5'},
  clientName: {
    flex: 0.1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  txtTitleInfo: {
    flex: 0.2,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  nameContainer: {
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
  txtClientName: {fontSize: 16, color: '#000000'},
  listProductsContainer: {flex: 1, justifyContent: 'center'},
  list: {flex: 1, padding: 15},
  footerList: {
    flex: 0.8,
    paddingHorizontal: 15,
  },
  btnSale: {
    height: 50,
    borderRadius: 15,
    backgroundColor: '#1190CB',
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSale: {fontSize: 16, fontWeight: 'bold', color: '#FFFFFF'},
  totalContainer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitleTotal: {fontSize: 20, fontWeight: 'bold', color: '#000000'},
  txtTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 15,
  },
});

export default InventoryScreen;
