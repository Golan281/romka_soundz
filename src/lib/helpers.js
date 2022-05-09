import { v4 as uuidv4 } from 'uuid';

export const todayDate = () => {
    const date = new Date();
    return date.toISOString(); //for ITC server return Date.now()
};
export const setId = () => {
    return uuidv4(); 
};

export const swalProps = {
    customClass: {
        confirmButton: 'btn',
        denyButton: 'btn',
        cancelButton: 'btn'
    },
    buttonsStyling: false,
    color: '#E1F1E6',
    background: '#2A5656',
};