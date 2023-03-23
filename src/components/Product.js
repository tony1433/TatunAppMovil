import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import TatunAppIcon from '../assets/icons/customIcons/TatunAppIcon';

function Product(props) {
  const {product, setTotalProduct, inventory} = props;
  const [quantity, setQuantity] = useState('0');
  const [quantityInventory, setQuantityInventory] = useState('0');

  const handleMore = idProduct => {
    if (quantityInventory != '0') {
      const newQuantity = parseInt(quantity) + 1;
      if (newQuantity <= parseInt(quantityInventory)) {
        setQuantity(newQuantity);
        setTotalProduct(idProduct, newQuantity);
      } else {
        Alert.alert('Error', 'No puedes exceder la cantidad en inventario');
      }
    } else {
      Alert.alert('Error', 'No tienes producto en inventario');
    }
  };

  const handleLess = idProduct => {
    if (quantity != '0') {
      const newQuantity = parseInt(quantity) - 1;
      setQuantity(newQuantity);
      setTotalProduct(idProduct, newQuantity);
    }
  };

  useEffect(() => {
    inventory.map(obj => {
      if (obj.id_product == product.id) {
        const quantity$ = obj.quantity_input - obj.quantity_output;
        setQuantityInventory(quantity$);
      }
    });
  }, [inventory]);

  return (
    <View style={Styles.productContainer}>
      <View style={Styles.productNameContainer}>
        <View style={Styles.oval}>
          <Text style={Styles.txtProductName}>{product.description}</Text>
        </View>
      </View>
      <View style={Styles.buttonsContainer}>
        <TouchableOpacity
          style={Styles.btn}
          onPress={() => handleLess(product.id)}>
          <TatunAppIcon name={'icon_menos'} color={'#FFFFFF'} size={20} />
        </TouchableOpacity>
        <Text style={Styles.txtQuantity}>{quantity}</Text>
        <TouchableOpacity
          style={Styles.btn}
          onPress={() => handleMore(product.id)}>
          <TatunAppIcon name={'icon_mas'} color={'#FFFFFF'} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const Styles = StyleSheet.create({
  productContainer: {height: 50, flexDirection: 'row', marginVertical: 15},
  productNameContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  oval: {
    height: 50,
    borderRadius: 30,
    borderColor: '#1190CB',
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtProductName: {fontSize: 16, fontWeight: 'bold', color: '#000000'},
  buttonsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#1190CB',
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
});

export default Product;
