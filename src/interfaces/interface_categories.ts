import { Sort } from "./interface_item";

export interface Category extends Sort { }

export interface DomainDiscovery {
    domain_id: string,
    domain_name: string,
    category_id: string,
    category_name: string,
    attributes: Array<any>
}