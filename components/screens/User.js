import { View, Text, TouchableOpacity, } from "react-native";
import { getAuth, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { getDatabase, get, child, ref } from 'firebase/database'

function User({ navigation, route }) {

    const [adm, isAdm] = useState(true)
    const uid = route.params['uid']

    useEffect(() => {

        // Descomente essa parte do código caso queira ter controle de quem é e de quem não adm.
        /* get(child(ref(getDatabase()), `administradores/${uid}`)).then(response => {

            if (response.exists())
                isAdm(true)
        })

        return()=>{
            isAdm({})
        } */

    }, [])

    // Função para o usuário sair
    function logout() {

        const auth = getAuth();

        signOut(auth).then(() => {
            navigation.navigate("Home")
        }).catch((error) => {
            alert("Erro ao sair")
        });

    }

    return (
        <View>

            <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => navigation.navigate("UserPedidos", { uid })}
            >
                <Text style={{ fontSize: 20 }} >Seus pedidos</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("UserDados", { uid })}
                style={{ margin: 10 }}

            >
                <Text style={{ fontSize: 20 }} >Editar dados da conta</Text>
            </TouchableOpacity>

           {adm && <>
                <TouchableOpacity
                    style={{ margin: 10 }}
                    onPress={() => navigation.navigate("TodosPedidos", { uid })}
                >
                    <Text style={{ fontSize: 20 }} >Pedidos de aluguel (Administrador)</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ margin: 10 }}
                    onPress={() => navigation.navigate("AdministrarProdutos")}
                >
                    <Text style={{ fontSize: 20 }} >Gerenciar produtos (Administrador)</Text>
                </TouchableOpacity>
            </> }

            <TouchableOpacity
                onPress={logout}
                style={{
                    margin: 10,
                    borderTopWidth: 0.5,
                    borderColor: 'purple'
                }}
            >
                <Text style={{ fontSize: 20 }} >Sair</Text>
            </TouchableOpacity>

        </View>
    );
}

export default User;