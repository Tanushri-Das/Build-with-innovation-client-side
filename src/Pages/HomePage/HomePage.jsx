// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/cartSlice";
// import { setSearchTerm, selectSearchTerm } from "../../redux/searchSlice";
// import "./HomePage.css";
// import Swal from "sweetalert2";

// const HomePage = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.cart);
//   const searchTerm = useSelector(selectSearchTerm);
//   const [productList, setProductList] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [priceFilter, setPriceFilter] = useState({
//     min: 0,
//     max: Number.MAX_SAFE_INTEGER,
//   });

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("https://dummyjson.com/products");
//         const data = await response.json();
//         setProductList(data.products);
//         setFilteredProducts(data.products);
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     // Filter the products based on the search term and price range
//     const filtered = productList.filter(
//       (product) =>
//         product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         product.price >= priceFilter.min &&
//         product.price <= priceFilter.max
//     );
//     setFilteredProducts(filtered);
//   }, [searchTerm, productList, priceFilter]);

//   const handleAddToCart = async (product) => {
//     const existingProduct = products.find((item) => item.id === product.id);

//     if (existingProduct) {
//       Swal.fire({
//         position: "top-end",
//         icon: "error",
//         title:
//           "This product is already in your cart. Please choose a different product.",
//         showConfirmButton: false,
//         timer: 2000,
//       });
//     } else {
//       dispatch(addToCart(product));

//       Swal.fire({
//         position: "top-end",
//         icon: "success",
//         title: "Product added successfully",
//         showConfirmButton: false,
//         timer: 1500,
//       });

//       const newOrder = {
//         title: product.title,
//         brand: product.brand,
//         price: product.price,
//       };

//       try {
//         const response = await fetch("http://localhost:5000/orders", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newOrder),
//         });

//         if (!response.ok) {
//           console.error("Failed to send order to server");
//         }
//       } catch (error) {
//         console.error("Error sending order to server:", error);
//       }
//     }
//   };

//   const handleSearchChange = (e) => {
//     dispatch(setSearchTerm(e.target.value));
//   };

//   const handlePriceFilterChange = (e) => {
//     const { name, value } = e.target;

//     // Check if the value is "All", set min to 0 and max to Number.MAX_SAFE_INTEGER
//     const [min, max] =
//       value === "All"
//         ? [0, Number.MAX_SAFE_INTEGER]
//         : value === "Over-1200"
//         ? [1200, Number.MAX_SAFE_INTEGER]
//         : value.split("-").map(Number);

//     setPriceFilter({ min, max });
//   };
//   return (
//     <div className="my-20">
//       <div>
//         <h2 className="text-2xl font-bold text-center mb-8">Products</h2>
//         {/* Search bar */}
//         <div className="w-[450px] mx-auto mb-10">
//           <div className="relative flex items-center w-full h-12 rounded-lg shadow-lg bg-white overflow-hidden">
//             <div className="grid place-items-center h-full w-12 text-gray-300">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                   stroke-width="2"
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Search by title..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="outline-none p-3 text-black w-[450px]"
//             />
//           </div>
//         </div>
//         {/* Price filter */}
//         <div className="mb-8">
//           <h2 className="text-xl font-bold text-center mb-3">Price</h2>
//           <div className="flex flex-col justify-center items-center">
//             <div className="flex justify-center items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 id="price-All"
//                 value="All"
//                 onChange={handlePriceFilterChange}
//               />
//               <label htmlFor="price-All" className="ms-1">
//                 All
//               </label>
//             </div>
//             <div className="flex justify-center items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 id="price-0-400"
//                 value="0-400"
//                 onChange={handlePriceFilterChange}
//               />
//               <label htmlFor="price-0-400" className="ms-1">
//                 0-400
//               </label>
//             </div>
//             <div className="flex justify-center items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 id="price-400-800"
//                 value="400-800"
//                 onChange={handlePriceFilterChange}
//               />
//               <label htmlFor="price-400-800" className="ms-1">
//                 400-800
//               </label>
//             </div>
//             <div className="flex justify-center items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 id="price-800-1200"
//                 value="800-1200"
//                 onChange={handlePriceFilterChange}
//               />
//               <label htmlFor="price-800-1200" className="ms-1">
//                 800-1200
//               </label>
//             </div>
//             <div className="flex justify-center items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 id="price-Over-1200"
//                 value="Over-1200"
//                 onChange={handlePriceFilterChange}
//               />
//               <label htmlFor="price-Over-1200" className="ms-1">
//                 Over 1200
//               </label>
//             </div>
//           </div>
//         </div>
//         {/* Product grid */}
//         {loading ? (
//           <div className="spinner"></div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 mx-2 sm:mx-20">
//             {filteredProducts.map((product) => (
//               <div key={product.id} className="product">
//                 <img
//                   src={product.thumbnail}
//                   alt={product.title}
//                   className="product-img"
//                 />
//                 <div className="mt-5 px-4">
//                   <p className="text-xl mb-3 text-center font-semibold">
//                     {product.title}
//                   </p>
//                   <p className="text-lg mb-2">{product.description}</p>
//                   <p className="text-lg mb-2 text-center font-medium">
//                     Price: {product.price}
//                   </p>
//                   <p className="text-lg mb-2 text-center font-medium">
//                     Discount Percentage: {product.discountPercentage}
//                   </p>
//                   <p className="text-lg mb-3 text-center font-medium">
//                     Brand: {product.brand}
//                   </p>
//                 </div>
//                 <div className="mt-20">
//                   <div className="btn-div">
//                     <button
//                       className="add-to-cart text-lg"
//                       onClick={() => handleAddToCart(product)}
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HomePage;







// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart } from "../../redux/cartSlice";
// import { setSearchTerm, selectSearchTerm } from "../../redux/searchSlice";
// import "./HomePage.css";
// import Swal from "sweetalert2";
// import { Link } from "react-router-dom";

// const HomePage = () => {
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.cart);
//   const searchTerm = useSelector(selectSearchTerm);
//   const [productList, setProductList] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [priceFilter, setPriceFilter] = useState({
//     min: 0,
//     max: Number.MAX_SAFE_INTEGER,
//   });

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("https://dummyjson.com/products");
//         const data = await response.json();
//         setProductList(data.products);
//         setFilteredProducts(data.products);
//       } catch (error) {
//         console.error("Error fetching product data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     const filtered = productList.filter(
//       (product) =>
//         product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//         product.price >= priceFilter.min &&
//         product.price <= priceFilter.max
//     );
//     setFilteredProducts(filtered);
//   }, [searchTerm, productList, priceFilter]);

//   const handleAddToCart = async (product) => {
//     dispatch(addToCart(product));

//     Swal.fire({
//       position: "top-end",
//       icon: "success",
//       title: "Product added successfully",
//       showConfirmButton: false,
//       timer: 1500,
//     });

//     const newOrder = {
//       title: product.title,
//       brand: product.brand,
//       price: product.price,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newOrder),
//       });

//       if (!response.ok) {
//         console.error("Failed to send order to server");
//       }
//     } catch (error) {
//       console.error("Error sending order to server:", error);
//     }
//   };

//   const handleSearchChange = (e) => {
//     dispatch(setSearchTerm(e.target.value));
//   };

//   const handlePriceFilterChange = (e) => {
//     const { name, value } = e.target;
//     const [min, max] =
//       value === "All"
//         ? [0, Number.MAX_SAFE_INTEGER]
//         : value === "Over-1200"
//         ? [1200, Number.MAX_SAFE_INTEGER]
//         : value.split("-").map(Number);

//     setPriceFilter({ min, max });
//   };

