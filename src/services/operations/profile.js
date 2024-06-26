import toast from "react-hot-toast";
import axios from "axios";


export const getProfile = async (email) => {
  let result = null;
 // console.log(email);
  const toastId = toast.loading("Loading...");

  try {
    console.log(" here email is",email);
      const response = await axios.get("http://localhost:4000/api/v1/profile/getProfileByEmail",
    {
      params: { email }
    });
   // console.log("response is ",response);
      result = response.data.data;
     // console.log("result fetch hua bhi hai ya nhi",result);
      toast.success("Profile is ready");
      toast.dismiss(toastId);
      return result;
  } catch (error) {
      console.log("GET PRofile API ERROR............", error);
      toast.error(error.message);
  }
  
};
export const updateProfile = async (email, updates) => {
  try {
    console.log(email,updates);
    const response = await axios.put(`http://localhost:4000/api/v1/profile/updateProfile/${email}`, updates);

    return response.data; // Return updated profile data
  } catch (error) {
    console.error('Error updating profile:', error.message);
    throw error; // Propagate error to caller
  }
};