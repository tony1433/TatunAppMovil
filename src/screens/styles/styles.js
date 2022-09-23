import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const loginStyle = StyleSheet.create({
  header: {flex: 0.1, backgroundColor: '#1190CB'},
  keyAvoiding: {flex: 1},
  scroll: {flex: 1},
  container: {
    height: height,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
  },
  //body
  body: {flex: 1},
  //image school
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImg: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  //input container
  inputContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  inputModel: {
    height: 50,
    flexDirection: 'row',
    backgroundColor: '#E9F0FF',
    borderRadius: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  //cobrador input
  inputCobrador: {flex: 1, color: '#000000', fontSize: 16},
  //input password
  inputContraseña: {flex: 1, color: '#000000', fontSize: 16},
  //change inputs
  inputWithText: {borderWidth: 3, borderColor: '#C1D3F9'},
  inputError: {backgroundColor: '#FF8C8C', color: '#FFFFFF'},
  //message
  txtMessage: {
    color: '#FF2734',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 5,
  },
  //footer
  footerContainer: {flex: 0.5},
  btnLogin: {
    height: 50,
    backgroundColor: '#FFAD31',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtButton: {fontSize: 20, color: '#FFFFFF'},
});

export const menuStyle = StyleSheet.create({
  header: {
    width: width,
    height: 200,
    backgroundColor: '#1190CB',
    transform: [{scaleX: 2}],
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    overflow: 'hidden',
  },
  Container: {
    flex: 1,
    paddingHorizontal: 25,
    marginTop: -60,
  },
  sectionContainer: {flex: 1, flexDirection: 'row', marginBottom: 15},
  centerContainer: {flex: 1, flexDirection: 'row', marginBottom: 15},
  bottomContainer: {flex: 1, flexDirection: 'row', marginBottom: 15},
  btnMenuLeft: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnMenuRight: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    marginLeft: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textOptionMenu: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
  },
});

export const costumersStyle = StyleSheet.create({
  keyAvoiding: {flex: 0.2},
  scroll: {flex: 1},
  header: {flex: 0.1, flexDirection: 'row', backgroundColor: '#1190CB'},
  headerLeft: {flex: 1, paddingHorizontal: 15},
  headerCenter: {
    flex: 2,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtSector: {fontSize: 15, fontWeight: 'bold', color: '#FFFFFF'},
  headerRight: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'flex-end',
  },
  btnHeader: {
    width: 50,
    height: 50,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {flex: 1},
  filter: {flex: 0.2, padding: 15},
  searchContainer: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 8,
    elevation: 5,
    padding: 10,
    alignItems: 'center',
  },
  inputSearch: {flex: 1, color: '#000000', fontSize: 16, marginLeft: 15},
  costumerContainer: {flex: 1, padding: 20},
  item: {
    width: 250,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 8,
    elevation: 5,
    padding: 16,
    borderWidth: 1,
    borderColor: '#1190CB',
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
});

export const paymentStyle = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E5E5E5', justifyContent: 'center'},
  titleContainer: {flex: 0.1, padding: 15},
  txtTitle: {fontSize: 20, fontWeight: 'bold', color: '#1190CB'},
  payContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  elementPay: {
    height: 100,
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  txtElementPay: {
    flex: 0.4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  infoPay: {
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
  txtPay: {fontSize: 16, color: '#000000'},
  inputPay: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
    backgroundColor: '#E9F0FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1190CB',
    marginLeft: 15,
  },
  btnContainer: {flex: 0.4},
  btnPayment: {
    height: 50,
    backgroundColor: '#1190CB',
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBtnPayment: {fontSize: 16, fontWeight: 'bold', color: '#FFFFFF'},
});

export const saleCreditStyle = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E5E5E5'},
  titleContainer: {flex: 0.1, padding: 15},
  txtTitle: {fontSize: 20, fontWeight: 'bold', color: '#1190CB'},
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
});

export const historyStyle = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E5E5E5'},
  titleContainer: {flex: 0.1, padding: 15},
  txtTitle: {fontSize: 20, fontWeight: 'bold', color: '#1190CB'},
});
