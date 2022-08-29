import { useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";

function CardPedido({ pedido, funcaoStatus }) {

    const [expandir, setExpandir] = useState(false);

    return (

        <TouchableOpacity
            onPress={() => setExpandir(!expandir)}
            style={styles.containerButton}>

            <View style={{ padding: 10 }}>

                <View style={styles.cabecalho}>

                    <Text style={{ fontSize: 18 }} >{pedido.produtos[0].nome.slice(0, 15)}...</Text>
                    <Text style={{ fontSize: 18 }} >R$ {pedido.total}</Text>

                    <Text style={{ fontSize: 30 }} >{!expandir ? "+" : "-"}</Text>

                </View>

                {expandir &&

                    <>{

                        pedido.produtos.map((produto, index) => {

                            return (

                                <View key={index}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                        <Image
                                            style={{
                                                height: 80,
                                                width: 80,
                                                margin: 5
                                            }}
                                            source={{
                                                uri: `https://firebasestorage.googleapis.com/v0/b/aluguel-b40c9.appspot.com/o/${produto.file}?alt=media&token=6456cde5-728f-4986-821b-43fd59932296`,
                                            }}
                                        />

                                        <Text>{produto.nome} R$ {produto.preco}</Text>

                                    </View>

                                </View>

                            )
                        })
                    }
                        <Text>Forma de pagamento: {pedido.pagamento}</Text>
                        {pedido.entregar && <Text>
                            Endereço de entrega: {pedido.endereco}
                        </Text>}
                    </>
                }

                <Text>Os produtos serão: {pedido.entregar ? "Entregues" : "Retirados"}</Text>
                <Text>Status: {pedido.status}</Text>
                <Text>{pedido.data}</Text>

            </View>

            {funcaoStatus && <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                }}>

                <TouchableOpacity
                    onPress={() => funcaoStatus(pedido, "Aprovado")}
                    style={{
                        backgroundColor: '#4CBBF1',
                        flex: 1,
                        alignItems: 'center',
                        borderBottomStartRadius: 10
                    }}
                >
                    <Text style={{ fontSize: 20, color: '#fff' }} >Aprovar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => funcaoStatus(pedido, "Em análise")}
                    style={{
                        backgroundColor: '#ffd700',
                        flex: 1,
                        alignItems: 'center',
                    }}
                >
                    <Text style={{ fontSize: 20 }} >Em análise</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => funcaoStatus(pedido, "Recusado")}
                    style={{
                        backgroundColor: '#de1738',
                        flex: 1,
                        alignItems: 'center',
                        borderBottomEndRadius: 10
                    }}
                >
                    <Text style={{ fontSize: 20, color: '#fff' }} >Recusar</Text>
                </TouchableOpacity>

            </View>}

        </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    containerButton: {
        margin: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: "#000",
        elevation: 5,
    },
    cabecalho: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})

export default CardPedido;