import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface Props extends PressableProps {
    children: string;
}

const ThemedPressable = ({
    children,
    ...rest
}: Props) => {
    return (
        <Pressable
            style={style.btnPrimary}
            {...rest}
        >
            <Text style={{ color: '#FAFAFA' }}>{children}</Text>
        </Pressable>
    )
};
export default ThemedPressable;

const style = StyleSheet.create({
    btnPrimary: {
        backgroundColor: '#0075ce',
        padding: 10,
        marginBottom: 10,
    }
});