import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    TextInput
} from "react-native";
import React, { useState, useEffect } from 'react';
import { ref, getDatabase, push } from 'firebase/database'

function FazerPedido({ navigation, route }) {

    const [entregar, setEntregar] = useState(false)
    const [endereco, setEndereco] = useState('')
    const [pagamento, setPagamento] = useState('')
    const { total, produtos, uid } = route.params

    // Salva o pedido no banco de dados
    async function fazerPedido() {
        try {

            if(entregar && !endereco){
                return alert("Informe um endereço para entrega!")
            }

            if(!pagamento){
                return alert("Informe uma forma de pagamento!")
            }

            let date = new Date();
            const dataFormat = date.toLocaleDateString() + " " + date.getHours() + ":" + date.getMinutes()

            await push(ref(getDatabase(), `pedidos/${uid}`),
                {
                    produtos: produtos,
                    entregar,
                    status: "Em análise",
                    total,
                    endereco,
                    data: dataFormat,
                    pagamento

                })

            navigation.navigate("UserPedidos")

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <View
            style={{
                flex: 1
            }}
        >

            <View>

                <Text
                    style={{
                        fontSize: 20,
                        margin: 10,
                        borderBottomWidth: 0.5
                    }}
                >
                    Entrega
                </Text>

                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => setEntregar(false)}
                >
                    <View
                        style={{
                            margin: 5,
                            backgroundColor: !entregar ? '#41CF8B' : '#B2B2B2',
                            padding: 10,
                            borderRadius: 50
                        }}
                    >
                        <Image
                            style={{
                                height: 10,
                                width: 10,
                            }}
                            source={require('../../assets/select.png')}
                        />
                    </View>

                    <Text>Retirar os produtos (Endereço para retirar: Rua dos Bobos)</Text>


                </TouchableOpacity>


                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => setEntregar(true)}
                >
                    <View
                        style={{
                            margin: 5,
                            backgroundColor: entregar ? '#41CF8B' : '#B2B2B2',
                            padding: 10,
                            borderRadius: 50
                        }}
                    >
                        <Image
                            style={{
                                height: 10,
                                width: 10,
                            }}
                            source={require('../../assets/select.png')}
                        />
                    </View>

                    <Text>Pedir que entregue</Text>

                </TouchableOpacity>

                {entregar && <View style={{
                    marginLeft: 10,
                    marginRight: 10
                }}>
                    <Text>Seu endereço de entrega</Text>
                    <TextInput
                        placeholder="Rua exemplo, Nº 1"
                        onChangeText={setEndereco}
                        style={{
                            marginTop: 5,
                            backgroundColor: '#C2CAF1',
                            borderRadius: 5,
                            padding: 5
                        }} />

                </View>}


            </View>

            <View
                style={{
                    marginTop: 20
                }}
            >

                <Text
                    style={{
                        fontSize: 20,
                        margin: 10,
                        borderBottomWidth: 0.5
                    }}
                >
                    Forma de pagamento
                </Text>

                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => setPagamento("Pix")}
                >
                    <View
                        style={{
                            margin: 5,
                            backgroundColor: pagamento == 'Pix' ? '#41CF8B' : '#B2B2B2',
                            padding: 10,
                            borderRadius: 50
                        }}
                    >
                        <Image
                            style={{
                                height: 10,
                                width: 10,
                            }}
                            source={require('../../assets/select.png')}
                        />
                    </View>

                    <Text>Pix (Chave: geoo677@gmail.com)</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => setPagamento("Cartão")}
                >
                    <View
                        style={{
                            margin: 5,
                            backgroundColor: pagamento == 'Cartão' ? '#41CF8B' : '#B2B2B2',
                            padding: 10,
                            borderRadius: 50
                        }}
                    >
                        <Image
                            style={{
                                height: 10,
                                width: 10,
                            }}
                            source={require('../../assets/select.png')}
                        />
                    </View>

                    <Text>Cartão</Text>

                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => setPagamento("Dinheiro a vista")}
                >
                    <View
                        style={{
                            margin: 5,
                            backgroundColor: pagamento == 'Dinheiro a vista' ? '#41CF8B' : '#B2B2B2',
                            padding: 10,
                            borderRadius: 50
                        }}
                    >
                        <Image
                            style={{
                                height: 10,
                                width: 10,
                            }}
                            source={require('../../assets/select.png')}
                        />
                    </View>

                    <Text>Dinheiro a vista</Text>

                </TouchableOpacity>

            </View>

            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%'
                }}
            >
                <Text style={styles.total} >Total: R$ {total}</Text>
                <Text style={{ marginLeft: 5 }}>O pagamento será feito no momento da entrega.</Text>

                <TouchableOpacity
                    style={styles.buttonFazerPedido}
                    /*  onPress={fazerPedido} */
                    onPress={fazerPedido}
                >
                    <Text style={{ fontSize: 25, color: '#fff' }} >Finalizar pedido</Text>
                </TouchableOpacity>
            </View>

        </View>);
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

export default FazerPedido;