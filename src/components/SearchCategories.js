import React from 'react';
import placesCategories from './PlacesCategories';

const SearchCategories = ({categoryValue, handleCategoryChange, handleCategorySubmit}) => {

    return(
        <form className="form-group row align-items-center justify-content-center">
            <div className="col-sm-11 col-lg-8">
                <select className="form-select" id="dropdown-category-field" value={categoryValue} onChange={handleCategoryChange}>
                <option defaultValue>Select Category</option>
                {placesCategories.map((category) => (
                    <option key={category.value} value={category.key}>
                        {category.value}
                    </option>
                ))}
                </select>
            </div>
            <div className="col-sm-auto col-lg-auto">
            <button type="submit" className="btn btn-primary" id="cityCategoryButton" onClick={handleCategorySubmit}>Find</button>
            </div>   
        </form>     
      )

};

export default SearchCategories;