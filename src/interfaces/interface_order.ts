import { Phone } from "./interface_client";
import { DataSearch } from "./interface_item";

export interface SearchOrder extends DataSearch<Order> {
    seller_id: string,
    display: string
}

export interface Order  {
    seller: OrderSeller,
    payments: Array<PaymentData>,
    fulfilled: boolean,
    buying_mode: string,
    taxes: {
        amount: any,
        currency_id: any
    },
    order_request: {
        change: any,
        return: any
    },
    expiration_date: Date,
    feedback: {
        sale: any,
        purchase: any
    },
    shipping: {
        id: number
    },
    date_closed: Date,
    id: Number,
    manufacturing_ending_date: any,
    hidden_for_seller: boolean,
    order_items: Array<OrderItem>,
    date_last_updated: Date,
    last_updated: Date,
    comments: any,
    pack_id: any,
    coupon: {
        amount: number,
        id: any
    },
    shipping_cost: number,
    date_created: Date,
    application_id: string,
    pickup_id: any,
    status_detail: any,
    tags: Array<string>,
    buyer: OrderBuyer,
    total_amount: number,
    paid_amount: number,
    mediations: Array<any>,
    currency_id: string,
    status: string
}

export interface OrderSeller {
    phone: Phone,
    alternative_phone: Phone,
    nickname: string,
    last_name: string,
    id: number,
    first_name: string,
    email: string
}

export interface OrderBuyer extends OrderSeller {
    billing_info: {
        doc_number: string,
        doc_type: string
    }
}

export interface PaymentData {
    reason: string,
    status_code: any,
    total_paid_amount: number,
    operation_type: string,
    transaction_amount: number,
    date_approved: Date,
    collector: {
        id: number
    },
    coupon_id: any,
    installments: number,
    authorization_code: string,
    taxes_amount: number,
    id: number,
    date_last_modified: Date,
    coupon_amount: number,
    available_actions: Array<string>,
    shipping_cost: number,
    installment_amount: number,
    date_created: Date,
    activation_uri: any,
    overpaid_amount: number,
    card_id: number,
    status_detail: string,
    issuer_id: string,
    payment_method_id: string,
    payment_type: string,
    deferred_period: any,
    atm_transfer_reference: {
        transaction_id: string,
        company_id: string | number
    },
    site_id: string,
    payer_id: number,
    marketplace_fee: number,
    order_id: number,
    currency_id: string,
    status: string,
    transaction_order_id: any
}

export interface OrderItem {
    item: OrderItemData,
    quantity: number,
    differential_pricing_id: any,
    sale_fee: number,
    listing_type_id: string,
    base_currency_id: any,
    unit_price: number,
    full_unit_price: number,
    base_exchange_rate: any,
    currency_id: string,
    manufacturing_days: any
}

export interface OrderItemData {
    seller_custom_field: any,
    condition: string,
    category_id: string,
    variation_id: any,
    variation_attributes: Array<any>,
    seller_sku: string | number | any,
    warranty: string,
    id: string,
    title: string
}

export interface BlackListOrder {
    user: {
        id: number,
        blocked: boolean
    }
}