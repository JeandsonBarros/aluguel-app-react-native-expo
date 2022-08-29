import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    Image
} from "react-native";
import { getAuth, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, getDatabase, set } from 'firebase/database'

export default function UserRegistro({ navigation }) {

    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')
    const [loading, setLoading] = useState(false)

    // Registre o usuário no Firebase
    async function registrar() {

        if (!email || !nome || !endereco || !senha || !confirmarSenha) {

            return Alert.alert(
                "Atenção",
                "Não deixe campos vazios!",
                [{ text: "Ok" }]
            )
        }

        if (senha !== confirmarSenha) {

            return Alert.alert(
                "Atenção",
                "Senhas não correspondem!",
                [{ text: "Ok" }]
            )
        }

        if (senha.length < 6) {

            return Alert.alert(
                "Atenção",
                "Senhas deve ter mais de 6 caracteres!",
                [{ text: "Ok" }]
            )
        }

        try {

            setLoading(true)

            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha)

            const user = userCredential.user;

            await set(ref(getDatabase(), "users/" + user.uid + "/dados"), { nome, email, endereco, telefone })

            setLoading(false)

            navigation.navigate("Home")

        } catch (error) {
            console.log(error);
            setLoading(false);
            alert("Erro ao cadastrar-se")
        }

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

                <View style={styles.container}>

                    <Text style={{ fontSize: 30, marginTop: 10 }} >Cadastre-se</Text>

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

                    <View style={styles.viewInput}>
                        <Text>Email</Text>
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
                            onChangeText={setSenha}
                            placeholder="12345678"
                            secureTextEntry={true}
                            style={styles.input}
                        />
                    </View>

                    <View style={styles.viewInput}>
                        <Text>Confirmar Senha</Text>
                        <TextInput
                            value={confirmarSenha}
                            onChangeText={setConfirmarSenha}
                            placeholder="12345678"
                            secureTextEntry={true}
                            style={styles.input}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.buttonEntrar}
                        onPress={registrar}
                    >
                        <Text style={{ fontSize: 20, color: '#fff' }} >Cadastrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonEntrar}
                        onPress={()=>navigation.navigate("Login")}
                    >
                        <Text style={{ fontSize: 20, color: '#fff' }} >Entrar</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
    buttonEntrar: {
        margin: 30,
        backgroundColor: '#4CBBF1',
        padding: 10,
        borderRadius: 5,
    }
})
