/**
 * Interfaz de estado de los permisos de locations
 */
export enum PermissionStatus {
    /** Comprobado */
    CHECKING = 'checking',

    /** Otorgado/Aceptado */
    GRANTED = 'GRANTED',

    /** Denegado */
    DENIED = 'DENIED',

    /** Permiso bloqueado por el usuario */
    BLOCKED = 'BLOQUED',

    /** Limitado por el usuario */
    LIMITED = 'LIMITED',

    /** No disponible */
    UNAVALABLE = 'UNAVALABLE',

    /** Indeterminado sí está otorgado o no */
    UNDETERMINED = 'UNAVALABLEUNDETERMINED',
}