export interface ValidationOk {
    S?: String
}

export interface ValidationError {
    E?: String
}

export interface Validation extends ValidationError, ValidationOk { }