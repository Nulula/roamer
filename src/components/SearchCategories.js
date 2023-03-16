import React from 'react';
import placesCategories from './PlacesCategories';

const SearchCategories = ({categoryValue, handleCategoryChange, handleCategorySubmit}) => {

    return(
        <>
            <div className="form-group">
                <label htmlFor="dropdown-category-field">Category:</label>
                <select id="dropdown-category-field" value={categoryValue} onChange={handleCategoryChange}>
                    {placesCategories.map((category) => (
                        <option key={category.key} value={category.value}>
                            {category.value}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary" id="cityCategoryButton" onClick={handleSubmit}>Find</button>        
    </>
    )

};

export default SearchCategories;