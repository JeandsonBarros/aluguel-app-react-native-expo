import { useEffect, useState } from "react";
import {
    StyleSheet,
    Image,
    View,
    Text,
    ScrollView,
    TextInput
} from "react-native";
import { ref, getDatabase, get, child } from 'firebase/database'
import Card from "../layouts/Card";

export default function Produtos({ navigation }) {

    const [produtos, setProdutos] = useState([])
    const [loading, setLoading] = useState(true)
    const [aviso, setAviso] = useState("")
    const [buscar, setBuscar] = useState("")

    const dbRef = ref(getDatabase());

    useEffect(() => {

        getProdutos()

        navigation.addListener('focus', () => {
            getProdutos()
        });

        return ()=>{
            setProdutos([])
        }

    }, [navigation])

    // Obtem os produtos que estão no banco de dados Realtime Database
    function getProdutos() {

        get(child(dbRef, `produtos/`)).then((snapshot) => {

            let produtosTemp = []

            if (snapshot.exists()) {

                Object.keys(snapshot.val()).forEach(item => {
                    produtosTemp.push({ ...snapshot.val()[item], key: item })
                })

            } else {
                setAviso("Sem produtos");
            }

            setProdutos(produtosTemp)
            setLoading(false)

        }).catch((error) => {
            setLoading(false)
            console.error(error);
        });
    }

    // Busca produto por nome
    function buscarProduto(nomeProduto){

        setBuscar(nomeProduto)

        if(nomeProduto){

            let produtosBusca = produtos.filter(item=>{
                return item.nome.toLowerCase().includes(nomeProduto.toLowerCase())
            })

            setProdutos(produtosBusca)

        }else{
            getProdutos()
        }
    }

    return (
        <>

            <ScrollView style={{
                width: '100%'
            }}>

                <View style={styles.viewInput} >

                    <Image
                        style={{
                            height: 25,
                            width: 25,
                            margin: 5,
                            tintColor: 'rgb(30,80,250)'
                        }}
                        source={require('../../assets/search.png')}
                    />

                    <TextInput style={styles.input}
                       value={buscar}
                        placeholder="Boleira"
                        onChangeText={nome => buscarProduto(nome)}
                    />

                </View>

                <View style={styles.container}>

                    {loading && <Image
                        style={{
                            width: 110,
                            height: 90,
                        }}
                        source={require('../../assets/loading.gif')}
                    />}

                    <Text>{aviso}</Text>

                    {produtos.map(item => {
                        return (
                            <Card
                                key={item.key}
                                produto={item}
                                navigation={navigation}
                            />
                        )
                    })}

                </View >

            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    input: {
        width: '90%',
        height: 40,
        marginTop: 5,
        fontSize: 17,
        height: 20
    },

    viewInput: {
        borderRadius: 5,
        backgroundColor: '#C2CAF1',
        margin: 10,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',

    },


})