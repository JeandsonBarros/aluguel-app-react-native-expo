import { Image, StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { getStorage, ref as refStorage, uploadBytesResumable, deleteObject } from "firebase/storage";
import { ref, getDatabase, push, set, remove } from 'firebase/database'
import FormProduto from "../layouts/FormProduto";
import { useState } from "react";

export default function EditProduto({ navigation, route }) {

    const { produto } = route.params
    const [loading, setLoading] = useState(false)

    // Essa função edita o produto no banco de dados
    async function editar(produto, file) {

        try {

            setLoading(true)

            set(ref(getDatabase(), 'produtos/' + produto.key), { ...produto });

            if (file) {
                const storageRef = refStorage(getStorage(), "/" + produto.file);
                const dataStatus = await uploadBytesResumable(storageRef, file)

                console.log(dataStatus.state);
            }

            setLoading(false)

            navigation.navigate("Home")

        } catch (error) {
            console.log(error);
            setLoading(false)
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

                <FormProduto
                    funcao={editar}
                    produtoEdit={produto}
                    navigation={navigation}
                />

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },

})