import { Image, TouchableOpacity, View, Text } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function HeaderRight({ navigation }) {

    // Leva para a tela do local informado na variável ou para a tela do login
    function navigate(local) {

        const auth = getAuth();

        onAuthStateChanged(auth, (user) => {
            if (user) {
                navigation.navigate(local, { uid: user.uid })
            } else {
                navigation.navigate('Login')
            }
        });

    }

    return (
        <View style={{ flexDirection: 'row' }} >

            <TouchableOpacity
                onPress={() => navigate('Carrinho')}
                style={{ marginRight: 10 }}
            >
                <Image
                    style={{
                        height: 40,
                        width: 40
                    }}
                    source={require('../../assets/carrinho.png')}
                />
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigate('User')}
            >
                <Image
                    style={{
                        height: 40,
                        width: 40
                    }}
                    source={require('../../assets/user.png')}
                />
            </TouchableOpacity>

        </View>
    );
}

export default HeaderRight;