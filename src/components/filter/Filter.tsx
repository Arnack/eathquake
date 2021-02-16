import React, {FC} from "react";
import "./Filter.css"

interface IProps {
    handleChange: (newVal: string) => void;
}

export const Filter: FC<IProps> = ({ handleChange }) => {
    return <div className={"filter-wrapper"}>
            <input className={"filter-input"}
                   onChange={e => handleChange(e.target.value.trim())}
                   placeholder={"Search by place"}
                   type="text"/>
        </div>
}