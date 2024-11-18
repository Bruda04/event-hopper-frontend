export interface Service {
    id?: number;
    name: string;
    description: string;
    category: string;
    basePrice: number;
    discount: number;
    finalPrice: number;
    visible: boolean;
    available: boolean;
    duration: number;
    cancellationWindow: number;
    reservationWindow: number;
    autoAccept: boolean;
}
