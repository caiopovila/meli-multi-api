import { Paging } from "./interface_paging";

export interface TotalQuestions {
    date_from: Date,
    date_to: Date,
    total: number,
    user_id: string
}

export interface SearchQuestions {
    total: number,
    limit: number,
    questions: Array<Question>,
    filters: FilterQuestion,
    available_filters: Array<FilterQuestionData>,
    available_sorts: Array<string>
}

export interface FilterQuestion {
    limit: number,
    offset: number,
    is_admin: boolean,
    sorts: Array<any>,
    caller: number,
    seller: string | number
}

export interface FilterQuestionData {
    id: string,
    name: string,
    type: string,
    values: Array<string>
}

export interface Question {
    id: number,
    answer: QuestionAnswer,
    date_created: Date,
    deleted_from_listing: boolean,
    hold: boolean,
    item_id: string,
    seller_id: number,
    status: string,
    text: string,
    from: QuestionFrom
}

export interface QuestionAnswer {
    date_created: Date,
    status: string,
    text: string
}

export interface QuestionFrom {
    id: number,
    answered_questions: number
}

export interface BlackListQuestion {
        paging: Paging,
        users: Array<{id: number}>
}

export interface PostQuestion {
    text: string,
    item_id: string
}