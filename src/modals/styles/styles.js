import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const sectorsModalStyle = StyleSheet.create({
  containerModal: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sectionContainer: {flex: 2, backgroundColor: '#FFFFFF'},
  headerSections: {flex: 0.3, backgroundColor: '#1190CB'},
  logoContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  logoImg: {
    width: 200,
    height: 100,
    resizeMode: 'contain',
  },
  listContainer: {flex: 1, backgroundColor: '#E5E5E5', padding: 15},
  item: {
    height: 80,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginVertical: 8,
    elevation: 5,
    padding: 16,
    alignItems: 'center',
  },
  iconSector: {flex: 0.3},
  txtSector: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  footerSections: {
    flex: 0.1,
    backgroundColor: '#1190CB',
    padding: 15,
    justifyContent: 'center',
  },
  btnClose: {
    width: 120,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtClose: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  emptyContainer: {flex: 1},
});
