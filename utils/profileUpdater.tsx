import axios from "axios";
//@ts-ignore
import {API_URL} from '@env'
import {credentials} from "./types";


// from log in => get data
export async function getUserData({ cred }): Promise<any> {
  console.log("get user data", cred.user_id, cred.token);
  return axios
    .get(API_URL + "user/" + cred.user_id, {
      headers: {
        Authorization: `Bearer ${cred.token}`,
      },
    })
    .then((resp) => {
      //   console.log("-------------------------------------");
      //   console.log("user:", resp.data);
      //   console.log("-------------------------------------");
      return { data: resp.data, cred: cred };
    })
    .catch((err) => console.log("err", err));
}



// from log in if is customer=> get more data
export async function getCustomerData({cred}): Promise<any> {
    console.log("get customer data", cred.customer, cred.token)
    return axios.get(API_URL+"customer/"+cred.customer, {
        headers:{
            'Authorization': `Bearer ${cred.token}`
        }
    }).then((resp) => {
        console.log("-------------------------------------")
        console.log("customer:", resp.data)
        console.log("-------------------------------------")
        return {data: resp.data, cred: cred}
    })
        .catch(err => console.log("err", err))
}

