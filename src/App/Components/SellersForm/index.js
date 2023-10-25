/* eslint-disable no-undef */
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { useState, React, useEffect } from 'react';
function SellersForm() {
    const [categoriesData, setCategoriesData] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [isNewCategoryBlur, setIsNewCategoryBlur] = useState(false);
    const [newSubCategory, setNewSubCategory] = useState('');
    const [isNewSubCategoryBlur, setIsNewSubCategoryBlur] = useState(false);

    const NewcategoryChangeHandler = (e) => {
        setNewCategory(e.target.value);
    };
    const NewCategoryBlurHandler = (e) => {
        setIsNewCategoryBlur(true);
    };
    const NewSubcategoryChangeHandler = (e) => {
        setNewSubCategory(e.target.value);
    };
    const NewSubcategoryBlurHandler = (e) => {
        setIsNewSubCategoryBlur(true);
    };
    const handlecategory = (e) => {
        setCategoryId(e.target.value);
    };

    useEffect(() => {
        const getcategory = async () => {
            const categoriesRequest = await fetch(
                'https://localhost:7258/api/Categories/hierarchy'
            );
            const categories = await categoriesRequest.json();
            setCategoriesData(categories.categories);

            // console.log(categories.categories);
        };
        getcategory();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const OnSubmittingForm = async () => {
        if (categoryId === 'newCategory' && newCategory !== '') {
            let sellersNewCategory = {
                categoryName: newCategory,
                parentCategoryId: null,
            };
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sellersNewCategory),
            };
            const response = await fetch(
                'https://localhost:7258/api/Categories/Add-new-category',
                options
            );
            const responseData = await response.json();
        } else if (categoryId !== '' && categoryId !== 'newCategory' && newSubCategory !== '') {
            let sellersNewSubcategory = {
                categoryName: newSubCategory,
                parentCategoryId: categoryId,
            };
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(sellersNewSubcategory),
            };
            const response = await fetch(
                'https://localhost:7258/api/Categories/Add-new-category',
                options
            );
            const responseData = await response.json();
        }
    };

    const matchedData = categoriesData.filter(
        (getcategory) => getcategory.categoryId === categoryId
    )[0];
    const subcategories = matchedData?.childCategories;
    console.log(subcategories);

    return (
        <div className="Container">
            <div className="row">
                <div className="col card">
                    <form onSubmit={handleSubmit}>
                        <h4 className="text-center form-title mt-5">Add category</h4>
                        <div className="mb-3 mt-3">
                            <label className="form-label label">Categories</label>
                            <select
                                name="categories"
                                className="form-control"
                                onChange={(e) => handlecategory(e)}
                            >
                                <option value="">--Select Category--</option>
                                {categoriesData.map((getcategory) => (
                                    <option
                                        key={getcategory.categoryId}
                                        value={getcategory.categoryId}
                                    >
                                        {getcategory.categoryName}
                                    </option>
                                ))}
                                <option value="newCategory">Add new category</option>
                            </select>
                        </div>
                        {subcategories?.length > 0 && (
                            <div className="mb-3">
                                <label className="form-label">Availale Sub Categories</label>
                                <select name="Subcategories" className="form-control">
                                    <option value="">--Subcategories--</option>
                                    {subcategories.map((getcategory) => (
                                        <option
                                            key={getcategory.categoryId}
                                            value={getcategory.categoryId}
                                        >
                                            {getcategory.categoryName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {categoryId === 'newCategory' && (
                            <div className="mb-3">
                                <label htmlFor="newCategory" className="form-label">
                                    Add New Category
                                </label>
                                <input
                                    type="text"
                                    value={newCategory}
                                    onChange={NewcategoryChangeHandler}
                                    className="form-control"
                                    onBlur={NewCategoryBlurHandler}
                                    id="newCategory"
                                ></input>
                                {isNewCategoryBlur && !newCategory && (
                                    <span className="warningMessage">
                                        *new category is required
                                    </span>
                                )}
                            </div>
                        )}
                        {categoryId !== '' && categoryId !== 'newCategory' && (
                            <div className="mb-3">
                                <label htmlFor="newSubcategory" className="form-label">
                                    Add New Sub Category
                                </label>
                                <input
                                    type="text"
                                    value={newSubCategory}
                                    onChange={NewSubcategoryChangeHandler}
                                    className="form-control"
                                    onBlur={NewSubcategoryBlurHandler}
                                    id="newSubcategory"
                                ></input>
                                {isNewSubCategoryBlur && !newSubCategory && (
                                    <span className="warningMessage">
                                        *new Sub category is required
                                    </span>
                                )}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary mb-5"
                            onClick={OnSubmittingForm}
                        >
                            Create Category
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SellersForm;
