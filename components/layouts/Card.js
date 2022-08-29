import { StyleSheet, Image, View, Text, TouchableOpacity, Modal } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, getDatabase, set, get, child, remove } from 'firebase/database'
import React, { useState, useEffect } from 'react';

export default function Card({ produto, navigation }) {

    const auth = getAuth();
    const [emCarrinho, setEmCarrinho] = useState(false);

    useEffect(() => {

        try {

            onAuthStateChanged(auth, (user) => {
                if (user) {

                    get(child(ref(getDatabase()), `users/${user.uid}/carrinho/${produto.key}`)).then(snapshot => {

                        if (snapshot.exists()) {
                            setEmCarrinho(true)
                        } else {
                            setEmCarrinho(false)
                        }

                    }).catch(error => console.log(error))

                }
            });

        } catch (error) {
            console.log(error);
        }

    }, [produto])

    // Adiciona o produto ao carrinho do usuário
    function addCarrinho() {

        try {

            onAuthStateChanged(auth, (user) => {
                if (user) {
                    set(ref(getDatabase(), 'users/' + user.uid + '/carrinho/' + produto.key), produto)
                    setEmCarrinho(true)
                } else {
                    navigation.navigate('Login')
                }
            });

        } catch (error) {
            console.log(error);
        }

    }

    // Remove o produto do carrinho do usuário
    async function deletar() {

        try {

            onAuthStateChanged(auth, async (user) => {
                if (user) {

                    await remove(ref(getDatabase(), `users/${user.uid}/carrinho/${produto.key}`))
                    setEmCarrinho(false)

                } else {
                    navigation.navigate('Login')
                }
            });

        } catch (error) {
            console.log(error);
        }

    }

    return (

        <View style={styles.card}>

            <Image
                style={styles.image}
                source={{
                    uri: produto.file,        
                }}
            />

            <View style={styles.legenda}>

                <View >
                    <Text style={{ fontSize: 25 }} >{produto.nome}</Text>
                    <Text style={{ fontSize: 20 }} >R$ {produto.preco} </Text>
                    <Text>{produto.alugado ? "Indisponível" : "Disponível"}</Text>
                    <Text>{produto.descricao}</Text>

                    <TouchableOpacity
                        onPress={() => emCarrinho ? deletar() : addCarrinho()}
                        style={[
                            styles.addCarrinho,
                            { backgroundColor: emCarrinho ? '#de3139' : '#4CBBF1' }
                        ]}
                    >

                        <Text
                            style={{ fontSize: 15, color: '#fff' }}>
                            {emCarrinho ? "Remover do carrinho " : "Adicionar ao carrinho "}
                        </Text>

                        <Image
                            style={{
                                width: 40,
                                height: 40,
                            }}
                            source={require('../../assets/carrinho.png')}
                        />
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
        borderRadius: 5,
        width: '95%',
        padding: 4,

        shadowColor: "#000",
        elevation: 5,
    },
    legenda: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addCarrinho: {
        shadowColor: "#000",
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 7,
        borderRadius: 5,
        marginTop: 10
    },
    image: {
        minWidth: 250,
        minHeight: 250,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    }
})