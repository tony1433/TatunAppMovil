import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function ProductInventory(props) {
  const {product, quantity} = props;

  return (
    <View style={Styles.productContainer}>
      <View style={Styles.productNameContainer}>
        <View style={Styles.oval}>
          <Text style={Styles.txtProductName}>{product}</Text>
        </View>
      </View>
      <View style={Styles.quantityContainer}>
        <Text style={Styles.txtQuantity}>{quantity}</Text>
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
  quantityContainer: {
    flex: 1,
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

export default ProductInventory;
