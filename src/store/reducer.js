/* eslint-disable prettier/prettier */
import { LOGIN,SIGNOUT} from "./constants";

const initialState={
    isLoggedIn:false,
    userId:'',
}
export const inkartReducer=(state=initialState,action)=>{
switch (action.type) {
    case LOGIN:
        const {userId,firstName,lastName,email,profileImage}=action.payload;
        return{
            ...state,
            userId:action.payload.userId,
            isLoggedIn:true,    
        };
        case SIGNOUT:
        return{
            ...state,
            userId:'',
            isLoggedIn:false,
        };          
    default:
        return state;
}

}