//   return (
//     <div className="my-20">
//       <div>
//         <h2 className="text-3xl font-bold text-center mb-8">Products</h2>
//         <div className="w-full sm:w-[450px] mx-auto mb-10">
//           <div className="relative flex items-center w-full h-12 rounded-lg shadow-lg bg-white overflow-hidden">
//             <div className="grid place-items-center h-full w-12 text-gray-300">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 />
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Search by title..."
//               value={searchTerm}
//               onChange={handleSearchChange}
//               className="outline-none p-3 text-black w-[450px]"
//             />
//           </div>
//         </div>
//         <div className="mb-8">
//           <h2 className="text-xl font-bold text-center mb-3">Price</h2>
//           <div className="flex flex-col justify-center items-center">
//             <div className="flex justify-center items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 id="price-All"
//                 value="All"
//                 onChange={handlePriceFilterChange}
//               />
//               <label htmlFor="price-All" className="ms-1">
//                 All
//               </label>
//             </div>
//             <div className="flex justify-center items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 id="price-0-400"
//                 value="0-400"
//                 onChange={handlePriceFilterChange}
//               />
//               <label htmlFor="price-0-400" className="ms-1">
//                 0-400
//               </label>
//             </div>
//             <div className="flex justify-center items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 id="price-400-800"
//                 value="400-800"
//                 onChange={handlePriceFilterChange}
//               />
//               <label htmlFor="price-400-800" className="ms-1">
//                 400-800
//               </label>
//             </div>
//             <div className="flex justify-center items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 id="price-800-1200"
//                 value="800-1200"
//                 onChange={handlePriceFilterChange}
//               />
//               <label htmlFor="price-800-1200" className="ms-1">
//                 800-1200
//               </label>
//             </div>
//             <div className="flex justify-center items-center">
//               <input
//                 type="radio"
//                 name="price"
//                 id="price-Over-1200"
//                 value="Over-1200"
//                 onChange={handlePriceFilterChange}
//               />
//               <label htmlFor="price-Over-1200" className="ms-1">
//                 Over 1200
//               </label>
//             </div>
//           </div>
//         </div>
//         {loading ? (
//           <div className="spinner"></div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mx-2 sm:mx-20">
//             {filteredProducts.map((product) => (
//               <div key={product.id} className="product">
//                 <img
//                   src={product.thumbnail}
//                   alt={product.title}
//                   className="product-img"
//                 />
//                 <div className="mt-5 px-4">
//                   <p className="text-xl mb-3 text-center font-semibold">
//                     {product.title}
//                   </p>
//                   <p className="text-lg mb-2">{product.description}</p>
//                   <p className="text-lg mb-2 text-center font-medium">
//                     Price: {product.price}
//                   </p>
//                   <p className="text-lg mb-2 text-center font-medium">
//                     Discount Percentage: {product.discountPercentage}
//                   </p>
//                   <p className="text-lg mb-3 text-center font-medium">
//                     Brand: {product.brand}
//                   </p>
//                 </div>
//                 <div className="mt-20">
//                   <div className="btn-div">
//                     <button
//                       className="add-to-cart text-lg"
//                       onClick={() => handleAddToCart(product)}
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//       <div className="flex justify-center items-center mt-8">
//       <Link
//         className="login-btn text-lg font-semibold text-white bg-blue-500 py-4 px-8 rounded-full"
//         to="/"
//       >
//         Back to welcome page
//       </Link>
//       </div>
//     </div>
//   );
// };

// export default HomePage;















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
      return { ...product, actualPrice }; // Add actualPrice to each product
    });

    const filtered = updatedProducts.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        product.actualPrice >= priceFilter.min &&
        product.actualPrice <= priceFilter.max
    );
    setFilteredProducts(filtered);
  }, [searchTerm, productList, priceFilter]);

  const handleAddToCart = async (product) => {
    dispatch(addToCart(product));

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Product added successfully",
      showConfirmButton: false,
      timer: 1500,
    });

    const newOrder = {
      title: product.title,
      brand: product.brand,
      price: product.price,
    };

    try {
      const response = await fetch("http://localhost:5000/orders", {
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
        <h2 className="text-3xl font-bold text-center mb-8">Products</h2>
        <div className="w-full sm:w-[450px] mx-auto mb-10">
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
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="outline-none p-3 text-black w-[450px]"
            />
          </div>
        </div>
        <div className="mb-8">
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
              <label htmlFor="price-All" className="ms-1">
                All
              </label>
            </div>
            <div className="flex justify-center items-center">
              <input
                type="radio"
                name="price"
                id="price-0-400"
                value="0-400"
                onChange={handlePriceFilterChange}
              />
              <label htmlFor="price-0-400" className="ms-1">
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
              <label htmlFor="price-400-800" className="ms-1">
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
              <label htmlFor="price-800-1200" className="ms-1">
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
              <label htmlFor="price-Over-1200" className="ms-1">
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
                    <p className="text-lg mb-2 text-center font-medium">Price : {product.price}</p>
                    <p className="text-lg mb-2 text-center font-medium">
                      Discount : {product.discountPercentage}
                    </p>
                    <p className="text-lg mb-2 text-center font-medium">
                      Current Price : {actualPrice.toFixed(2)}
                    </p>
                    
                    <p className="text-lg mb-3 text-center font-medium">
                      Brand: {product.brand}
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
