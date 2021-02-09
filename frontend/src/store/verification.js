import {fetch as fetchy} from "../util/csrf.js";
export const PHONE_VERIFICATION = "./verification/PHONE_VERIFICATION"

const randomDigits = (digits) => ({
    type: PHONE_VERIFICATION,
    digits
})

const rapidKey = process.env.REACT_APP_RAPID_API

export const getRandomDigits = (phoneNumber) => async(dispatch) => {
    const digits = Math.floor(1000 + (8999)*Math.random())
    console.log("These are the digits", digits)
    console.log("this is the number", phoneNumber)
    const res = await fetch(`https://telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com/sms-verification-code?phoneNumber=${phoneNumber}&verifyCode=${digits}&appName=PhoLo`, {
	"method": "POST",
	"headers": {
		"x-rapidapi-key": `${process.env.REACT_APP_RAPID_API}`,
		"x-rapidapi-host": "telesign-telesign-send-sms-verification-code-v1.p.rapidapi.com"
	}
});
console.log(res)
console.log(rapidKey)
    dispatch(randomDigits(digits))
}


const initialState=[]

const verificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case PHONE_VERIFICATION: {
            return{
                ...state,
                digits: action.digits
            }
        }
        default: 
            return state;
    }
}

export default verificationReducer