import React, { useEffect } from 'react';

interface ToastProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  color: string;
}

const Toast = (props: ToastProps) => {
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (props.open) {
      timer = setTimeout(() => {
        props.setOpen(false);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [props.open, props.setOpen]);

  const closeToast = () => {
    props.setOpen(false);
  };

  return (
    <>
      {props.open && (
        <button
          type="button"
          onClick={closeToast}
          style={{ display: props.open ? 'flex' : 'none' }}
          className={`fixed right-4 top-4 z-50 rounded-md bg-${props.color}-500 px-4 py-2 text-white transition hover:bg-${props.color}-600 hover:text-yellow-100`}>
          <div className="flex items-center space-x-2">
            <span className="text-3xl"><i className="bx bx-check"></i></span>
            <p className="font-bold">{props.message}</p>
          </div>
        </button>
      )}
    </>
  );
};

export default Toast;
