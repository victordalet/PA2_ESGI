export interface Facture {
    id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    created_by: string;
    name?: string;
    description?: string;
    price?: number;
    duration?: number;
    type: string;
    notification?: number;
    notification_interval?: number;
}
export interface FactureIntermediary {
    facture_id: number;
    other_id: number;
}
