import * as React from 'react';
import { Button, View, Text, TextInput, ImageBackground, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { get_mensajes, get_puertos, get_usuarios } from './api';

const styles = StyleSheet.create({
  input: {
    height: 40, 
    width: '80%', 
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

function LoginScreen({ navigation }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <ImageBackground source={require('./hoal.png')} style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>BIENVENIDO</Text>
        <Text>Hagamos todo por mejorar tus entregas</Text>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button
          title="Entrar"
          onPress={() => navigation.push('Home')}
        />
     <Text style={{ position: 'absolute', bottom: 50, width: '90%', alignSelf: 'center', right: '1%'}}>
  Recuerda que para hacer un registro tienes que ponerte en contacto directamente con nosotros.
</Text>

      </View>
    </ImageBackground>
  );
}

function HomeScreen({ navigation }) {
  const [mensajes, setMensajes] = useState([]);
  const [puertos, setPuertos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const mensajes = await get_mensajes();
        const puertos = await get_puertos();
        const usuarios = await get_usuarios();
        setMensajes(mensajes);
        setPuertos(puertos);
        setUsuarios(usuarios);
      } catch (error) {
        console.error('Error al obtener datos de api.py:', error);
      }
    }
    fetchData();
  }, []);

  // Muestra los datos en la pantalla
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>Mensajes:</Text>
      {mensajes.map((mensaje, index) => (
        <Text key={index}>{JSON.stringify(mensaje)}</Text>
      ))}
      <Text>Puertos:</Text>
      {puertos.map((puerto, index) => (
        <Text key={index}>{JSON.stringify(puerto)}</Text>
      ))}
      <Text>Usuarios:</Text>
      {usuarios.map((usuario, index) => (
        <Text key={index}>{JSON.stringify(usuario)}</Text>
      ))}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

