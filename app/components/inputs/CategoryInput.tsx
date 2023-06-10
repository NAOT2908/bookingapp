'use client'

import { IconType } from "react-icons/lib";

interface CategoryInputProps{
    selected?: boolean,
    label: string,
    icon: IconType,
    onClick: (value: string) => void,
}


const CategoryInput: React.FC<CategoryInputProps> = ({
    label,
    icon: Icon,
    selected,onClick
}) => {
    return ( 
    <div onClick={() => onClick(label)} 
    className={`
    rounded-xl
    border-2
    flex
    flex-col
    p-4
    gap-3
    hover:border-black
    transition
    cursor-poiter
    ${selected ? 'border-black' : 'border-neutral-200'}
    `}
    >
        <Icon size={30} />
        <div className="font-semibold">
            {label}
        </div>
    </div> );
}
 
export default CategoryInput;