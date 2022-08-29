import { useState } from "react";
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView
} from "react-native";

//Biblioteca para obter arquivos
import * as DocumentPicker from 'expo-document-picker';


export default function FormProduto({ navigation, funcao, produtoEdit }) {

    const [uriFile, setUriFile] = useState(produtoEdit ? `https://firebasestorage.googleapis.com/v0/b/aluguel-b40c9.appspot.com/o/${produtoEdit.file}?alt=media&token=6456cde5-728f-4986-821b-43fd59932296` : '')
    const [fileSave, setFileSave] = useState({})

    const [produto, setProduto] = useState(produtoEdit ? produtoEdit : { alugado: false });

    function setStateProduto(param, chave) {

        let temp = produto
        temp[chave] = param
        setProduto({ ...temp })

    }

    //Função que obtêm o arquivo selecionado.
    async function getFile() {

        try {

            var result = await DocumentPicker.getDocumentAsync({
                type: ["image/jpeg", "image/png", "image/gif"],
            });

            const file = await fetch(result.uri)
            const fileBlob = await file.blob()

            const fileState = {
                nome: result.name,
                uri: result.uri,
                file: fileBlob
            }

            setStateProduto(result.name, 'file')

            setFileSave(fileState)

            setUriFile(result.uri)

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={{ width: '100%' }}>

            <View style={styles.viewTop}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("AdministrarProdutos")
                    }}
                >
                    <Text style={{
                        fontSize: 20,
                        color: '#0f0f0f'
                    }} >Cancelar</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => {
                        funcao(produto, fileSave.file)
                    }}
                >
                    <Text style={{
                        fontSize: 20,
                        color: '#0f0f0f',

                    }} >Salvar</Text>

                </TouchableOpacity>

            </View>

            <ScrollView style={{ width: '100%' }}>


                <View style={styles.container}>

                    <View style={styles.viewInput} >
                        <Text >Nome:</Text>
                        <TextInput
                            style={styles.input}
                            value={produto.nome ? produto.nome : ""}
                            placeholder="Mesa"
                            onChangeText={nome => setStateProduto(nome, 'nome')}
                        />
                    </View>

                    <View style={styles.viewInput} >
                        <Text >Preço:</Text>
                        <TextInput style={styles.input}
                            value={produto.preco ? produto.preco : ""}
                            placeholder="50.99"
                            keyboardType="numeric"
                            onChangeText={preco => setStateProduto(preco, 'preco')}
                        />
                    </View>


                    <View style={styles.viewInput} >

                        <Text >Descrição:</Text>

                        <TextInput style={styles.input}
                            value={produto.descricao ? produto.descricao : ""}
                            placeholder="Mesa para quatro pessoas"
                            onChangeText={descricao => setStateProduto(descricao, 'descricao')}
                        />

                    </View>

                    <View style={{ flexDirection: "row", alignItems: 'center' }}>

                        <Text style={{ fontSize: 20 }}>Alugado?</Text>

                        <TouchableOpacity
                            style={produto.alugado ? styles.alugadoButonBorder : styles.alugadoButon}
                            onPress={() => setStateProduto(true, 'alugado')}
                        >

                            <Text style={{
                                fontSize: 20,
                                color: '#fff'
                            }} >Sim</Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={!produto.alugado ? styles.alugadoButonBorder : styles.alugadoButon}
                            onPress={() => setStateProduto(false, 'alugado')}
                        >

                            <Text style={{
                                fontSize: 20,
                                color: '#fff'
                            }} >Não</Text>

                        </TouchableOpacity>

                    </View>

                    <View
                        style={styles.imageView}
                    >

                        <TouchableOpacity
                            onPress={getFile}
                            style={styles.alugadoButon}
                        >
                            <Text style={{
                                fontSize: 20,
                                color: '#fff'
                            }} >Escolher imagem</Text>
                        </TouchableOpacity>

                        {uriFile ? <Image
                            style={{
                                width: 200,
                                height: 200,
                            }}
                            source={{
                                uri: uriFile,
                            }}
                        /> : <Text>Sem imagem ainda</Text>}

                    </View>

                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 40,
        marginBottom: 10
    },
    container: {
        alignItems: 'center',
        paddingTop: 5,

    },
    imageView: {
        backgroundColor: 'rgb(230,230,230)',
        borderRadius: 5,
        width: '80%',
        margin: 5,
        alignItems: 'center',
        padding: 10

    },
    viewTop: {
        backgroundColor: '#C2CAF1',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: "#000",
        elevation: 3,
        alignItems: 'center',
        padding: 10
    },
    input: {
        backgroundColor: '#C2CAF1',

        height: 40,
        borderRadius: 5,
        padding: 10,
        marginTop: 5
    },

    viewInput: {
        marginTop: 10,
        width: '80%',
    },

    alugadoButon: {
        marginTop: 20,
        margin: 10,
        backgroundColor: '#4CBBF1',
        padding: 10,
        borderRadius: 5,

        alignItems: 'center'
    },
    alugadoButonBorder: {
        borderColor: '#0f0f0f',
        borderWidth: 2,
        marginTop: 20,
        margin: 10,
        backgroundColor: '#4CBBF1',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonSave: {
        margin: 30,
        backgroundColor: '#4CBBF1',
        padding: 10,
        borderRadius: 5,
    }
})