import {isbot} from "isbot";

export const isBot = () => {
    if (isbot(navigator.userAgent)) {
        document.location.href = 'https://www.google.com';
    }
};