export type TodoItem = {
    id: number,
    name: string,
    completed: boolean,
    date?: Date | undefined,
    updated?: Date | undefined,
    time?: number | undefined
}