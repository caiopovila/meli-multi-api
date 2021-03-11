import { Paging } from "./interface_paging";

export interface DataSearchClaim {
    paging: Paging,
    data: Array<DataClaim>
}

export interface DataClaim {
    id: number | any,
    type: TypeClaimType,
    stage: StageType,
    status: StatusType,
    parent_id: any,
    client_id: any,
    resource_id: number | any,
    resource: ResourceType,
    reason_id: string,
    players: Array<Player>,
    resolution: Resolution,
    labels: Array<any>,
    site_id: string,
    date_created: Date,
    last_updated: Date
}

export interface Resolution {
    reason: string,
    date_created: Date,
    benefited: Array<string>,
    closed_by: string
}

export interface Player {
    role: PlayerType,
    type: ResourceType,
    user_id: number,
    available_actions: Array<Action>
}

export interface Action {
    action: ActionType,
    due_date: Date,
    mandatory: boolean
}

export interface FilterDataClaim extends Paging {
    status: StatusType,
    stage?: StageType,
    type?: string,
    id?: number | string
}

export interface MessageClaim {
    sender_role: PlayerType,
    receiver_role: PlayerType,
    attachments: Array<Attachments>,
    stage: StageType,
    date_created: Date,
    message: string,
}

export interface Attachments {
    filename: string,
    original_filename: string,
    size: number,
    type: string,
    date_created: Date
}

export interface PostMessageClaim {
    receiver_role: PlayerType,
    message: string,
    attachments?: Array<string>
}

export interface ResponsePostMessageClaim {
    id: number
}

export interface ResponseAttachmentsPostMessageClaim {
    user_id: number,
    filename: string,
    render_url: string
}

export interface ExpectedResolutionsClaim {
    player_role: PlayerType,
    user_id: number,
    expected_resolution: ExpectedResolutionsClaimType,
    date_created: Date,
    last_updated: Date,
    status: ExpectedResolutionsClaimStatusType
}

export interface EvidenceClaim {
    attachments: Array<Attachments>,
    type: EvidenceClaimType,
    date_shipped: Date,
    date_delivered: Date,
    destination_agency: string,
    receiver_email: string,
    receiver_id: string,
    receiver_name: string,
    shipping_company_name: string,
    shipping_method: ShippingMethodType,
    tracking_number: string,
    handling_date?: Date
}

export interface StatusHistoryClaim {
    stage: StageType,
    status: StatusType,
    date: Date,
    change_by: PlayerType
}

export interface DetailClaim {
    id: string,
    name: string,
    detail: string,
    flow: string,
    position: number,
    site_id: string,
    parent_id: string,
    status: string,
    categories: Array<any>,
    expected_resolutions: Array<ExpectedResolutionsClaimType>,
    date_created: Date,
    last_updated: Date
}

export type ShippingMethodType = 'mail' | 'entrusted' | 'personal_delivery' | 'email';
 
export type EvidenceClaimType = 'handling_shipping_evidence' | 'shipping_evidence';

export type ExpectedResolutionsClaimStatusType = 'pending' | 'accepted' | 'rejected';

export type ExpectedResolutionsClaimType = 'refund' | 'product' | 'change_product' | 'return_product';

export type TypeClaimType = 'mediations' | 'cancel_purchase' | 'return' | 'cancel_sale';

export type StageType = 'claim' | 'dispute' | 'recontact' | 'none';

export type StatusType = 'opened' | 'closed';

export type ResourceType = 'payment' | 'order' | 'shipment' | 'purchase';

export type PlayerType = "respondent" | "complainant" | "mediator";

export type ActionType = 'send_message_to_complainant' | 'send_message_to_mediator' | 'recontact' | 'refund' | 'open_dispute' | 'send_potential_shipping' | 'add_shipping_evidence' | 'send_attachments' | 'allow_return_label' | 'send_tracking_number';
