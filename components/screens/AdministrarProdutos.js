import { useEffect, useState } from "react";
import { View, Text, Alert, TouchableOpacity, ScrollView, Image, StyleSheet } from "react-native";
import ListaDeProdutos from "../layouts/ListaDeProdutos";
import { ref, getDatabase, get, child, remove } from 'firebase/database'
import { getStorage, ref as refStorage, deleteObject } from "firebase/storage";

function AdministrarProdutos({ navigation }) {

    const [produtos, setProdutos] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        
        getProdutos()

        return () => {
            setProdutos([])
        }

    },[])

    // Obtém os produtos no banco de dados Realtime Database
    function getProdutos() {

        const dbRef = ref(getDatabase());

        get(child(dbRef, `produtos/`)).then((snapshot) => {

            let produtosTemp = []

            if (snapshot.exists()) {

                Object.keys(snapshot.val()).forEach(item => {
                    produtosTemp.push({ ...snapshot.val()[item], key: item })
                })

            } else {
                console.log("No data available");
            }

            setProdutos(produtosTemp)

        }).catch((error) => {
            console.error(error);
        });
    }

    // Navega para a tela de editar produto
    function putProduto(produto) {
        navigation.navigate("EditProduto", { produto })
    }

    // Deleta o produto
    function deletar(produto) {

        Alert.alert(
            "Deletar",
            'Deletar ' + produto.nome + '?',
            [

                {
                    text: "Cancelar",
                },

                {
                    text: "Deletar", onPress: async () => {

                        try {

                            setLoading(true)

                            await remove(ref(getDatabase(), 'produtos/' + produto.key))

                            await deleteObject(refStorage(getStorage(), "/" + produto.file))

                            setLoading(false)

                            getProdutos()

                        } catch (error) {
                            console.log(error);
                            setLoading(false)
                        }

                    }
                }
            ]
        );

    }

    return (
        <View style={styles.container}>

            {loading && <Image
                style={{
                    width: 110,
                    height: 90,
                }}
                source={require('../../assets/loading.gif')}
            />}


            <ScrollView style={{ width: '100%' }}>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("AddProduto")}
                >
                    <Text style={{ fontSize: 20, color: '#fff' }}>Novo produto</Text>
                    <Image
                        style={{
                            height: 30,
                            width: 30
                        }}
                        source={require('../../assets/add.png')}
                    />
                </TouchableOpacity>

                <ListaDeProdutos
                    produtos={produtos}
                    editar={putProduto}
                    deletar={deletar}
                />

            </ScrollView>

        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },
    button: {
        backgroundColor: '#4CBBF1',
        borderRadius: 5,
        padding: 10,
        margin: 20,
        width: 190,
        alignItems: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})

export default AdministrarProdutos;