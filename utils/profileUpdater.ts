import {userProfileType} from "./types";
import {useContext} from "react";
import {UserProfileContext} from "../App";
import axios from "axios";
//@ts-ignore
import {API_URL} from '@env'


// from log in => get data
export async function getProfileData(id, token) {
    console.log("get profile data", id, token)
    return axios.get(API_URL+"user/"+id, {
        headers:{
            'Authorization': `Bearer ${token}`
            }
    }).then((resp) => {
        console.log("-------------------------------------")
        console.log("youhou", resp.data)
        console.log("-------------------------------------")
        return resp.data
    })
        .catch(err => console.log("err", err))
}



// from signup or after getting data
export function updateUserProfile(data: userProfileType) {
    const {userProfile, setUserProfile} = useContext(UserProfileContext)

    setUserProfile(data)
}

