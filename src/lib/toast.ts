import Toastify from 'toastify-js';

type Options = {
    message?: string;
    duration?: number;
    destination?: string;
    onClick?: () => void;
    status?: 'normal' | 'warning' | 'error';
};

const colorMapping = {
    normal: '#FFA333',
    warning: '#EAD45F',
    error: '#DA3030'
};

const createToast = (options: Options) => {
    return Toastify({
        text: options.message,
        duration: options.duration ?? 3000,
        destination: options.destination,
        newWindow: true,
        close: true,
        gravity: 'bottom',
        position: 'center',
        stopOnFocus: true,
        onClick: options.onClick,
        backgroundColor: options.status ? colorMapping[options.status] : undefined
    });
};

export function spawn(options: Options): void {
    createToast(options).showToast();
}

export default createToast;
