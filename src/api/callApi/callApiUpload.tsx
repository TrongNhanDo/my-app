import axios from "axios";

export const callApiUpload = (
   url: string,
   method: string,
   data?: FormData
): Promise<any> => {
   const requestApi = {
      method: method,
      url: url,
      headers: {
         "Content-Type": "multipart/form-data",
      },
      data: data,
   };

   return axios(requestApi);
};
