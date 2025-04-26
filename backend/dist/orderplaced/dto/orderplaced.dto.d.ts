export declare enum OrderStatus {
    ACCEPTED = "ACCEPTED",
    ONTHEWAY = "ONTHEWAY",
    DELIVERED = "DELIVERED",
    CANCELLED = "CANCELLED"
}
export declare class OrderPlacedDto {
    productId: number;
    quantity: number;
    totalPrice: number;
    status: OrderStatus;
}
