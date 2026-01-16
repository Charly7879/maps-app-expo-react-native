import { LatLng } from "@/infrastructure/interfaces/lat-lng";
import FAB from "@/presentation/components/shared/FAB";
import { useLocationStore } from "@/presentation/store/useLocationStore";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import MapView, { Polyline } from "react-native-maps";

interface Props extends ViewProps {
    initialLocation: LatLng;
    showUserLocation?: boolean;
}

const CustomMap = ({
    initialLocation,
    showUserLocation = true,
    ...rest
}: Props) => {

    // Referencia a MapView
    const mapRef = useRef<MapView>(null);

    // Estado para seguir al usuario, para el botón (FAB)
    const [isFollowingUser, setIsFollowingUser] = useState(true);

    // Estado showPolyline
    const [isShowPolyline, setIsShowPolyline] = useState(true);

    const { watchLocation, clearWatchLocation, lastKnownLocation, getLocation, userLocationList } = useLocationStore();

    // Actualizar los datos de la ubicación del usuario
    useEffect(() => {
        watchLocation();

        // Limpiar subscripciones cuando se desmonta el componente
        return () => {
            clearWatchLocation();
        };

    }, []);

    // Seguir la camara de map del usuario
    useEffect(() => {
        if (lastKnownLocation && isFollowingUser) {
            moveCameraToLocation(lastKnownLocation);
        }
    }, [lastKnownLocation, isFollowingUser]);

    // Actualizar coordenadas de MapView
    const moveCameraToLocation = (latLng: LatLng) => {
        if (!mapRef.current) return;

        mapRef.current.animateCamera({
            center: latLng,
        });
    };

    // Mover la cámara al punto de referencia
    const moveToCurrentLocation = async () => {

        console.log('moveToCurrentLocation')

        if (!lastKnownLocation) {
            moveCameraToLocation(initialLocation);
        } else {
            moveCameraToLocation(lastKnownLocation);
        }
        // Ubicación actual
        const location = await getLocation();
        if (!location) return;

        moveCameraToLocation(location);
    };

    return (
        <View {...rest}>
            <MapView
                style={styles.map}
                ref={mapRef}
                onTouchStart={() => setIsFollowingUser(false)}
                // Región inicial de map
                //provider={PROVIDER_GOOGLE}
                showsUserLocation={showUserLocation}
                initialRegion={{
                    latitude: initialLocation.latitude,
                    longitude: initialLocation.latitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {isShowPolyline && (
                    <Polyline
                        coordinates={userLocationList}
                        strokeColor="#d13f00"
                        strokeWidth={5}
                    />
                )}
            </MapView>
            <FAB
                iconName={isShowPolyline ? 'eye-outline' : 'eye-off-outline'}
                onPress={() => setIsShowPolyline(!isShowPolyline)}
                style={{
                    bottom: 140,
                    right: 20
                }}
            />
            <FAB
                iconName={isFollowingUser ? 'walk-outline' : 'accessibility-outline'}
                onPress={() => setIsFollowingUser(!isFollowingUser)}
                style={{
                    bottom: 80,
                    right: 20
                }}
            />
            <FAB
                iconName="compass-outline"
                onPress={moveToCurrentLocation}
                style={{
                    bottom: 20,
                    right: 20
                }}
            />
        </View>
    )
};
export default CustomMap;

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    }
});