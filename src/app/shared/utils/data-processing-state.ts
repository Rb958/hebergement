export enum DataStateEnum {
    LOADING,
    LOADED,
    ERROR
}

export interface DataStateProcessing<T> {
    dataState?: DataStateEnum;
    data?: T;
    message?: string;
}
