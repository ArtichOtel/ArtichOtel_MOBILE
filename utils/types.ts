export type userDataType = {
    user_id: string | null,
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
    booking_id: number,
    option_list: any,
}

export type credentials = {
    user_id: string,
    token: string,
    role: string,
    customer: string
}