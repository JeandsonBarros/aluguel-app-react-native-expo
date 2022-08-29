import {
    View,
    TouchableOpacity,
    Text,
    TextInput,
    StyleSheet,
    Modal,
} from "react-native";
import React, { useEffect, useState } from 'react';
import {
    getAuth,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";


function ReautenticarModal({ visibleModal, setVisibleModal, funcaoExecultar }) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [loading, setLoading] = useState(false)

    useEffect(() => {

    }, [])

    async function reautenticar() {
        try {

            const auth = getAuth();
            const user = auth.currentUser;

            const credential = EmailAuthProvider.credential(
                email,
                senha
            );


            await reauthenticateWithCredential(user, credential)
            funcaoExecultar()

            setVisibleModal(false)

        } catch (error) {
            alert("Erro ao autenticar, verifique se o e-mail e a senha estão corretos")
            console.log(error);
        }
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visibleModal}
            onRequestClose={() => {
                /* Alert.alert("Modal has been closed."); */
                setModalVisible(false);
            }}
        >
            <View style={styles.centeredView}>

                <View style={styles.modalView}>

                    <Text style={{ fontSize: 20 }} >Reautenticar</Text>
                    <Text>É necessário reautentica-se para salvar as alterações.</Text>

                    <View style={styles.viewInput}>
                        <Text>E-mail</Text>
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="exemplo@email.com"
                            style={styles.input}

                        />
                    </View>

                    <View style={styles.viewInput}>
                        <Text>Senha</Text>
                        <TextInput
                            value={senha}
                            secureTextEntry={true}
                            onChangeText={setSenha}
                            placeholder="87654321"
                            style={styles.input}

                        />
                    </View>

                    <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity
                            style={[styles.button, {backgroundColor: '#de3139'}]}
                            onPress={() => setVisibleModal(false)}
                        >
                            <Text style={{ fontSize: 20, color: '#fff' }} >Cancelar</Text>

                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={reautenticar}
                        >
                            <Text style={{ fontSize: 20, color: '#fff' }} >Reautenticar</Text>

                        </TouchableOpacity>

                    </View>

                </View>

            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({

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
    /* -------------Modal Styles-------------- */

    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
})

export default ReautenticarModal;