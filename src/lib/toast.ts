import Toastify from 'toastify-js';

type Options = {
    message?: string;
    duration?: number;
    destination?: string;
    onClick?: () => void;
};

const createToast = (options: Options) =>
    Toastify({
        text: options.message,
        duration: options.duration ?? 3000,
        destination: options.destination,
        newWindow: true,
        close: true,
        gravity: 'bottom',
        position: 'center',
        stopOnFocus: true,
        onClick: options.onClick
    });

export function spawn(options: Options): void {
    createToast(options).showToast();
}

export default createToast;
