export type userDataType = {
    userId: string | null,
    token: string | null
    customerId: string | null
}

// TODO : change any type
export type criteriaType = {
    startDate: any,
    endDate: any,
    roomType: number,
    roomTitle: string,
    peopleNbr: number,
}

export type userProfileType = {
    dateCreated: string | null,
    email: string | null,
    pseudo: string | null,
    dateUpdate: string | null
    //firstName: string | null,
    //lastName: string | null
}


export type bookingType = {
    reservationID: string | null,
}

export type credentials = {
    id: string,
    token: string,
    role: string,
    customer: string
}