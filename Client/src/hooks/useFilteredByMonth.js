import React, { useState } from "react";

export const useFilteredByMonth = (days) => {
    const [filtersState, setFiltersState] = useState(null);

    const onFiltersApply = (state) => {
        setFiltersState(state);
    }
    let filteredDays = days;
    if(filtersState && days.length){
        filteredDays = days.filter(day => {
            const year = new Date(filtersState).getFullYear();
            const month = new Date(filtersState).getMonth() + 1;
            return new Date(day.startDate).getFullYear() === year 
                && new Date(day.startDate).getMonth() + 1 === month
        });
    }
    
    return { onFiltersApply, filteredDays };
}