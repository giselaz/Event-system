import { useEffect, useState } from "react";
import classes from "./Search.module.css";
import { getAllCategories } from "../../../Services/categoryService";
import Form from "react-bootstrap/Form";

const Search = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => {
      data ? setCategories(data) : setCategories([]);
    });
  }, []);
  return (
    <div className={`${classes.searchContainer}`}>
      <div className={`${classes.searchInnerContainer} container`}>
        {/* Event Search Input */}
        <div className={`${classes.inputContainer} `}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            className=" me-2"
            type="search"
            placeholder="Search Event"
            aria-label="Search"
          />
        </div>
        {/* Location Search Input */}

        <div className={`${classes.inputContainer} ${classes.locationInput} `}>
          <i class="fa-solid fa-location-dot"></i>
          <Form.Select
            aria-label="Default select example"
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <option value="" disabled selected>
              Select Location
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </div>

        {/* Category Input*/}

        <div className={`${classes.inputContainer} ${classes.categoryInput}`}>
          <i class="fa-solid fa-layer-group"></i>
          <Form.Select
            aria-label="Default select example"
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <option value="" disabled selected>
              Category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </div>

        <div className={`${classes.searchButtonContainer}`}>
          <button className={` `} type="submit">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
