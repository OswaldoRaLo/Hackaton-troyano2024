import * as React from 'react';
import { Button, View, Text, TextInput, ImageBackground, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';

const styles = StyleSheet.create({
  input: {
    height: 40, // Ajusta esto para cambiar la altura
    width: '80%', // Ajusta esto para cambiar el ancho
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
  const [points, setPoints] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await axios.post('http://127.0.0.1:5000', {
        lat1: 40.7128,
        lon1: -74.0060,
        lat2: 34.0522,
        lon2: -118.2437,
        num_points: 10 
        
      });

      setPoints(result.data);
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <MapView style={{ width: '100%', height: '80%' }}>
        {points.map((point, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: point[0], longitude: point[1] }}
          />
        ))}
      </MapView>
    </View>
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
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
