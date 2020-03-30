import axios from 'axios';
export const signInRequest = async  (info, setProfileInfo, setRedirect) =>{
    let response = await axios.post("/api/signin", info);
    console.log(response.status);
    if (response.status === 200) {
      setProfileInfo(response.data);
      setRedirect(true);
    }
}