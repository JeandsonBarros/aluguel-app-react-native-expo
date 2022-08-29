import { useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";

function ListaDeProdutos({ produtos, deletar, editar }) {

    return (
        <ScrollView style={{ width: '100%' }}>

            {produtos.map(item => {
                return (
                    <View
                        key={item.key}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderBottomWidth: 1,
                            borderColor: '#A7ADCF',
                            margin: 1
                        }}
                    >
                        <Image
                            style={{
                                height: 80,
                                width: 80,
                                margin: 3
                            }}
                            source={{
                                uri: `https://firebasestorage.googleapis.com/v0/b/aluguel-b40c9.appspot.com/o/${item.file}?alt=media&token=6456cde5-728f-4986-821b-43fd59932296`,
                            }}
                        />

                        <Text style={{ fontSize: 17, width: 80 }} >{item.nome}</Text>

                        <Text style={{ fontSize: 17 }} >R$ {item.preco}</Text>

                        <View style={{ flexDirection: 'row', flexWrap: 'nowrap' }}>

                            {editar && <TouchableOpacity
                                onPress={() => editar(item)}
                            >
                                <Image
                                    style={{
                                        height: 30,
                                        width: 30,
                                        marginRight: 5,
                                        shadowColor: "black",
                                    }}
                                    source={require('../../assets/editar.png')}
                                />
                            </TouchableOpacity>}

                            <TouchableOpacity
                                onPress={() => deletar(item)}
                            >
                                <Image
                                    style={{
                                        height: 30,
                                        width: 30,
                                        marginRight: 8
                                    }}
                                    source={require('../../assets/deletar.png')}
                                />
                            </TouchableOpacity>

                        </View>

                    </View>);
            })}
        </ScrollView>
    );
}

export default ListaDeProdutos;