import { Text, View } from "@/presentation/components/shared/Themed";
import ThemedPressable from "@/presentation/components/shared/ThemedPressable";
import { usePermissionsStorage } from "@/presentation/store/usePermissions";

const PermissionsScreen = () => {
    const { locationStatus, requestLocationPermission } = usePermissionsStorage();

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <ThemedPressable onPress={requestLocationPermission}>
                Habilitar ubicación
            </ThemedPressable>
            <Text>Estado actual de los permisos: {locationStatus}</Text>
        </View>
    )
};
export default PermissionsScreen;