import supabase from "../supabase";

export const saveGoogleUserAPI = async (user)=>{
    const {data, error} = await supabase.from('TB_USERS').upsert({
        id:user.id,
        email: user.email,
        name: user.name || user.email.split('@')[0],
        // profile: user.profile,   
        created_at:new Date().toISOString(),
    });

    if(error){
        console.error("Error saving user to database", error.message);
        return null;
    }
    return data;
}