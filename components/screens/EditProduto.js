import { Image, StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { getStorage, ref as refStorage, uploadBytesResumable, getDownloadURL  } from "firebase/storage";
import { ref, getDatabase, set  } from 'firebase/database'
import FormProduto from "../layouts/FormProduto";
import { useState } from "react";

export default function EditProduto({ navigation, route }) {

    const { produto } = route.params
    const [loading, setLoading] = useState(false)

    // Essa função edita o produto no banco de dados
    async function editar(produto, file) {

        try {

            setLoading(true)

           
            if (file) {
                const storageRef = refStorage(getStorage(), "/" + produto.file);
                await uploadBytesResumable(storageRef, file)

                const fileURL = await getDownloadURL(refStorage(getStorage(), '/'+produto.file))   
                produto.file = fileURL
               
            }

            set(ref(getDatabase(), 'produtos/' + produto.key), { ...produto });

            setLoading(false)

            navigation.navigate("AdministrarProdutos")

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