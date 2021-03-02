export interface TotalVisits {
    user_id: number,
    date_from: Date,
    date_to: Date,
    total_visits: number,
    visits_detail: Array<any>
}