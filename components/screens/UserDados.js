import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    StyleSheet,
    ScrollView,
} from "react-native";
import React, { useState, useEffect } from 'react';
import { ref, getDatabase, get, child, set } from 'firebase/database'
import {
    getAuth,
    updatePassword,
    updateEmail
} from "firebase/auth";
import ReautenticarModal from "../layouts/ReautenticarModal";

// Componente para alterar senha
function alterarSenhaComponet() {

    const [modalVisible, setModalVisible] = useState(false);
    const [senhaNova, setSenhaNova] = useState('')
    const [inputVisible, setInputVisible] = useState(false);

    async function alterarSenha() {

        try {

            const auth = getAuth();
            const user = auth.currentUser;

            await updatePassword(user, senhaNova)
            setModalVisible(!modalVisible);
            alert("Senha alterada com sucesso")


        } catch (error) {
            console.log(error);
        }

    }

    function validarSenha() {

        if (!senhaNova)
            return alert("Informe uma nova senha!")

        if (senhaNova.length < 6)
            return alert("Senha deve ter 6 ou mais caracteres!")

        setModalVisible(true)
    }

    return (<>

        <ReautenticarModal
            visibleModal={modalVisible}
            setVisibleModal={setModalVisible}
            funcaoExecultar={alterarSenha}
        />

        <View style={styles.container}>

            <TouchableOpacity
                onPress={() => setInputVisible(!inputVisible)}
                style={styles.buttonEspandir}
            >
                <Text style={{ fontSize: 20 }} >Alterar senha</Text>
                <Text style={{ fontSize: 20 }} >{inputVisible ? " - " : ' + '}</Text>
            </TouchableOpacity>

            {inputVisible && <View
                style={{
                    justifyContent: "center",
                    alignItems: 'center',
                    width: '100%'
                }}
            >
                <View style={styles.viewInput}>
                    <Text>Nova senha</Text>
                    <TextInput
                        value={senhaNova}
                        secureTextEntry={true}
                        onChangeText={setSenhaNova}
                        placeholder="87654321"
                        style={styles.input}

                    />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#de3139' }]}
                        onPress={() => setInputVisible(false)}
                    >
                        <Text style={{ fontSize: 20, color: '#fff' }} >Cancelar</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={validarSenha}
                    >
                        <Text style={{ fontSize: 20, color: '#fff' }} >Alterar</Text>

                    </TouchableOpacity>
                </View>

            </View>}

        </View>

    </>
    )
}

// Componente para alterar e-mail
function alterarEmailComponet() {

    const [modalVisible, setModalVisible] = useState(false);
    const [inputVisible, setInputVisible] = useState(false);
    const [emailNovo, setEmailNovo] = useState('')

    async function alterarEmail() {
        try {

            const auth = getAuth();

            await updateEmail(auth.currentUser, emailNovo)
            alert("E-mail alterado com sucesso")
            setModalVisible(false)

        } catch (error) {
            console.log(error);
        }
    }

    function validarEmail() {

        if (!emailNovo)
            return alert("Informe um e-mail!")

        setModalVisible(true)
    }

    return (<>

        <ReautenticarModal
            visibleModal={modalVisible}
            setVisibleModal={setModalVisible}
            funcaoExecultar={alterarEmail}
        />

        <View style={styles.container}>

            <TouchableOpacity style={styles.buttonEspandir}
                onPress={() => setInputVisible(!inputVisible)}
            >
                <Text style={{ fontSize: 20 }} >Alterar e-mail</Text>
                <Text style={{ fontSize: 20 }} >{inputVisible ? " - " : ' + '}</Text>
            </TouchableOpacity>

            {inputVisible && <View
                style={{
                    justifyContent: "center",
                    alignItems: 'center',
                    width: '100%'
                }}
            >

                <View style={styles.viewInput}>
                    <Text>Novo e-mail</Text>
                    <TextInput
                        value={emailNovo}
                        onChangeText={setEmailNovo}
                        placeholder="exemplo@email.com"
                        style={styles.input}

                    />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#de3139' }]}
                        onPress={() => setInputVisible(false)}
                    >
                        <Text style={{ fontSize: 20, color: '#fff' }} >Cancelar</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={validarEmail}
                    >
                        <Text style={{ fontSize: 20, color: '#fff' }} >Alterar</Text>
                    </TouchableOpacity>

                </View>

            </View>}

        </View>

    </>
    )
}

function UserDados({ route, navigation }) {

    const uid = route.params['uid']

    const [nome, setNome] = useState('')
    const [telefone, setTelefone] = useState('')
    const [endereco, setEndereco] = useState('')


    useEffect(() => {

        getDadosUser()

    }, [])


    async function getDadosUser() {

        try {

            const userTemp = await get(child(ref(getDatabase()), `users/${uid}/dados`))

            setNome(userTemp.val().nome)
            setTelefone(userTemp.val().telefone)
            setEndereco(userTemp.val().endereco)

        } catch (error) {
            console.log(error);
        }

    }

    async function editarUser() {
        try {

            if (!nome || !telefone || !endereco) {
                return alert("Não deixe campos vazios!")
            }

            await set(child(ref(getDatabase()), `users/${uid}/dados`), { nome, telefone, endereco })
            alert("Dados editado!")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ScrollView>

            <View style={styles.container}>

                <View style={styles.viewInput}>
                    <Text>Nome</Text>
                    <TextInput
                        value={nome}
                        onChangeText={setNome}
                        placeholder="Fulano"
                        style={styles.input}

                    />
                </View>

                <View style={styles.viewInput}>
                    <Text>Endereço</Text>
                    <TextInput
                        value={endereco}
                        onChangeText={setEndereco}
                        placeholder="Bairro exemplo, Rua exemplo, nº 1"
                        style={styles.input}

                    />
                </View>

                <View style={styles.viewInput}>
                    <Text>Telefone</Text>
                    <TextInput
                        value={telefone}
                        onChangeText={setTelefone}
                        placeholder="(00) 00000-0000"
                        style={styles.input}
                        keyboardType="numeric"
                    />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: '#de3139' }]}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{ fontSize: 20, color: '#fff' }} >Cancelar</Text>

                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={editarUser}
                    >
                        <Text style={{ fontSize: 20, color: '#fff' }} >Salvar</Text>
                    </TouchableOpacity>

                </View>

            </View>

            {alterarEmailComponet()}
            {alterarSenhaComponet()}

        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        borderBottomWidth: 0.5,
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
    button: {
        margin: 30,
        backgroundColor: '#4CBBF1',
        padding: 10,
        borderRadius: 5,
    },
    buttonEspandir: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        backgroundColor: '#ededed',
        padding: 10,
        shadowColor: '#000',
        elevation: 1
    }
})

export default UserDados;