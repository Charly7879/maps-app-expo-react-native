import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// https://docs.expo.dev/versions/latest/sdk/map-view/

const MapScreen = () => {
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                // Región inicial de map
                initialRegion={{
                    latitude: -32.8908509,
                    longitude: -68.843815,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: -32.8908509,
                        longitude: -68.843815,
                    }}
                    title="Ciudad de Mendoza"
                    description="Ciudad de Mendoza, Argentina"
                />
                <Marker
                    coordinate={{
                        latitude: -32.9080897,
                        longitude: -68.8376075,
                    }}
                    title="Dorrego"
                    description="Dorrego, Guaymallén, Mendoza"
                />
                <Marker
                    coordinate={{
                        latitude: -32.9277695,
                        longitude: -68.8609629,
                    }}
                    title="Godoy Cruz"
                    description="Godoy Cruz, Mendoza"
                />
            </MapView>

        </View>
    );
};
export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    }
});