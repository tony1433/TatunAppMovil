import React, {useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

const NUM_ITEMS = 10;
function getColor(i) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = i * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

const initialData = [...Array(NUM_ITEMS)].map((d, index) => {
  const backgroundColor = getColor(index);
  return {
    key: `item-${index}`,
    label: String(index) + '',
    height: 100,
    width: 60 + Math.random() * 40,
    backgroundColor,
  };
});

export default function CostumersScreen() {
  const [data, setData] = useState(initialData);

  const renderItem = ({item, drag, isActive}) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={[
            styles.rowItem,
            {backgroundColor: isActive ? 'red' : item.backgroundColor},
          ]}>
          <Text style={styles.text}>{item.label}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <DraggableFlatList
      data={data}
      onDragEnd={({data}) => setData(data)}
      keyExtractor={item => item.key}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

/*import React, {Component} from 'react';
//import components
import {
  StatusBar,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import SectorsModal from '../modals/SectorsModal';
//import styles
import {costumersStyle} from './styles/styles';
//import icons
import TatunAppIcon from '../assets/icons/customIcons/TatunAppIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DATA = [
  {
    id_cliente: 1,
    dia_abono: 'Sabado',
    nombre_completo: 'Marco Antonio Rios Garcia',
    direccion: 'Ejemplo 1',
    celular: '6622248430',
    saldo: 100,
    estatus: 0,
    posicion: 0,
    id_sector: 1,
    id_cobrador: 1,
  },
  {
    id_cliente: 2,
    dia_abono: 'Sabado',
    nombre_completo: 'Ejemplo2',
    direccion: 'Ejemplo 2',
    celular: '6622248430',
    saldo: 100,
    estatus: 0,
    posicion: 0,
    id_sector: 1,
    id_cobrador: 1,
  },
  {
    id_cliente: 3,
    dia_abono: 'Sabado',
    nombre_completo: 'Ejemplo2',
    direccion: 'Ejemplo 2',
    celular: '6622248430',
    saldo: 100,
    estatus: 0,
    posicion: 0,
    id_sector: 2,
    id_cobrador: 1,
  },
];

class CostumersScreen extends Component {
  state = {
    sectorsVisible: false,
    sector: {id_sector: 0, descripcion: 'Selecciona un sector'},
    data: DATA,
  };

  goMenu = () => {
    this.props.navigation.replace('MenuScreen');
  };

  setSectorsModalVisible = sectorSelect => {
    this.setState(
      {
        sectorsVisible: !this.state.sectorsVisible,
      },
      () => {
        if (sectorSelect.id_sector != 0) {
          const temp = DATA.filter(d => d.id_sector == sectorSelect.id_sector);
          this.setState({data: temp, sector: sectorSelect});
        }
      },
    );
  };

  render() {
    const {sectorsVisible, sector, data} = this.state;
    return (
      <>
        <StatusBar backgroundColor="#1190CB" barStyle={'ligth-content'} />
        <SectorsModal
          modalVisible={sectorsVisible}
          closeModal={this.setSectorsModalVisible}
        />
        <View style={costumersStyle.header}>
          <View style={costumersStyle.headerLeft}>
            <TouchableOpacity
              style={costumersStyle.btnHeader}
              onPress={() => this.setSectorsModalVisible(sector)}>
              <Icon name="filter-variant" size={35} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={costumersStyle.headerCenter}>
            <Text style={costumersStyle.txtSector}>{sector.descripcion}</Text>
          </View>
          <View style={costumersStyle.headerRight}>
            <TouchableOpacity
              style={costumersStyle.btnHeader}
              onPress={this.goMenu}>
              <TatunAppIcon name="icon_home" size={25} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={costumersStyle.container}>
          <KeyboardAvoidingView
            style={costumersStyle.keyAvoiding}
            behavior={'height'}
            bounces={false}>
            <View style={costumersStyle.filter}>
              <View style={costumersStyle.searchContainer}>
                <TatunAppIcon
                  name="icon_busqueda"
                  color={'#1190CB'}
                  size={25}
                />
                <TextInput
                  style={costumersStyle.inputSearch}
                  //onChangeText={t => this.setCobrador(t)}
                  //value={this.state.value}
                  placeholder="Buscar cliente"
                  keyboardType="default"
                />
              </View>
            </View>
          </KeyboardAvoidingView>
          <View style={costumersStyle.costumerContainer}>
            <FlatList
              data={data}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View style={costumersStyle.item}>
                  <View style={costumersStyle.elementItem}>
                    <TatunAppIcon
                      name="icon_numerocliente"
                      color={'#1190CB'}
                      size={25}
                    />
                    <Text style={costumersStyle.txtElement}>
                      {item.id_cliente}
                    </Text>
                  </View>
                  <View style={costumersStyle.elementItem}>
                    <TatunAppIcon
                      name="icon_diaabono"
                      color={'#1190CB'}
                      size={25}
                    />
                    <Text style={costumersStyle.txtElement}>
                      {item.dia_abono}
                    </Text>
                  </View>
                  <View style={costumersStyle.elementItem}>
                    <TatunAppIcon
                      name="icon_usuario"
                      color={'#1190CB'}
                      size={25}
                    />
                    <Text style={costumersStyle.txtElement}>
                      {item.nombre_completo}
                    </Text>
                  </View>
                  <View style={costumersStyle.elementItem}>
                    <TatunAppIcon
                      name="icon_direccion"
                      color={'#1190CB'}
                      size={25}
                    />
                    <Text style={costumersStyle.txtElement}>
                      {item.direccion}
                    </Text>
                  </View>
                  <View style={costumersStyle.elementItem}>
                    <TatunAppIcon
                      name="icon_celular"
                      color={'#1190CB'}
                      size={25}
                    />
                    <Text style={costumersStyle.txtElement}>
                      {item.celular}
                    </Text>
                  </View>
                  <View style={costumersStyle.elementItem}>
                    <TatunAppIcon
                      name="icon_saldo"
                      color={'#1190CB'}
                      size={25}
                    />
                    <Text style={costumersStyle.txtElement}>{item.saldo}</Text>
                  </View>
                  <View style={costumersStyle.buttonItem}>
                    <TouchableOpacity
                      style={costumersStyle.btnAbonar}
                      onPress={() => {
                        this.props.navigation.replace('TabBarNavigator', {
                          costumer: item,
                        });
                      }}>
                      <Text style={costumersStyle.txtButton}>Abonar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          </View>
        </View>
      </>
    );
  }
}

export default CostumersScreen;*/
