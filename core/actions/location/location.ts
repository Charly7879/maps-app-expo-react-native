import { LatLng } from "@/infrastructure/interfaces/lat-lng";
import * as Location from 'expo-location';

/**
 * getCurrentLocation:
 * Obtener la ubicación del usuario.
 */
export const getCurrentLocation = async (): Promise<LatLng> => {
    try {

        /** Calidad de la ubicación del usuario */
        const { coords } = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
        });

        return {
            latitude: coords.latitude,
            longitude: coords.longitude,
        };
    } catch (error) {
        throw new Error('Error getting users location');
    }
};

/**
 * watchCurrentPosition
 * Retorna la información de la hubicación del usuario
 */
export const watchCurrentPosition = (
    locationCallback: (location: LatLng) => void
) => {
    return Location.watchPositionAsync(
        {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 10,
        },
        ({ coords }) => {
            locationCallback({
                latitude: coords.latitude,
                longitude: coords.longitude,
            });
        }
    );
};