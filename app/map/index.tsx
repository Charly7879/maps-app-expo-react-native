import CustomMap from "@/presentation/components/maps/CustomMap";
import { useLocationStore } from "@/presentation/store/useLocationStore";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
// https://docs.expo.dev/versions/latest/sdk/map-view/

const MapScreen = () => {

    // LocationStore
    const { lastKnownLocation, getLocation } = useLocationStore();

    // Comprobar sí existe una ubicación
    useEffect(() => {
        if (lastKnownLocation === null) {
            getLocation();
        }
    }, []);

    if (lastKnownLocation === null) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <View>
            <CustomMap initialLocation={lastKnownLocation} />
        </View>
    );


};
export default MapScreen;