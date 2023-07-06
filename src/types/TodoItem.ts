export type TodoItem = {
    id: number,
    name: string,
    completed: boolean,
    day?: string | undefined,
    updated?: boolean | undefined,
    time?: string | undefined
}