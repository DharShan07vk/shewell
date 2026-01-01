export type ICity = {
    id : string
    name: string
    stateId: string
    state: {
        name: string
    }
}

export type ICityForm = Omit<ICity, 'state'>;