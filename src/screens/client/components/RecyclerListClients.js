import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';
import TatunAppIcon from '../../../assets/icons/customIcons/TatunAppIcon';
import {useGlobalContext} from '../../../context/GlobalContext';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

function RecyclerListClients(props) {
  const {clients, handleClient, handleEdit, handleRefresh, handleHistory} =
    props;
  const {indexClient} = useGlobalContext();
  let dataProvider = new DataProvider((r1, r2) => {
    return r1 !== r2;
  });
  dataProvider = dataProvider.cloneWithRows(clients);

  const _layoutProvider = new LayoutProvider(
    i => {
      return dataProvider.getDataForIndex(i).type;
    },
    (type, dim) => {
      switch (type) {
        case 'item':
          dim.width = 280;
          dim.height = SCREEN_HEIGHT;
          break;
        default:
          dim.width = 0;
          dim.height = 0;
          break;
      }
    },
  );

  const rowRenderer = (type, data) => {
    switch (type) {
      case 'item':
        return (
          <View style={Styles.item(data.item.status)}>
            <View style={Styles.positionContainer}>
              <Text style={Styles.txtPosition}>{data.item.position}</Text>
            </View>
            <TouchableOpacity
              style={Styles.btnRefresh}
              onPress={() => handleRefresh(data.item, data.index)}>
              <TatunAppIcon
                name="icon_actualizar"
                color={'#1190CB'}
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.btnEdit}
              onPress={() => handleEdit(data.item, data.index)}>
              <TatunAppIcon name="icon_editar" color={'#1190CB'} size={25} />
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.btnHistory}
              onPress={() => handleHistory(data.item, data.index)}>
              <TatunAppIcon name="icon_gastos" color={'#1190CB'} size={25} />
            </TouchableOpacity>
            <View style={Styles.elementItem}>
              <TatunAppIcon
                name="icon_numerocliente"
                color={'#1190CB'}
                size={25}
              />
              <Text style={Styles.txtElement}>{data.item.id}</Text>
            </View>
            <View style={Styles.elementItem}>
              <TatunAppIcon name="icon_diaabono" color={'#1190CB'} size={25} />
              <Text style={Styles.txtElement}>{data.item.day_payment}</Text>
            </View>
            <View style={Styles.elementItem}>
              <TatunAppIcon name="icon_usuario" color={'#1190CB'} size={25} />
              <Text style={Styles.txtElement}>{data.item.name_complete}</Text>
            </View>
            <View style={Styles.elementItem}>
              <TatunAppIcon name="icon_direccion" color={'#1190CB'} size={25} />
              <Text style={Styles.txtElement}>{data.item.address}</Text>
            </View>
            <View style={Styles.elementItem}>
              <TatunAppIcon name="icon_celular" color={'#1190CB'} size={25} />
              <Text style={Styles.txtElement}>{data.item.phone}</Text>
            </View>
            <View style={Styles.elementItem}>
              <TatunAppIcon name="icon_saldo" color={'#1190CB'} size={25} />
              <Text style={Styles.txtElement}>{data.item.balance}</Text>
            </View>
            <View style={Styles.buttonItem}>
              <TouchableOpacity
                style={Styles.btnAbonar}
                onPress={() => handleClient(data.item, data.index)}>
                <Text style={Styles.txtButton}>Abonar</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
  };

  return (
    <>
      <View style={Styles.container}>
        {clients.length ? (
          <RecyclerListView
            rowRenderer={rowRenderer}
            isHorizontal={true}
            dataProvider={dataProvider}
            layoutProvider={_layoutProvider}
            initialRenderIndex={indexClient}
            showsHorizontalScrollIndicator={false}
          />
        ) : null}
      </View>
    </>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },
  item: status => {
    const borderColor = status == 2 || status == 1 ? 'green' : '#1190CB';
    const borderWidth = status == 2 || status == 1 ? 3 : 1;
    return {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      marginHorizontal: 8,
      elevation: 5,
      padding: 16,
      borderWidth: borderWidth,
      borderColor: borderColor,
    };
  },
  elementItem: {flex: 1, flexDirection: 'row'},
  txtElement: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#040505',
    textAlign: 'center',
  },
  buttonItem: {
    flex: 1,
    paddingHorizontal: 15,
  },
  btnAbonar: {
    height: 50,
    backgroundColor: '#1190CB',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtButton: {fontSize: 16, fontWeight: 'bold', color: '#FFFFFF'},
  positionContainer: {
    width: 40,
    height: 40,
    zIndex: 1,
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtPosition: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1190CB',
  },
  btnRefresh: {
    width: 40,
    height: 40,
    zIndex: 1,
    position: 'absolute',
    top: 50,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEdit: {
    width: 40,
    height: 40,
    zIndex: 1,
    position: 'absolute',
    top: 90,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnHistory: {
    width: 40,
    height: 40,
    zIndex: 1,
    position: 'absolute',
    top: 130,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RecyclerListClients;
