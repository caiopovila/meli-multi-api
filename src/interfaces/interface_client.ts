export interface Client {
    access_token?: string,
    refresh_token?: string,
    user_id?: number,
    id_client?: number,
    nickname?: string,
    site_id?: string,
    expires_in?: Date,
    user?: number,
}

export interface DataClient {
    id: number,
    nickname: string,
    registration_date: Date,
    first_name: string,
    last_name: string,
    country_id: string,
    email: string,
    identification: Identification,
    address: Address,
    phone: Phone,
    alternative_phone: AlternativePhone,
    user_type: string,
    tags: Array<string>,
    logo: any,
    points: number,
    site_id: string,
    permalink: string,
    shipping_modes: Array<string>,
    seller_experience: string,
    seller_reputation: SellerReputation,
    buyer_reputation: BuyerReputation,
    status: Status,
    credit: Credit
}

export interface Identification {
    type: string,
    number: string
}

export interface Address {
    state: string,
    city: string,
    address: string,
    zip_code: string
}

export interface Phone {
    area_code: string,
    number: string,
    extension: string,
    verified: boolean
}

export interface AlternativePhone {
    area_code: string,
    number: string,
    extension: string
}

export interface SellerReputation {
    level_id: any,
    metrics: Metrics,
    power_seller_status: any,
    transactions: Transactions
}

export interface Metrics {
    cancellations: MetricDetail,
    claims: MetricDetail,
    delayed_handling_time: MetricDetail,
    sales: MetricDetail,
    power_seller_status: MetricDetail | any
}

export interface MetricDetail {
    period: string,
    rate?: number,
    value: number
}

export interface Transactions {
    period: string,
    total: number,
    completed: number,
    canceled: number | any,
    ratings: Ratings
}

export interface Ratings {
    positive: number,
    negative: number,
    neutral: number
}

export interface BuyerReputation {
    canceled_transactions: number,
    transactions: TransactionsBuyer,
    tags: Array<any>
}

export interface TransactionsBuyer extends Transactions {
    canceled: TransactionsBuyerCanceled,
    unrated: TransactionsBuyerUnrated,
    not_yet_rated: TransactionsBuyerNotYetRated
}

export interface TransactionsBuyerCanceled {
    total: any,
    paid: any
}

export interface TransactionsBuyerUnrated extends TransactionsBuyerCanceled { }

export interface TransactionsBuyerNotYetRated extends TransactionsBuyerCanceled {
    units: any
}

export interface Status {
    site_status: string,
    list: StatusDetails,
    buy: StatusDetails,
    sell: StatusDetails,
    billing: StatusDetails,
    mercadopago_tc_accepted: boolean,
    mercadopago_account_type: string,
    mercadoenvios: string,
    immediate_payment: boolean,
    confirmed_email: boolean,
    user_type: string,
    required_action: string
}

export interface StatusDetails {
    allow: boolean,
    codes: Array<any>,
    immediate_payment?: StatusDetailsPayment
}

export interface StatusDetailsPayment {
    required: boolean,
    reasons: Array<any>
}

export interface Credit {
    consumed: number,
    credit_level_id: string,
    rank: string
}

export interface AccessToken {
    access_token: string,
    token_type: string,
    expires_in: number,
    scope: string,
    user_id: number,
    refresh_token: string
}