export interface Filter {
    id: string,
    name: string,
    type: string,
    values: Array<FilterValues>
}

export interface FilterValues {
    id: string
    name: string
    results: number
}