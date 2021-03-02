export interface Balance {
    user_id: number,
    total_amount: number,
    pending_to_review: number,
    available_balance: number,
    unavailable_balance: number,
    currency_id: string,
    tags: Array<any>,
    block_reason: any,
    unavailable_balance_by_reason: Array<UnavailableBalanceByReason>,
    available_balance_by_transaction_type: Array<AvailableBalanceByTransactionType>
}

export interface UnavailableBalanceByReason {
    reason: string,
    amount: number
}

export interface AvailableBalanceByTransactionType {
    transaction_type: string,
    amount: number
}