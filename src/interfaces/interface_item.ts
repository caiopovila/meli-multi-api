import { Filter } from "./interface_filter";
import { Paging } from "./interface_paging";

export interface Item {
    id: number,
    site_id: string,
    title: string,
    subtitle: string,
    seller_id: number,
    category_id: string,
    official_store_id: number,
    price: number,
    base_price: number,
    original_price: number,
    currency_id: string,
    initial_quantity: number,
    available_quantity: number,
    sold_quantity: number,
    sale_terms: Array<SaleTerms>,
    buying_mode: string,
    listing_type_id: string,
    start_time: Date,
    stop_time: Date,
    condition: string,
    permalink: string,
    thumbnail: string,
    secure_thumbnail: string,
    pictures: Array<Pictures>,
    video_id: string | any,
    descriptions: Array<Descriptions>,
    accepts_mercadopago: boolean,
    non_mercado_pago_payment_methods: Array<any>,
    shipping: Shipping,
    international_delivery_mode: string,
    seller_address: SellerAddress,
    seller_contact: any,
    location: Object | any,
    geolocation: Geolocation,
    coverage_areas: Array<any>,
    attributes: Array<Attributes>,
    warnings: Array<any>,
    listing_source: string,
    variations: Array<Variations>,
    status: string,
    sub_status: Array<any>,
    tags: Array<string>,
    warranty: string,
    catalog_product_id: string,
    domain_id: string,
    parent_item_id: any,
    differential_pricing: any,
    deal_ids: Array<string>,
    automatic_relist: boolean,
    date_created: Date,
    last_updated: Date,
    health: number,
    catalog_listing: boolean
}

export interface SaleTerms {
    id: string,
    name: string,
    value_id: number | any,
    value_name: string,
    value_struct: ValueStruct,
    values: Array<SaleTermsValues>
}

export interface ValueStruct {
    number?: number,
    unit?: string
}

export interface SaleTermsValues {
    id: number,
    name: string,
    struct: ValueStruct
}

export interface Pictures {
    id: string,
    url: string,
    secure_url: string,
    size: string,
    max_size: string,
    quality: string
}

export interface Descriptions {
    id: string
}

export interface Shipping {
    mode: string,
    free_methods: Array<FreeMethods>,
    tags: Array<string>,
    dimensions: string | any,
    local_pick_up: boolean,
    free_shipping: boolean,
    logistic_type: string,
    store_pick_up: boolean
}

export interface FreeMethods {
    id: number,
    rule: Rule
}

export interface Rule {
    default: boolean,
    free_mode: string,
    free_shipping_flag: boolean,
    value: any
}

export interface SellerAddress extends Geolocation {
    city: SellerAddressCity,
    state: SellerAddressState,
    country: SellerAddressCountry,
    search_location: SearchLocation,
    id: number
}

export interface SellerAddressCity {
    id: string,
    name: string
}

export interface SellerAddressState extends SellerAddressCity { }

export interface Sort extends SellerAddressCity { }

export interface SellerAddressCountry extends SellerAddressCity { }

export interface SearchLocationNeighborhood extends SellerAddressCity { }

export interface AttributesValues extends SaleTermsValues { }

export interface SearchLocation {
    neighborhood: SearchLocationNeighborhood,
    city: SellerAddressCity,
    state: SellerAddressState
}

export interface Geolocation {
    latitude: number,
    longitude: number
}

export interface Attributes {
    id: string,
    name: string,
    value_id: string,
    value_name: string,
    value_struct: ValueStruct | any,
    values: Array<AttributesValues>,
    attribute_group_id: string,
    attribute_group_name: string
}

export interface Variations {
    id: number,
    price: number,
    attribute_combinations: Array<Attributes>,
    available_quantity: number,
    sold_quantity: number,
    sale_terms: Array<any>,
    picture_ids: Array<string>,
    catalog_product_id: string
}

export interface Description {
    plain_text: string
}

export interface DataSearchItem extends DataSearch<Item> {
    site_id: string,
    available_filters: Array<Filter>,
    filters: Array<Filter>
}

export interface ItemsClient extends DataSearch<string> {
    seller_id: string
}

export interface DataSearch<T> {
    query: string,
    paging: Paging,
    results: Array<T>,
    orders?: Array<Sort>,
    available_orders?: Array<Sort | any>,
    available_sorts?: Array<Sort | any>,
    sort?: Array<Sort> | Sort,
} 