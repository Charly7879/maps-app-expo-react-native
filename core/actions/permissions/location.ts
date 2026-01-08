import { PermissionStatus } from "@/infrastructure/interfaces/location";
import * as Location from 'expo-location';
import { Alert, Linking } from "react-native";

// Pedir permisos al usuario
export const requestLocationPermission = async (): Promise<PermissionStatus> => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
        if (status === 'denied') {
            manualLocationPermissionRequest();
        }

        return PermissionStatus.DENIED;
    }

    return PermissionStatus.GRANTED;
};

// Comprobar permisos y sí no están disponible llamar a requestLocationPermission()
export const checkLocationPermission = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();

    switch (status) {
        case 'granted':
            return PermissionStatus.GRANTED;
        case 'denied':
            return PermissionStatus.DENIED;
        default:
            return PermissionStatus.UNDETERMINED;
    }
};

// Mostrar ajustes de la aplicación
export const manualLocationPermissionRequest = async () => {
    Alert.alert(
        'Permisos de ubicación necesario',
        'Para continuar debe habilitar el permiso de ubicación en ajustes de la app',
        [
            {
                text: 'Abrir ajustes',
                onPress: () => {
                    Linking.openSettings();
                }
            },
            {
                text: 'Cancelar',
                style: 'destructive',
            }
        ]
    );
};