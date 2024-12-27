import supabase from "../supabase";
import {v4 as uuidv4} from "uuid";

export const saveGoogleUserAPI = async (user)=>{
    const {data, error} = await supabase.from('users').upsert({
        id:uuidv4(),
        email: user.email,
        name: user.name || user.email.split('@')[0],
        // email:"234@naver.com",
        // name:"hi",
        // created_at:new Date().toISOString(),
    }, {onConflict:'email'}).select();
    // console.log(data)

    if(error){
        console.error("Error saving user to database", error.message);
        return null;
    }
    return data;
}