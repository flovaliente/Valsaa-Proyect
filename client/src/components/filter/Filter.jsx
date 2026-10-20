import { useState } from "react";

const Filter = ({ children }) =>{
    const [filterState, setFilterState] = useState('all');
    const handleFilterChange = (e) =>{
        setFilterState(e.target.value);
    }

    return children(filterState, handleFilterChange);
}

export default Filter;