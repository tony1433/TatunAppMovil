import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {insertSale_credit} from '../../services/local/LocalServicesSaleCredit';
import {
  updateBalanceClient,
  selectBalanceClient,
} from '../../services/local/LocalServicesClients';
import {
  selectAllInventory,
  updateOutputInventory,
} from '../../services/local/LocalServicesInventory';
import HeaderComp from '../../components/HeaderComp';
import {useGlobalContext} from '../../context/GlobalContext';
import {selectProducts} from '../../services/local/LocalServicesProduct';
import Product from '../../components/Product';
import {getDate, getHour} from '../../utils/Common';

let saleProducts$ = [];

function SaleCreditScreen(props) {
  const {client, userSession} = useGlobalContext();
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [total, setTotal] = useState('0');

  const handleReturn = () => {
    props.navigation.replace('ClientsScreen');
  };

  const refreshProducts = async () => {
    const products$ = await selectProducts();
    const inventory$ = await selectAllInventory(getDate());
    setProducts(products$.raw());
    setInventory(inventory$.raw());
  };

  const handleSale = async () => {
    if (total != '0') {
      const saleCredit = [];
      saleProducts$.map(async sale => {
        saleCredit.push({
          date: getDate(),
          hour: getHour(),
          quantity: sale.quantity,
          id_product: sale.id_product,
          id_client: client.id,
          id_user: userSession.id,
        });
        //Actualizar inventario
        await updateOutputInventory(sale.quantity, getDate(), sale.id_product);
      });
      //guardar venta
      saleCredit.map(async sale => {
        await insertSale_credit(sale);
      });
      //cambiar saldo cliente
      const balanceClient = await selectBalanceClient(client.id);
      const newBalance = balanceClient.raw()[0].balance + total;
      await updateBalanceClient(client.id, newBalance);
      //navegar a la pantalla anterior
      props.navigation.replace('ClientsScreen');
    } else {
      Alert.alert(
        'Error',
        'Selecciona los productos antes de terminar la venta',
      );
    }
  };

  const handleCancel = () => {
    props.navigation.replace('ClientsScreen');
  };

  const calculateTotal = () => {
    let total$ = 0;
    saleProducts$.map(sale => {
      products.map(product => {
        if (product.id == sale.id_product) {
          const totalProduct$ = sale.quantity * product.price;
          total$ = total$ + totalProduct$;
        }
      });
    });
    setTotal(total$);
  };

  const setTotalProduct = (id_product, quantity) => {
    if (!saleProducts$.some(t => t.id_product == id_product)) {
      saleProducts$.push({id_product, quantity});
    } else {
      saleProducts$.map(sale => {
        if (sale.id_product == id_product) {
          sale.quantity = quantity;
        }
      });

      const newSaleProduts = saleProducts$.filter(s => s.quantity !== 0);
      saleProducts$ = newSaleProduts;
    }

    calculateTotal();
  };

  useEffect(() => {
    saleProducts$ = [];
    refreshProducts();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#1190CB" barStyle={'ligth-content'} />
      <HeaderComp title={'Venta credito'} handleReturn={handleReturn} />
      <View style={Styles.container}>
        <View style={Styles.clientName}>
          <Text style={Styles.txtTitleInfo}>Cliente:</Text>
          <View style={Styles.nameContainer}>
            <Text style={Styles.txtClientName}>{client.name_complete}</Text>
          </View>
        </View>
        <View style={Styles.listProductsContainer}>
          {products.length ? (
            <FlatList
              style={Styles.list}
              contentContainerStyle={{flexGrow: 1}}
              data={products}
              showsHorizontalScrollIndicator={false}
              renderItem={({item, index}) => {
                return (
                  <Product
                    product={item}
                    setTotalProduct={setTotalProduct}
                    inventory={inventory}
                  />
                );
              }}
              listFooterComponentStyle={{flexGrow: 1}}
              ListFooterComponent={() => {
                return (
                  <View style={Styles.footerList}>
                    <View style={Styles.totalContainer}>
                      <Text style={Styles.txtTitleTotal}>Total:</Text>
                      <Text style={Styles.txtTotal}>{total}</Text>
                    </View>
                    <TouchableOpacity
                      style={Styles.btnSale}
                      onPress={handleSale}>
                      <Text style={Styles.txtSale}>Vender</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={Styles.btnSale}
                      onPress={handleCancel}>
                      <Text style={Styles.txtSale}>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          ) : null}
        </View>
      </View>
    </>
  );
}

const Styles = StyleSheet.create({
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
  listProductsContainer: {flex: 1},
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

export default SaleCreditScreen;
