import { Sort } from "./interface_item";
import { Paging } from "./interface_paging";

export interface MessagePacks {
    paging: Paging,
    conversation_status: ConversationStatus,
    messages: Array<Pack>,
    seller_max_message_length: number,
    buyer_max_message_length: number
}

export interface ConversationStatus {
    path: string,
    status: string,
    substatus: string,
    status_date: Date,
    status_update_allowed: boolean,
    claim_id: any,
    shipping_id: any
}

export interface Pack {
    id: string,
    site_id: string,
    client_id: number,
    from: From,
    to: To,
    status: string,
    subject: any,
    text: string,
    message_date: MessageDate,
    message_moderation: MessageModaration,
    message_attachments: any,
    message_resources: Array<MessageResource>,
    conversation_first_message: boolean
}

export interface From {
    user_id: string,
    email: string,
    name: string
}

export interface To extends From { }

export interface MessageResource extends Sort { }

export interface MessageDate {
    received: Date,
    available: Date,
    notified: Date,
    created: Date,
    read: any
}

export interface MessageModaration {
    status: string,
    reason: any,
    source: string,
    moderation_date: Date
}