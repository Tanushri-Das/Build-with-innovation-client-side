import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { setSearchTerm, selectSearchTerm } from "../../redux/searchSlice";
import "./HomePage.css";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const [productList, setProductList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceFilter, setPriceFilter] = useState({
    min: 0,
    max: Number.MAX_SAFE_INTEGER,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProductList(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const updatedProducts = productList.map((product) => {
      const actualPrice =
        product.price - product.price * (product.discountPercentage / 100);
      return { ...product, actualPrice };
    });

    const filtered = updatedProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.actualPrice >= priceFilter.min &&
        product.actualPrice <= priceFilter.max
    );
    setFilteredProducts(filtered);
  }, [searchTerm, productList, priceFilter]);

  const handleClearSearch = () => {
    dispatch(setSearchTerm("")); 
  };
  
  const handleAddToCart = async (product) => {
    dispatch(addToCart(product));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Product add to cart successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    const newOrder = {
      title: product.title,
      brand: product.brand,
      price: product.price,
    };

    try {
      const response = await fetch("https://build-with-innovation-server-side.vercel.app/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        console.error("Failed to send order to the server");
      }
    } catch (error) {
      console.error("Error sending order to the server:", error);
    }
  };

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handlePriceFilterChange = (e) => {
    const { name, value } = e.target;
    const [min, max] =
      value === "All"
        ? [0, Number.MAX_SAFE_INTEGER]
        : value === "Over-1200"
        ? [1200, Number.MAX_SAFE_INTEGER]
        : value.split("-").map(Number);

    setPriceFilter({ min, max });
  };

  return (
    <div className="my-20">
      <div>
        <h2 className="text-3xl font-bold text-center mb-5">Products</h2>
        <div className="w-full sm:w-[500px] mx-auto mb-5">
          <div className="relative flex items-center w-full h-12 rounded-lg shadow-lg bg-white overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="outline-none p-3 text-black w-[450px]"
            />
            {searchTerm && (
              <button
                onClick={handleClearSearch}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer login-btn text-sm font-semibold text-white px-8 py-2"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-center mb-3">Price</h2>
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center">
              <input
                type="radio"
                name="price"
                id="price-All"
                value="All"
                onChange={handlePriceFilterChange}
              />
              <label htmlFor="price-All" className="ms-1 text-[16px] font-semibold">
                All
              </label>
            </div>
            <div className="flex justify-center items-center text-[16px] font-semibold">
              <input
                type="radio"
                name="price"
                id="price-0-400"
                value="0-400"
                onChange={handlePriceFilterChange}
              />
              <label htmlFor="price-0-400" className="ms-1 text-[16px] font-semibold">
                0-400
              </label>
            </div>
            <div className="flex justify-center items-center">
              <input
                type="radio"
                name="price"
                id="price-400-800"
                value="400-800"
                onChange={handlePriceFilterChange}
              />
              <label htmlFor="price-400-800" className="ms-1 text-[16px] font-semibold">
                400-800
              </label>
            </div>
            <div className="flex justify-center items-center">
              <input
                type="radio"
                name="price"
                id="price-800-1200"
                value="800-1200"
                onChange={handlePriceFilterChange}
              />
              <label htmlFor="price-800-1200" className="ms-1 text-[16px] font-semibold">
                800-1200
              </label>
            </div>
            <div className="flex justify-center items-center">
              <input
                type="radio"
                name="price"
                id="price-Over-1200"
                value="Over-1200"
                onChange={handlePriceFilterChange}
              />
              <label htmlFor="price-Over-1200" className="ms-1 text-[16px] font-semibold">
                Over 1200
              </label>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mx-2 sm:mx-20">
            {filteredProducts.map((product) => {
              const actualPrice =
                product.price -
                product.price * (product.discountPercentage / 100);

              return (
                <div key={product.id} className="product">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="product-img"
                  />
                  <div className="mt-5 px-4">
                    <p className="text-xl mb-3 text-center font-semibold">
                      {product.title}
                    </p>
                    <p className="text-lg mb-2">{product.description}</p>
                    <p className="text-[16px] mb-2 text-center font-medium">
                      Original Price : {product.price}
                    </p>
                    <p className="text-[16px] mb-2 text-center font-medium">
                      Discount : {product.discountPercentage}%
                    </p>
                    <p className="text-[16px] mb-2 text-center font-medium">
                      Actual Price : {actualPrice.toFixed(2)}
                    </p>
                    <p className="text-lg mb-3 text-center font-medium">
                      Brand : {product.brand}
                    </p>
                  </div>
                  <div className="mt-20">
                    <div className="btn-div">
                      <button
                        className="add-to-cart text-lg"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="flex justify-center items-center mt-8">
        <Link
          className="login-btn text-lg font-semibold text-white bg-blue-500 py-4 px-8 rounded-full"
          to="/"
        >
          Back to welcome page
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
