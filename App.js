import { StyleSheet} from 'react-native';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import appFire from "./firebase";
import AddProduto from './components/screens/AddProduto'
import Produtos from './components/screens/Produtos'
import EditProduto from './components/screens/EditProduto';
import Login from './components/screens/Login';
import UserRegistro from './components/screens/UserRegistro'
import User from './components/screens/User';
import HeaderRight from './components/layouts/HeaderRight';
import Carrinho from './components/screens/Carrinho';
import AdministrarProdutos from './components/screens/AdministrarProdutos';
import UserPedidos from './components/screens/UserPedidos';
import TodosPedidos from './components/screens/TodosPedidos';
import UserDados from './components/screens/UserDados';
import FazerPedido from './components/screens/PazerPedido';

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['*']);

export default function App() {
  
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen
          name="Home"
          component={Produtos}
          options={({ navigation }) => ({
            title: "Produtos",
            headerStyle: {
              backgroundColor: '#4762E7',
            },
            headerTintColor: '#fff',
            headerRight: () => <HeaderRight navigation={navigation} />,
          })}

        />

        <Stack.Screen
          name="UserDados"
          component={UserDados}
          options={{ title: 'Seus dados' }}
        />

        <Stack.Screen
          name="AddProduto"
          component={AddProduto}
          options={{ title: 'Novo produto' }}
        />


        <Stack.Screen
          name="TodosPedidos"
          component={TodosPedidos}
          options={{ title: 'Todos os pedidos' }}
        />

        <Stack.Screen
          name="FazerPedido"
          component={FazerPedido}
          options={{ title: 'Fazer pedido' }}
        />

        <Stack.Screen
          name="UserPedidos"
          component={UserPedidos}
          options={{ title: 'Seus pedidos' }}
        />

        <Stack.Screen
          name="Carrinho"
          component={Carrinho}
          options={{ title: 'Carrinho' }}
        />

        <Stack.Screen
          name="AdministrarProdutos"
          component={AdministrarProdutos}
          options={{ title: 'Administrar Produtos' }}
        />

        <Stack.Screen
          name="EditProduto"
          component={EditProduto}
          options={{ title: 'Editar produto' }}
        />

        <Stack.Screen
          name="UserRegistro"
          component={UserRegistro}
          options={{ title: 'Registro' }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Login' }}
        />

        <Stack.Screen
          name="User"
          component={User}
          options={{ title: 'Configurações' }}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
