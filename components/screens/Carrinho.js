import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from "react-native";
import ListaDeProdutos from "../layouts/ListaDeProdutos";
import React, { useState, useEffect } from 'react';
import { get, child, ref, getDatabase, remove, set, push } from 'firebase/database'

function Carrinho({ navigation, route }) {

    const uid = route.params['uid'];

    const [produtos, setProdutos] = useState([])
    const [loading, setLoading] = useState(true)
    const [aviso, setAviso] = useState("")
    const [total, setTotal] = useState(0.0)

    useEffect(() => {

        getProdutos()

        return () => {
            setProdutos([])
            setAviso("")
            setLoading({})
            setTotal({})
        }

    }, [])

    // Obtém os produtos no carrinho do cliente logado
    function getProdutos() {

        const dbRef = ref(getDatabase());

        get(child(dbRef, `users/${uid}/carrinho`)).then((snapshot) => {

            let produtosTemp = []
            let totalTemp = 0

            if (snapshot.exists()) {

                Object.keys(snapshot.val()).forEach(item => {
                    produtosTemp.push({ ...snapshot.val()[item], key: item })

                    totalTemp += parseFloat(snapshot.val()[item]['preco']);
                })

            } else {
                setAviso("Você ainda não possui produtos no carrinho");
            }

            setTotal(totalTemp)
            setProdutos(produtosTemp)
            setLoading(false)

        }).catch((error) => {
            setLoading(false)
            console.error(error);
        });
    }

    // Remove do carrinho o produto
    async function deletar(produto) {
        await remove(ref(getDatabase(), `users/${uid}/carrinho/${produto.key}`))
        getProdutos()
    }

    return (
        <View style={styles.container}>

            <View style={{ alignItems: 'center' }}>
                {loading && <Image
                    style={{
                        width: 110,
                        height: 90,

                    }}
                    source={require('../../assets/loading.gif')}
                />}
            </View>

            <Text>{aviso}</Text>

            <ListaDeProdutos
                produtos={produtos}
                deletar={deletar}
            />

            <Text style={styles.total} >
                Total: R$
                { Number(total).toFixed(2) }
            </Text>

            <Text style={{ marginLeft: 5 }}>O pagamento será feito no momento da entrega.</Text>


            <TouchableOpacity
                style={styles.buttonFazerPedido}
                /*  onPress={fazerPedido} */
                onPress={() => navigation.navigate("FazerPedido", { total, produtos, uid })}
            >
                <Text style={{ fontSize: 25, color: '#fff' }} >Fazer pedido</Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    total: {
        /* position: 'absolute',
        bottom: 0, */
        fontSize: 25,
        margin: 5
    },
    buttonFazerPedido: {
        backgroundColor: '#4CBBF1',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 5
    }
})

export default Carrinho;