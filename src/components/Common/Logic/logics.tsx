import { Currency } from 'react-tender';
import { ToastPosition, TypeOptions, toast } from 'react-toastify';
import { format } from 'date-fns';
import axios from 'axios';

export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  return format(date, 'HH:mm:ss dd/MM/yyyy');
};

export const formatCurrency = (
  money: number | string,
  currency?: string,
  locale?: string
) => {
  return (
    <Currency
      value={parseFloat(money.toString()) || 0}
      currency={currency || 'VND'}
      locale={locale || 'vi'}
    />
  );
};

export const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const scrollTop = () => {
  window.scrollTo(0, 0);
};

export const checkIsAdmin = (pathname: string) => {
  if (pathname && pathname.includes('admin')) {
    return true;
  }

  return false;
};

export const renderStar = (rate: number) => {
  const stars = [];
  for (let index = 1; index <= 5; index++) {
    stars.push(
      <button
        key={index}
        type="button"
        className="w-fit inline-block"
        disabled={true}
      >
        {index <= rate ? (
          <i className="fa-solid fa-star" style={{ color: '#d2d51a' }}></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </button>
    );
  }
  return stars;
};

export enum ToastTypeOptions {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export enum ToastPositionOptions {
  TopRight = 'top-right',
  TopCenter = 'top-center',
  TopLeft = 'top-left',
  BotRight = 'bottom-right',
  BotCenter = 'bottom-center',
  BotLeft = 'bottom-left',
}

export const showToast = (
  message?: string,
  type?: TypeOptions,
  position?: ToastPosition,
  closeTime?: number
) => {
  if (!message) return;
  return toast(message, {
    position: position ? position : 'top-right',
    type: type ? type : 'default',
    autoClose: closeTime || 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    pauseOnFocusLoss: false,
  });
};

export enum MethodProps {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  DELETE = 'delete',
}

export const callApi = (
  url: string,
  method: MethodProps,
  data?: object
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const requestApi = {
    method: method,
    url: import.meta.env.VITE_API_URL + url,
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  };

  return axios(requestApi);
};

export const callApiUpload = (
  url: string,
  method: string,
  data?: FormData
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const requestApi = {
    method: method,
    url: url,
    headers: {
      'Content-Type': 'multipart/form-data',
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
  formData.append('upload_preset', PRESET_NAME);
  formData.append('folder', FOLDER_NAME);
  if (images && images.length) {
    for (const file of images) {
      formData.append('file', file);
      await callApiUpload(API_URL, 'POST', formData)
        .then((res) => (res.data.url ? arrayUrl.push(res.data.url) : ''))
        .catch((err) => console.log(err));
    }
  }
  return arrayUrl;
};

export const getExpireCookie = () => {
  const expiresDate = new Date();
  expiresDate.setTime(expiresDate.getTime() + 2 * 60 * 60 * 1000);

  return expiresDate;
};
