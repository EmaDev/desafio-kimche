import { useState } from 'react';

interface Target {
    name: string;
    value: string;
}
export const useForm = (initialState = {}) => {

    const [values, setValues] = useState(initialState);

    const reset = () => {
        setValues(initialState);
    }
    const handleInputChange = (target:Target) => {
        setValues({
            ...values,
            [target.name]: target.value
        });
    }

    return {
        values,
        handleInputChange,
        reset
    }

}