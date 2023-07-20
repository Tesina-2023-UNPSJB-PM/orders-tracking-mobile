import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthRepository } from '../../Domain/Repository/AuthRepository';
import { useAuthModelController } from '../Hook/useAuthModelController';

type AuthViewProps = {
  route: any;
  navigation: NativeStackNavigationProp<any, 'Home'>;
  authRepository: AuthRepository;
};

export function AuthView({navigation, authRepository}: AuthViewProps) {
  const {handleClickOnLogin} = useAuthModelController(authRepository);
  const [username, setUsername] = useState('juanmenitti');
  const [password, setPassword] = useState('juan1234');

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../../Assets/Icons/tracking.png')} />

      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Nombre de Usuario"
          placeholderTextColor="#fff"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => handleClickOnLogin(navigation, username, password)}>
        <Text style={styles.innerText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C9ADA7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40,
    width: 128,
    height: 128,
  },
  inputView: {
    backgroundColor: '#4A4E69',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  textInput: {
    height: 80,
    flex: 1,
    padding: 10,
    color: '#fff',
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#22223B',
  },
  innerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
