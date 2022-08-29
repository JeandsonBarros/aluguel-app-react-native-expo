import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { getDatabase, ref, child, get } from "firebase/database";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CardPedido from "../layouts/CardPedido";

function UserPedidos({navigation}) {

    const [pedidos, setPedidos] = useState([]);
    const [aviso, setAviso] = useState("")

    useEffect(() => {

        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {

                const dbRef = ref(getDatabase());
                get(child(dbRef, `pedidos/${user.uid}`)).then((snapshot) => {
                    if (snapshot.exists()) {

                        let pedidosTemp = []

                        Object.keys(snapshot.val()).forEach(item => {
                            pedidosTemp.push({ ...snapshot.val()[item], key: item })
                        })

                        setPedidos(pedidosTemp)

                    } else {
                        setAviso("Você ainda não tem pedidos")
                    }

                }).catch((error) => {
                    console.error(error);
                });

            } else {
                navigation.navigate('Login')
            }
        });

        return () => {
            setAviso({})
            setPedidos({})
        }

    }, [])

    return (
        <View>

            <Text
                style={{
                    textAlign: 'center',
                    marginTop: 5
                }}>
                {aviso}
            </Text>
            
            <ScrollView>

                {pedidos.map(item => {
                    return (<CardPedido key={item.key} pedido={item} />)
                })}

            </ScrollView>
        </View>
    );
}

export default UserPedidos;