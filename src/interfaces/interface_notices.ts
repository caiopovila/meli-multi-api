import { Paging } from "./interface_paging";

export interface ListNotices {
    paging: Paging,
    result: Array<Notice>
}

export interface Notice {
    actions: Array<Object>,
    id: string,
    label: string,
    description: string
}