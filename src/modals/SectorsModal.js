//REACT
import React, {Component} from 'react';
//import components
import {Modal, View, Text, Image, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
//import styles
import {sectorsModalStyle} from './styles/styles';
//import icons
import TatunAppIcon from '../assets/icons/customIcons/TatunAppIcon';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const data = [
  {id_sector: 1, descripcion: 'Solidaridad', id_cobrador: 1},
  {id_sector: 2, descripcion: 'Solidaridad2', id_cobrador: 1},
];

class SectorsModal extends Component {
  render() {
    const {modalVisible, closeModal} = this.props;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        statusBarTranslucent={true}>
        <View style={sectorsModalStyle.containerModal}>
          <View style={sectorsModalStyle.sectionContainer}>
            <View style={sectorsModalStyle.headerSections}>
              <View style={sectorsModalStyle.logoContainer}>
                <Image
                  style={sectorsModalStyle.logoImg}
                  source={require('../assets/images/logo.png')}
                />
              </View>
            </View>
            <View style={sectorsModalStyle.listContainer}>
              <FlatList
                data={data}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      style={sectorsModalStyle.item}
                      onPress={() => closeModal(item)}>
                      <TatunAppIcon
                        name="icon_sector"
                        color={'#1190CB'}
                        size={25}
                      />
                      <Text style={sectorsModalStyle.txtSector}>
                        {item.descripcion}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <View style={sectorsModalStyle.footerSections}>
              <TouchableOpacity
                style={sectorsModalStyle.btnClose}
                onPress={() => closeModal({id_sector: 0})}>
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
}

export default SectorsModal;
