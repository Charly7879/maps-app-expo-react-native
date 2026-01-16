/**
 * FAB
 * Componente de botón flotante (Float Action Button)
 */
import { Ionicons } from "@expo/vector-icons";
import { StyleProp, StyleSheet, TouchableOpacity, View, ViewProps, ViewStyle } from "react-native";

interface Props extends ViewProps {
    iconName: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

const FAB = ({
    iconName,
    onPress,
    style
}: Props) => {
    return (
        <View style={[styles.btn, style]}>
            <TouchableOpacity onPress={onPress}>
                <Ionicons name={iconName} color="#FFFFFF" size={35} />
            </TouchableOpacity>
        </View>
    )
};
export default FAB;

const styles = StyleSheet.create({
    btn: {
        zIndex: 99,
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#0075ce',
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 0.27,
            width: 4.5,
        },
        elevation: 5,
    }
});