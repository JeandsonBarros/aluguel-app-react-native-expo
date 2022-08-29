import { StyleSheet, View, Image, ScrollView } from "react-native";
import { getStorage, ref as refStorage, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ref, getDatabase, push } from 'firebase/database'
import FormProduto from "../layouts/FormProduto";
import React, { useState } from 'react';

export default function AddProduto({ navigation }) {

    const [loading, setLoading] = useState(false)

    //Salvar o produto no Firebase-Realtime-Database
    async function save(produto, file) {

        try {

            setLoading(true)

            const storageRef = refStorage(getStorage(), "/" + produto.file);
            await uploadBytesResumable(storageRef, file)

            const fileURL = await getDownloadURL(refStorage(getStorage(), '/'+produto.file))   
            produto.file = fileURL

            push(ref(getDatabase(), 'produtos/'), { ...produto });

            setLoading(false)

            navigation.navigate("AdministrarProdutos")

        } catch (error) {
            console.log("===== Erro ao salvar produto =====");
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
                navigation={navigation}
                funcao={save}
            />

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',

    },

})