// import { useGoogleLogin } from "@react-oauth/google";
// import { saveGoogleUserAPI } from "../api/auth";
// import supabase from "../supabase";

// export const useLogin= ()=>{
//     const login = useGoogleLogin({
//         onSuccess: async (credentialResponse) => {
//           console.log("Google Response:", credentialResponse);
    
//           // Supabase Auth에 로그인 처리
//           const { data, error } = await supabase.auth.signInWithOAuth({
//             provider: "google",
//             options: {
//             //   redirectTo: window.location.origin, // 현재 도메인으로 리디렉션
//               redirectTo:"http://localhost:5173/auth/callback", // 현재 도메인으로 리디렉션
//             },
//           });
    
//           if (error) {
//             console.error("Error during Supabase OAuth login:", error.message);
//             return;
//           }
//           console.log(data)
//           // 사용자 정보를 Supabase `users` 테이블에 저장
//           const user = {
//             id: data.user.id,
//             email: data.user.email,
//             name: data.user.user_metadata.full_name,
//           };

//           console.log(user)
    
//           const savedUser = await saveGoogleUserAPI(user);
    
//           if (savedUser) {
//             console.log("User saved to database:", savedUser);
//           } else {
//             console.error("Failed to save user to database.");
//           }
//         },
//         flow: "auth-code",
//       });
//     return login;
    
// }