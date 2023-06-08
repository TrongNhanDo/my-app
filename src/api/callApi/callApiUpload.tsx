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

export const upLoadImage = async (
   images: string[] | File[]
): Promise<string[]> => {
   const PRESET_NAME = import.meta.env.VITE_PRESET_NAME;
   const FOLDER_NAME = import.meta.env.VITE_FOLDER_NAME;
   const API_URL = import.meta.env.VITE_CLOUDINARY_API_URL;
   const arrayUrl: string[] = [];
   const formData = new FormData();
   formData.append("upload_preset", PRESET_NAME);
   formData.append("folder", FOLDER_NAME);
   if (images && images.length) {
      for (const file of images) {
         formData.append("file", file);
         await callApiUpload(API_URL, "POST", formData)
            .then((res) => (res.data.url ? arrayUrl.push(res.data.url) : ""))
            .catch((err) => console.log(err));
      }
   }
   return arrayUrl;
};
