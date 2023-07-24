import axios from "axios";
//@ts-ignore
import {API_URL} from '@env'
import {credentials} from "./types";


// from log in => get data
export async function getUserData({id, token}:credentials): Promise<any> {
    console.log("get user data", id, token)
    return axios.get(API_URL+"user/"+id, {
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }).then((resp) => {
        console.log("-------------------------------------")
        console.log("user:", resp.data)
        console.log("-------------------------------------")
        return resp.data
    })
        .catch(err => console.log("err", err))
}

// from log in is customer=> get more data
export async function getCustomerData({id, token}:credentials): Promise<any> {
    console.log("get customer data", id, token)
    return axios.get(API_URL+"customer/"+id, {
        headers:{
            'Authorization': `Bearer ${token}`
        }
    }).then((resp) => {
        console.log("-------------------------------------")
        console.log("customer:", resp.data)
        console.log("-------------------------------------")
        return {data: resp.data, cred: {id, token}}
    })
        .catch(err => console.log("err", err))
}

