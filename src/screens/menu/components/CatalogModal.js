import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function CatalogModal(props) {
  const {
    visible,
    close,
    handleProducts,
    handleSectors,
    handleClients,
    handleInventory,
    handleDeleteClients,
  } = props;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      statusBarTranslucent={true}>
      <View style={Styles.containerModal}>
        <View style={Styles.centerContainer}>
          <View style={Styles.headerContainer}>
            <TouchableOpacity style={Styles.iconClose} onPress={close}>
              <Icon name="close-thick" size={40} color="#1190CB" />
            </TouchableOpacity>
          </View>
          <View style={Styles.optionContainer}>
            <TouchableOpacity
              style={Styles.btnOption}
              onPress={handleInventory}>
              <Text style={Styles.txtOption}>Actualizar inventario</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.btnOption} onPress={handleProducts}>
              <Text style={Styles.txtOption}>Actualizar productos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.btnOption} onPress={handleSectors}>
              <Text style={Styles.txtOption}>Actualizar sectores</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.btnOption} onPress={handleClients}>
              <Text style={Styles.txtOption}>Actualizar clientes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.btnOption}
              onPress={handleDeleteClients}>
              <Text style={Styles.txtOption}>Eliminar clientes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export const Styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContainer: {
    width: 350,
    height: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  headerContainer: {flex: 0.3},
  iconClose: {margin: 10, alignSelf: 'flex-end'},
  optionContainer: {flex: 1, padding: 15, justifyContent: 'center'},
  btnOption: {
    height: 50,
    backgroundColor: '#1190CB',
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtOption: {fontSize: 16, fontWeight: 'bold', color: '#FFFFFF'},
});

export default CatalogModal;
