import { ACCOUNT_LOGIN, CREATE_ACCOUNT } from "@/constants/ApiConstant"
import { handleError } from "@/helpers/ErrorHandler"
import { SignupFormValues } from "@/models/SignupForm";
import { userProfileToken } from "@/models/User";
import axios from "axios"



export const loginAPI = async(email: string, password: string) => {
    try {
        const data = await axios.post<userProfileToken>(
            ACCOUNT_LOGIN,
            {email: email, password: password,},
            {headers: { "Content-Type": "application/json" },},
        );
        return data;
    } catch (error) {
        handleError(error)
    }
}


export const registerAPI = async(userDetails: SignupFormValues) => {
    try {
        const data = await axios.post<userProfileToken>(
            CREATE_ACCOUNT,
            userDetails,
            {headers: { "Content-Type": "application/json" },},
        );
        return data;
    } catch (error) {
        handleError(error)
    }
}