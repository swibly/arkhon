import Toastify from 'toastify-js';

type Options = {
    message?: string;
    duration?: number;
    destination?: string;
    onClick?: () => void;
    status?: 'normal' | 'warning' | 'error';
};

const colorMapping = {
    normal: '#0175AF',
    warning: '#FFA333',
    error: '#DA3030'
};

function createToast(options: Options) {
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
        style: {
            background: colorMapping[options.status ?? 'normal']
        }
    });
}

export function spawn(options: Options): void {
    createToast(options).showToast();
}

export default createToast;
