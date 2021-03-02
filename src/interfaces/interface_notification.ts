export interface Notification {
    resource: string,
    user_id: number,
    topic: string,
    application_id: number,
    attempts: number,
    sent: Date,
    received: Date
}

export  interface MessagesNotification {
    messages: Array<Notification>
}