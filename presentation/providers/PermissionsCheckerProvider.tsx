import { PermissionStatus } from "@/infrastructure/interfaces/location";
import { usePermissionsStorage } from "@/presentation/store/usePermissionsStore";
import { router } from "expo-router";
import { PropsWithChildren, useEffect } from "react";
import { AppState } from "react-native";

const PermissionsCheckerProvider = ({ children }: PropsWithChildren) => {
    const { locationStatus, checkLocationPermission } = usePermissionsStorage();

    useEffect(() => {
        if (locationStatus === PermissionStatus.GRANTED) {
            router.replace('/map');
        } else if (locationStatus !== PermissionStatus.CHECKING) {
            router.replace('/permissions');
        }
    }, [locationStatus]);

    useEffect(() => {
        checkLocationPermission();
    }, []);

    /** 
     * Comprobar el estado de la app cuando cambie 
     * y limpiar las subscripciones de eventos.
    */
    useEffect(() => {
        // Subscripción
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            // Sí el estado es "active", comprobar de nuevo los permisos
            if (nextAppState === 'active') {
                checkLocationPermission();
            }
        });

        return () => {
            // eliminar la subscripción cuando ya no es necesaria
            subscription.remove();
        };
    }, []);

    return (
        <>{children}</>
    );
};
export default PermissionsCheckerProvider;