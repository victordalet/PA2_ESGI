export interface Ticket {
    id?: number;
    created_at?: string;
    updated_at?: string;
    deleted_at?: string;
    created_by: string;
    name: string;
    description: string;
    status: string;
    occupy_by: string;
    message?: MessageTicket[];
}

export interface MessageTicket {
    ticket_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    created_by: string;
    message: string;
}