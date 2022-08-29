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
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

export default function Login({ navigation }) {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [loading, setLoading] = useState(false)

    /* Verifica se o usuário já está autenticado, 
    se sim ele é direcionado para a tela Home. */
    useEffect(() => {

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate("Home")
            } 
        });

        return ()=>{
            setEmail('')
            setSenha('')
            setLoading({})
        }

    }, [])

    // Registra o usuário no Firebase
    async function registrar() {

        if (!email || !senha) {

            return Alert.alert(
                "Atenção",
                "Não deixe campos vazios!",
                [{ text: "Ok" }]
            )
        }

        try {

            setLoading(true)

            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, senha)

            const user = userCredential.user;

            setLoading(false)

            navigation.navigate("Home")

        } catch (error) {
            console.log(error);
            setLoading(false);
            alert("Erro ao entrar")
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

                    <Text style={{ fontSize: 30, marginTop: 10 }} >Login</Text>

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

                    <TouchableOpacity
                        style={styles.buttonEntrar}
                        onPress={registrar}
                    >
                        <Text style={{ fontSize: 20, color: '#fff' }} >Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonEntrar}
                        onPress={() => navigation.navigate("UserRegistro")}
                    >
                        <Text style={{ fontSize: 20, color: '#fff' }} >Cadastrar-se</Text>
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
