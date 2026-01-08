/**
 * usePermissionsStorage:
 * Maneja los estados de los permisos para location utilizando
 * la librería:
 * https://zustand-demo.pmnd.rs/
 */
import { checkLocationPermission, requestLocationPermission } from "@/core/actions/permissions/location";
import { PermissionStatus } from "@/infrastructure/interfaces/location";
import { create } from "zustand";

interface PermissionState {
    locationStatus: PermissionStatus;

    requestLocationPermission: () => Promise<PermissionStatus>;
    checkLocationPermission: () => Promise<PermissionStatus>;
}

export const usePermissionsStorage = create<PermissionState>()((set) => ({
    locationStatus: PermissionStatus.CHECKING,

    requestLocationPermission: async () => {

        /** Consultar el estado */
        const status = await requestLocationPermission();

        /** Actualizar el estado actual */
        set({ locationStatus: status })

        return status;
    },

    checkLocationPermission: async () => {
        /** Consultar el estado */
        const status = await checkLocationPermission();

        /** Actualizar el estado actual */
        set({ locationStatus: status });

        return status;
    },
}));