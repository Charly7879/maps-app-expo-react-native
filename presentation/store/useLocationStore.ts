import { getCurrentLocation, watchCurrentPosition } from "@/core/actions/location/location";
import { LatLng } from "@/infrastructure/interfaces/lat-lng";
import { LocationSubscription } from "expo-location";
import { create } from "zustand";

interface LocationState {
    lastKnownLocation: LatLng | null;
    userLocationList: LatLng[];
    watchSubscriptionID: LocationSubscription | null;

    getLocation: () => Promise<LatLng>;
    watchLocation: () => void;
    clearWatchLocation: () => void;
}

/**
 * useLocationStore
 * Retorna un objeto de "zustand", gestor de estados.
 */
export const useLocationStore = create<LocationState>()((set, get) => ({
    lastKnownLocation: null,
    userLocationList: [],
    watchSubscriptionID: null,

    getLocation: async () => {
        const location = await getCurrentLocation();
        set({ lastKnownLocation: location });

        return location;
    },

    watchLocation: async () => {
        const oldSubscription = get().watchSubscriptionID;

        /** Sí hay una subscripción anterior, limpiar subscriptions */
        if (oldSubscription !== null) {
            get().clearWatchLocation();
        }

        const watchSubscription = await watchCurrentPosition((latLng) => {

            // Coordenadas
            //console.log(get().userLocationList);

            set({
                lastKnownLocation: latLng,
                userLocationList: [...get().userLocationList, latLng],
            });
        });

        set({ watchSubscriptionID: watchSubscription });
    },

    clearWatchLocation: () => {
        const subscription = get().watchSubscriptionID;

        if (subscription !== null) {
            subscription.remove();
        }
    },
}));