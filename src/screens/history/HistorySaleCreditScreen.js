import React, {useState, useEffect} from 'react';
import {StatusBar, View, FlatList, Text, StyleSheet} from 'react-native';
import {selectHistorySaleCredit} from '../../services/local/LocalServicesSaleCredit';
import {useGlobalContext} from '../../context/GlobalContext';
import HeaderComp from '../../components/HeaderComp';

function HistorySaleCreditScreen(props) {
  const {client} = useGlobalContext();
  const [salesCredit, setSalesCredit] = useState([]);

  const handleReturn = () => {
    props.navigation.replace('ClientsScreen');
  };

  const refreshHistorySalesCredit = async () => {
    const salesCredit$ = await selectHistorySaleCredit(client.id);
    setSalesCredit(salesCredit$.raw());
  };

  useEffect(() => {
    refreshHistorySalesCredit();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#1190CB" barStyle={'ligth-content'} />
      <HeaderComp title={'Ventas credito'} handleReturn={handleReturn} />
      <View style={Styles.container}>
        <FlatList
          style={Styles.list}
          data={salesCredit}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={Styles.item}>
              <View styles={Styles.infoContainer}>
                <Text style={Styles.txtInfo}>Cliente:</Text>
                <Text style={Styles.txtData}>{client.name_complete}</Text>
              </View>
              <View styles={Styles.infoContainer}>
                <Text style={Styles.txtInfo}>Fecha:</Text>
                <Text style={Styles.txtData}>{item.date}</Text>
              </View>
              <View styles={Styles.infoContainer}>
                <Text style={Styles.txtInfo}>Producto:</Text>
                <Text style={Styles.txtData}>{item.description}</Text>
              </View>
              <View styles={Styles.infoContainer}>
                <Text style={Styles.txtInfo}>Cantidad:</Text>
                <Text style={Styles.txtData}>{item.quantity}</Text>
              </View>
            </View>
          )}
        />
      </View>
      <View style={Styles.footerContainer} />
    </>
  );
}

const Styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E5E5E5'},
  list: {flex: 1, padding: 15},
  item: {
    height: 240,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    elevation: 15,
    padding: 15,
    marginBottom: 20,
  },
  infoContainer: {flex: 1, flexDirection: 'row', marginTop: 10},
  txtInfo: {fontSize: 20, fontWeight: 'bold', color: '#1190CB'},
  txtData: {fontSize: 20, color: '#000000', marginLeft: 10},
  footerContainer: {height: 80, backgroundColor: 'transparent'},
});

export default HistorySaleCreditScreen;
