export type userDataType = {
    userId: string | null,
    token: string | null
    customerId: string | null
}

// TODO : change any type
export type criteriaType = {
    arrivalDate: any,
    departureDate: any,
    roomTypes: string,
    peopleNbr: number,
}

export type userProfileType = {
    dateCreated: string | null,
    email: string | null,
    pseudo: string | null,
    dateUpdate: string | null,
    //firstName: string | null,
    //lastName: string | null
}