import { View, Text, ScrollView, StyleSheet } from "react-native";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { useEffect, useState } from "react";
import CardPedido from "../layouts/CardPedido";


function TodosPedidos() {

    const [pedidos, setPedidos] = useState([])
    const dbRef = ref(getDatabase());
    const [aviso, setAviso] = useState("")

    useEffect(() => {
        getPedidos()

    }, [])

    // Obtem todos os pedidos de todos usuários, essa tela é apenas para AMD
    async function getPedidos() {

        try {

            const snapshot = await get(child(dbRef, `pedidos/`))

            if (snapshot.exists()) {

                let todosPedidos = await Promise.all(

                    Object.keys(snapshot.val()).map(async item => {

                        let temp = { pedidos: { ...snapshot.val()[item] } }
                        const user = await get(child(dbRef, 'users/' + item + '/dados'))

                        temp['user_name'] = user.val().nome
                        temp['user_uid'] = item

                        return temp

                    })
                );

                setPedidos(todosPedidos);

            } else {
                setAviso("Ainda não tem pedidos")
            }

        } catch (error) {
            console.error(error);
        }

    }

    
    function listaPedidos(item) {
        let pedidosTemp = [];

        Object.keys(item).forEach(key => {
            pedidosTemp.push({ ...item[key], key: key })

        })

        return pedidosTemp
    }

    async function funcaoStatus(pedido, isAprovado) {

        try {
            set(ref(getDatabase(), `pedidos/${pedido.user_uid}/${pedido.key}`), { ...pedido, status: isAprovado })

            getPedidos()
        } catch (error) {
            console.log(error);
        }

    }

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

                {pedidos.map((item, index) => {
                    return (
                        <View
                            key={index}
                            style={styles.viewPedidos}>

                            <Text style={{ fontSize: 20, margin: 10 }} >{item.user_name}</Text>

                            {listaPedidos(item.pedidos).map(produtos => {
                                return (<CardPedido
                                    key={produtos.key}
                                    pedido={{ ...produtos, user_uid: item.user_uid }}
                                    funcaoStatus={funcaoStatus}
                                />)
                            })}

                        </View>)
                })}

            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    viewPedidos: {
        backgroundColor: '#f0f0f0',
        shadowColor: '#000',
        elevation: 5,
        margin: 10,
        borderRadius: 10
    }

})

export default TodosPedidos;