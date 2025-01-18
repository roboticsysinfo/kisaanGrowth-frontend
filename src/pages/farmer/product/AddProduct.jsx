import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, resetaddProductstate } from "../../../redux/slices/productSlice";
import { toast } from "react-hot-toast";

const AddProduct = ({ isEdit, productData }) => {
  const dispatch = useDispatch();
  const { addProductStatus, addProductError } = useSelector((state) => state.products);

  const [product, setProduct] = useState(
    productData || {
      name: "",
      season: "",
      price_per_unit: "",
      quantity: "",
      unit: "",
      description: "",
      harvest_date: "",
      product_image: null,
    }
  );

  useEffect(() => {
    if (addProductStatus === "succeeded") {
      toast.success("Product added successfully!");
      dispatch(resetaddProductstate());
      // Reset product state if the product is successfully added
      setProduct({
        name: "",
        season: "",
        price_per_unit: "",
        quantity: "",
        unit: "",
        description: "",
        harvest_date: "",
        product_image: null,
      });
    } else if (addProductStatus === "failed") {
      toast.error(addProductError || "Failed to add product");
      dispatch(resetaddProductstate());
    }
  }, [addProductStatus, addProductError, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, product_image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object for the API call
    const formData = new FormData();
    for (const key in product) {
      formData.append(key, product[key]);
    }

    // Dispatch the addProduct action
    dispatch(addProduct(formData));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-xs-12 col-sm-12">
          <form className="" onSubmit={handleSubmit}>
            <h1>{isEdit ? "Edit Product" : "Add Product"}</h1>

            <label>Name</label>
            <input className="form-control" name="name" value={product.name} onChange={handleChange} required />

            <label>Season</label>
            <input className="form-control" name="season" value={product.season} onChange={handleChange} required />

            <label>Price per Unit</label>
            <input
              className="form-control"
              name="price_per_unit"
              type="number"
              value={product.price_per_unit}
              onChange={handleChange}
              required
            />

            <label>Quantity</label>
            <input
              className="form-control"
              name="quantity"
              type="number"
              value={product.quantity}
              onChange={handleChange}
              required
            />

            <label>Unit</label>
            <select className="form-control" name="unit" value={product.unit} onChange={handleChange} required>
              <option value="">Select Unit</option>
              <option value="kg">kg</option>
              <option value="liters">liters</option>
              <option value="tons">tons</option>
              <option value="pieces">pieces</option>
            </select>

            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              value={product.description}
              onChange={handleChange}
            />

            <label>Harvest Date</label>
            <input
              className="form-control"
              name="harvest_date"
              type="date"
              value={product.harvest_date}
              onChange={handleChange}
              required
            />

            <label>Product Image</label>
            <input className="form-control" name="product_image" type="file" onChange={handleImageChange} />

            <button className="btn btn-success" type="submit" disabled={addProductStatus === "loading"}>
              {addProductStatus === "loading" ? "Adding..." : isEdit ? "Update" : "Add"} Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
