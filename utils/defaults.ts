import {userProfileType, userDataType, bookingType} from "../utils/types";

export const defaultUserData: userDataType = {
  user_id: null,
  token: null,
  customerId: null
}

export const defaultProfile: userProfileType = {
  dateCreated: null,
  email: null,
  pseudo: null,
  dateUpdate: null
  //firstName: null,
  //lastName: null
}


export const defaultBooking: bookingType = {
  booking_id: 0,
  option_list: null,
}