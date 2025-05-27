const baseurl = import.meta.env.VITE_BASE_URL;
import axios from "axios"


export const register = async () => {
  try {
    const res = await axios.post(`${baseurl}users/register`, {
      user_id: "1234",
      password: "gehan",
    });
    if(res.status === 201){
        console.log("201")
    }
  } catch (error) {
    console.log("Error", error);
  }
};
