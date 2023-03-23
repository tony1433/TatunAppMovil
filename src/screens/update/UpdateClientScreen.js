import React, {useState} from 'react';
import {
  View,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {
  selectClients,
  updateClient,
  updatePositionClient,
} from '../../services/local/LocalServicesClients';
import HeaderComp from '../../components/HeaderComp';
import {useGlobalContext} from '../../context/GlobalContext';
import LoadModal from '../../components/LoadModal';

function UpdateClientScreen(props) {
  const {client, sector, setIndexClient} = useGlobalContext();
  const [phone, setPhone] = useState(client.phone.toString());
  const [position, setPosition] = useState(client.position.toString());
  const [dayPayment, setDayPayment] = useState(client.day_payment);
  const [loading, setLoading] = useState(false);

  const handleReturn = () => {
    props.navigation.replace('ClientsScreen');
  };

  const editPositionClients = async edit_data => {
    const position$ = parseInt(position);

    if (position$ != client.position) {
      setLoading(true);
      const clients$ = await selectClients(sector.id);
      if (position$ > client.position) {
        clients$.raw().map(async client$ => {
          if (client$.id == client.id) {
          } else if (client$.position == position$) {
            let newPosition = client$.position - 1;
            await updatePositionClient(client$.id, newPosition);
          } else if (
            client$.position > client.position &&
            client$.position < position$
          ) {
            let newPosition = client$.position - 1;
            await updatePositionClient(client$.id, newPosition);
          }
        });
      } else if (position$ < client.position) {
        clients$.raw().map(async client$ => {
          if (client$.id == client.id) {
            console.log('No se edita el cliente seleccionado');
          } else if (client$.position == position$) {
            let newPosition = client$.position + 1;
            await updatePositionClient(client$.id, newPosition);
          } else if (
            client$.position < client.position &&
            client$.position > position$
          ) {
            let newPosition = client$.position + 1;
            await updatePositionClient(client$.id, newPosition);
          }
        });
      }
    }

    await updateClient(client.id, edit_data);
    setLoading(false);
  };

  const handleEditClient = async () => {
    const edit_data = {
      day_payment: dayPayment,
      phone: phone,
      position: position,
    };
    const clients$ = await selectClients(sector.id);
    if (position > clients$.raw().length || position < 0) {
      Alert.alert(
        'Error',
        'La posicion no puede superar al numero de clientes o ser menor a 0',
        [{text: 'Aceptar', onPress: () => console.log('OK Pressed')}],
      );
    } else {
      await editPositionClients(edit_data);
      setIndexClient(parseInt(position));
      props.navigation.replace('ClientsScreen');
    }
  };

  return (
    <>
      <LoadModal state={loading} />

      <StatusBar backgroundColor="#1190CB" barStyle={'ligth-content'} />
      <HeaderComp title={'Actualizar cliente'} handleReturn={handleReturn} />
      <View style={Styles.container}>
        <View style={Styles.dataContainer}>
          <View style={Styles.elementContainer}>
            <Text style={Styles.txtElementTitle}>Cliente:</Text>
            <View style={Styles.infoElement}>
              <Text style={Styles.txtElement}>{client.name_complete}</Text>
            </View>
          </View>
          <View style={Styles.elementContainer}>
            <Text style={Styles.txtElementTitle}>Dia abono:</Text>
            <TextInput
              style={Styles.inputElement}
              placeholder="Digita telefono"
              keyboardType={'default'}
              onChangeText={setDayPayment}
              value={dayPayment}
            />
          </View>
          <View style={Styles.elementContainer}>
            <Text style={Styles.txtElementTitle}>Telefono:</Text>
            <TextInput
              style={Styles.inputElement}
              placeholder="Digita telefono"
              keyboardType={'numeric'}
              maxLength={10}
              onChangeText={setPhone}
              value={phone}
            />
          </View>
          <View style={Styles.elementContainer}>
            <Text style={Styles.txtElementTitle}>Posicion:</Text>
            <TextInput
              style={Styles.inputElement}
              onChangeText={setPosition}
              value={position}
              placeholder="Digita posicion"
              keyboardType={'numeric'}
            />
          </View>
          <View style={Styles.btnContainer}>
            <TouchableOpacity
              style={Styles.btnAction}
              onPress={handleEditClient}>
              <Text style={Styles.txtBtnAction}>Editar cliente</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

export const Styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#E5E5E5', justifyContent: 'center'},
  dataContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  elementContainer: {
    height: 100,
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'center',
  },
  txtElementTitle: {
    flex: 0.4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
  },
  infoElement: {
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
  txtElement: {fontSize: 16, color: '#000000'},
  inputElement: {
    flex: 1,
    color: '#000000',
    fontSize: 16,
    backgroundColor: '#E9F0FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1190CB',
    marginLeft: 15,
    textAlign: 'center',
  },
  btnContainer: {flex: 0.4},
  btnAction: {
    height: 50,
    backgroundColor: '#1190CB',
    borderRadius: 60,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBtnAction: {fontSize: 16, fontWeight: 'bold', color: '#FFFFFF'},
});

export default UpdateClientScreen;
