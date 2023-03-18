import React from 'react';
import placesCategories from './PlacesCategories';

const SearchCategories = ({categoryValue, handleCategoryChange, handleCategorySubmit}) => {

    return(
        <>
            <div className="form-group">
                <label htmlFor="dropdown-category-field">Category:</label>
                <select id="dropdown-category-field" value={categoryValue} onChange={handleCategoryChange}>
                    {placesCategories.map((category) => (
                        <option key={category.value} value={category.key}>
                            {category.value}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary" id="cityCategoryButton" onClick={handleCategorySubmit}>Find</button>        
    </>
    )

};

export default SearchCategories;