'use client'

import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
    value: number;
    onChange: (value: number) => void;
    title: string;
    subtitle: string;
}

const Counter: React.FC<CounterProps> = ({
    title, onChange, subtitle, value
}) => {

    const onAdd = useCallback(() => {
        onChange(value + 1);
    }, [onChange, value]);

    const onReduce = useCallback(() => {
        if (value === 1) {
            return
        }
        onChange(value - 1);
    }, [onChange, value]);



    return (
        <div className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
                <div className="font-medium">
                    {title}
                </div>
                <div className="font-light text-gray-600">
                    {subtitle}
                </div>
            </div>
            <div className="flex flex-row items-center gap-4">
                <div onClick={onReduce}
                    className="w-10 h-10 flex items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600
                cursor-poiter hover:opacity-80 transition "
                >
                    <AiOutlineMinus />
                </div>
                <div className="font-light text-neutral-600 text-xl">
                    {value}
                </div>
                <div onClick={onAdd}
                    className="w-10 h-10 flex items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600
                 hover:opacity-80 transition cursor-pointer "
                >
                    <AiOutlinePlus />
                </div>
            </div>
        </div>
    );
}

export default Counter;