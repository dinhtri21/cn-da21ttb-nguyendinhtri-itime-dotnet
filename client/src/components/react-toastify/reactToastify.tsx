import { toast, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const defaultOptions = {
    position: "bottom-right" as ToastPosition,
    autoClose: 5000, // 5 giây
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

const CustomToast = {
   showSuccess (message: string) {
    toast.success(message, defaultOptions);
  },

   showError (message: string) {
    toast.error(message, defaultOptions);
  },

   showWarning (message: string) {
    toast.warn(message, defaultOptions);
  },

   showInfo (message: string) {
    toast.info(message, defaultOptions);
  },
};

export default CustomToast;


