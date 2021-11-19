export type Action<T extends string, P = any> = {
    type: T,
    payload?: P
}

export type ActionCreator<T extends string, P = any> = (payload?: P) => Action<T, P>