import { Paging } from "./interface_paging";

export interface DataSearchClaim {
    paging: Paging,
    data: Array<DataClaim>
}

export interface DataClaim {
    id: number | any,
    type: string | any,
    stage: string | any,
    status: string | any,
    parent_id: any,
    client_id: any,
    resource_id: number | any,
    resource: string | any,
    reason_id: string | any,
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
    role: string | any,
    type: string | any,
    user_id: number | any,
    available_actions: Array<Action>
}

export interface Action {
    action: string | any,
    due_date: Date,
    mandatory: any
}