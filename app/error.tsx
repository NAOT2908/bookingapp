'use client'

import { useEffect } from "react";
import EmptyState from "./components/EmptyState";

interface ErrorProps{
    error: Error
}

const Error: React.FC<ErrorProps> = ({
    error
}) => {
    useEffect(() =>{
        console.error(error)
    },[error]);

    return ( 
        <EmptyState 
            title="404!!!"
            subtitle="ERROR !!! 404"
        />
     );
}
 
export default Error;
