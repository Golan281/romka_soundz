import { useState , useEffect } from 'react';

//the goal is to change the state of the one iFrame elem onChange/click of user
export const useUrl = (url) => {
    const [state, setState] = useState(url);
    const handleChange = () => {
        state = 'new-url';
        setState(state);
    };

    useEffect(()=>{
        console.log(`current state is: ${state}. and comp did mount!`)
    },[]);

    return {
        handleChange
    };
}