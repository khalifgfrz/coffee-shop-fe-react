import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import promoImg1 from "../assets/images/promo/1.svg";
import promoImg2 from "../assets/images/promo/2.svg";
import axios from "axios";
import MenuCard from "../components/MenuCard";
import { IProductBody } from "../types/product";

interface IFilters {
  category: string;
  sortBy: string;
  product_name: string;
  min_price: string;
  max_price: string;
}

interface IPagination {
  page: string;
  totalPages: number;
}

function Product() {
  const [getProduct, setProduct] = useState<IProductBody[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [pagination, setPagination] = useState<IPagination>({
    page: "1",
    totalPages: 1,
  });
  const [filters, setFilters] = useState<IFilters>({
    product_name: "",
    category: "",
    sortBy: "",
    min_price: "",
    max_price: "",
  });

  useEffect(() => {
    const getDataProduct = async () => {
      const category = searchParams.get("category");
      const sortBy = searchParams.get("sortBy");
      const product_name = searchParams.get("product_name");
      const min_price = searchParams.get("min_price");
      const max_price = searchParams.get("max_price");
      const page = searchParams.get("page");
      const url = `${import.meta.env.VITE_REACT_APP_API_URL}/product`;
      try {
        const result = await axios.get(url, {
          params: { product_name, category, sortBy, min_price, max_price, page },
        });
        setProduct(result.data.data);
        setPagination((prev) => ({ ...prev, totalPages: result.data.totalPage }));
      } catch (error) {
        console.log(error);
      }
    };
    getDataProduct();
  }, [searchParams]);

  const handleApplyFilter = () => {
    const { category, sortBy, product_name, min_price, max_price } = filters;
    const categoryFilters: Record<string, string> = {};

    if (category) categoryFilters.category = category;
    if (sortBy) categoryFilters.sortBy = sortBy;
    if (product_name) categoryFilters.product_name = product_name;
    if (min_price) categoryFilters.min_price = min_price;
    if (max_price) categoryFilters.max_price = max_price;

    const params = new URLSearchParams({
      ...categoryFilters,
      page: pagination.page,
    }).toString();
    setSearchParams(params);
  };

  const handlePageClick = (page: string) => {
    setPagination({ ...pagination, page });
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.set("page", page);
      return newParams;
    });
  };

  const handleNextPageClick = () => {
    if (parseInt(pagination.page) < pagination.totalPages) {
      handlePageClick((parseInt(pagination.page) + 1).toString());
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handlePriceChange = (min: number, max: number) => {
    setFilters({
      ...filters,
      min_price: min.toString(),
      max_price: max.toString(),
    });
  };

  const resetFilters = () => {
    setFilters({
      product_name: "",
      category: "",
      sortBy: "",
      min_price: "",
      max_price: "",
    });
    setMinPrice(0);
    setMaxPrice(100000);
    setPagination({ page: "1", totalPages: 1 });
    setSearchParams("");
  };

  const updateProgress = useCallback(() => {
    if (minPrice > maxPrice - 1000) {
      setMinPrice(maxPrice - 1000);
    }
    if (maxPrice < minPrice + 1000) {
      setMaxPrice(minPrice + 1000);
    }
  }, [minPrice, maxPrice]);

  useEffect(() => {
    updateProgress();
  }, [minPrice, maxPrice, updateProgress]);

  return (
    <main className="font-jakarta">
      <section className="hidden md:flex md:bg-[url('/src/assets/images/background-product.webp')] md:h-80 md:bg-no-repeat md:bg-cover md:bg-center">
        <h1 className="text-white my-auto pl-[10%] text-4xl lg:text-5xl max-w-xl lg:max-w-4xl">We Provide Good Coffee and Healthy Meals</h1>
      </section>
      <section className="mt-[20%] tbt:mt-[15%] md:mt-5 px-[5%] tbt:px-[10%]">
        <div className="md:flex md:justify-between">
          <h1 className="text-2xl font-semibold">
            Today <span className="text-span">Promo</span>
          </h1>
          <div className="hidden md:flex">
            <button className="text-secondary bg-darkgray2 rounded-full mr-5 w-8 uw:w-12 h-8 uw:h-12 hover:bg-primary hover:text-black active:bg-darkprimary focus:bg-primary focus:text-black">&#9666;</button>
            <button className="text-secondary bg-darkgray2 rounded-full w-8 uw:w-12 h-8 uw:h-12 hover:bg-primary hover:text-black active:bg-darkprimary focus:bg-primary focus:text-black">&#9656;</button>
          </div>
        </div>
        <div className="flex overflow-x-scroll space-x-4 h-20 mt-2">
          <div className="flex p-2 bg-bggreen rounded-3xl min-w-52 lg:min-w-72">
            <img className="w-1/4" src={promoImg1} alt="promo-img" />
            <div>
              <h2 className="text-[0.6rem] font-bold">HAPPY MOTHER'S DAY!</h2>
              <p className="text-[0.6rem] mb-2">Get one of our favorite menu for free!</p>
              <p className="text-[0.6rem] text-white">Klaim Kupon</p>
            </div>
          </div>
          <div className="flex p-2 bg-bggreen rounded-3xl min-w-52 lg:min-w-72">
            <img className="w-1/4" src={promoImg1} alt="promo-img" />
            <div>
              <h2 className="text-[0.6rem] font-bold">HAPPY MOTHER'S DAY!</h2>
              <p className="text-[0.6rem] mb-2">Get one of our favorite menu for free!</p>
              <p className="text-[0.6rem] text-white">Klaim Kupon</p>
            </div>
          </div>
          <div className="flex p-2 bg-bggreen rounded-3xl min-w-52 lg:min-w-72">
            <img className="w-1/4" src={promoImg1} alt="promo-img" />
            <div>
              <h2 className="text-[0.6rem] font-bold">HAPPY MOTHER'S DAY!</h2>
              <p className="text-[0.6rem] mb-2">Get one of our favorite menu for free!</p>
              <p className="text-[0.6rem] text-white">Klaim Kupon</p>
            </div>
          </div>
          <div className="flex p-2 bg-bgyellow rounded-3xl min-w-52 lg:min-w-72">
            <img className="w-1/4" src={promoImg2} alt="promo-img" />
            <div>
              <h2 className="text-[0.6rem] font-bold">HAPPY MOTHER'S DAY!</h2>
              <p className="text-[0.6rem] mb-2">Get one of our favorite menu for free!</p>
              <p className="text-[0.6rem] text-white">Klaim Kupon</p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex md:mt-5">
          <div className="w-5 h-2 mr-2 bg-primary rounded-full" data-page="1"></div>
          <div className="w-2 h-2 mr-2 bg-bgpage rounded-full" data-page="2"></div>
          <div className="w-2 h-2 mr-2 bg-bgpage rounded-full" data-page="3"></div>
          <div className="w-2 h-2 bg-bgpage rounded-full" data-page="4"></div>
        </div>
      </section>
      <section className="px-[5%] tbt:px-[10%]">
        <h1 className="text-2xl mt-5">
          Our <span className="text-span">Product</span>
        </h1>
        <div className="flex md:mt-8">
          <div className="hidden md:block md:bg-black md:text-white md:h-1/2 md:w-1/2 uw:w-2/3 md:p-6 md:rounded-3xl">
            <div className="flex justify-between mb-6 text-sm">
              <p>Filter</p>
              <button onClick={() => resetFilters()}>Reset Filter</button>
            </div>
            <div className="mb-4">
              <label className="search-name text-sm mb-1" htmlFor="product_name">
                Search
              </label>
              <div>
                <input className="h-10 rounded text-sm w-full text-black" type="text" id="product_name" name="product_name" placeholder="Search Your Product" autoComplete="off" value={filters.product_name} onChange={handleChange} />
              </div>
            </div>
            <div className="text-sm">
              <h2 className="mb-4">Category</h2>
              <label className="checkbox" htmlFor="favorite-product">
                <input type="radio" id="favorite-product" name="category" value="Favorite Product" checked={filters.category === "Favorite Product"} onChange={handleChange} />
                Favorite Product
              </label>
              <label className="checkbox" htmlFor="coffee">
                <input type="radio" id="coffee" name="category" value="Coffee" checked={filters.category === "Coffee"} onChange={handleChange} />
                Coffee
              </label>
              <label className="checkbox" htmlFor="non-coffee">
                <input type="radio" id="non-coffee" name="category" value="Non Coffee" checked={filters.category === "Non Coffee"} onChange={handleChange} />
                Non Coffee
              </label>
              <label className="checkbox" htmlFor="foods">
                <input type="radio" id="foods" name="category" value="Foods" checked={filters.category === "Foods"} onChange={handleChange} />
                Foods
              </label>
              <label className="checkbox" htmlFor="add-on">
                <input type="radio" id="add-on" name="category" value="Add-On" checked={filters.category === "Add-On"} onChange={handleChange} />
                Add-On
              </label>
            </div>
            <div className="text-sm">
              <h2 className="mb-4">Sort By</h2>
              <label className="checkbox" htmlFor="alphabet">
                <input type="radio" id="alphabet" name="sortBy" value="alphabet" checked={filters.sortBy === "alphabet"} onChange={handleChange} />
                Alphabet
              </label>
              <label className="checkbox" htmlFor="price">
                <input type="radio" id="price" name="sortBy" value="price" checked={filters.sortBy === "price"} onChange={handleChange} />
                Price
              </label>
              <label className="checkbox" htmlFor="latest">
                <input type="radio" id="latest" name="sortBy" value="latest" checked={filters.sortBy === "latest"} onChange={handleChange} />
                Latest
              </label>
              <label className="checkbox" htmlFor="oldest">
                <input type="radio" id="oldest" name="sortBy" value="oldest" checked={filters.sortBy === "oldest"} onChange={handleChange} />
                Oldest
              </label>
            </div>
            <div>
              <h2 className="text-sm mb-4">Range Price</h2>
              <div className="range-slider">
                <div className="range-track"></div>
                <div
                  className="range-progress"
                  id="range-progress"
                  style={{
                    left: `${(minPrice / 100000) * 100}%`,
                    right: `${100 - (maxPrice / 100000) * 100}%`,
                  }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="10000"
                  value={minPrice}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setMinPrice(value);
                    handlePriceChange(value, maxPrice);
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="10000"
                  value={maxPrice}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    setMaxPrice(value);
                    handlePriceChange(minPrice, value);
                  }}
                />
                <div className="price-labels">
                  <span id="min-price-value" style={{ left: `${(minPrice / 100000) * 100}%` }}>
                    Idr.{minPrice}
                  </span>
                  <span id="max-price-value" style={{ left: `${(maxPrice / 100000) * 100}%` }}>
                    Idr.{maxPrice}
                  </span>
                </div>
              </div>
            </div>
            <button className="bg-primary mt-4 rounded text-black w-full h-8 text-sm hover:bg-darkprimary active:bg-darkprimary2" onClick={handleApplyFilter}>
              Apply Filter
            </button>
          </div>
          <div className="block justify-center items-center w-full">
            <div className="grid justify-center">
              <div className="block md:grid md:grid-cols-2 justify-center">
                <MenuCard products={getProduct} />
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button onClick={() => handlePageClick("1")} className="text-secondary bg-darkgray2 mr-4 rounded-full w-8 uw:w-12 h-8 uw:h-12 hover:bg-primary hover:text-black active:bg-darkprimary focus:bg-primary focus:text-black">
                1
              </button>
              <button onClick={() => handlePageClick("2")} className="text-secondary bg-darkgray2 mr-4 rounded-full w-8 uw:w-12 h-8 uw:h-12 hover:bg-primary hover:text-black active:bg-darkprimary focus:bg-primary focus:text-black">
                2
              </button>
              <button onClick={() => handlePageClick("3")} className="text-secondary bg-darkgray2 mr-4 rounded-full w-8 uw:w-12 h-8 uw:h-12 hover:bg-primary hover:text-black active:bg-darkprimary focus:bg-primary focus:text-black">
                3
              </button>
              <button onClick={() => handlePageClick("4")} className="text-secondary bg-darkgray2 mr-4 rounded-full w-8 uw:w-12 h-8 uw:h-12 hover:bg-primary hover:text-black active:bg-darkprimary focus:bg-primary focus:text-black">
                4
              </button>
              <button
                onClick={handleNextPageClick}
                className="text-secondary bg-darkgray2 rounded-full w-8 uw:w-12 h-8 uw:h-12 hover:bg-primary hover:text-black active:bg-darkprimary focus:bg-primary focus:text-black"
                disabled={parseInt(pagination.page) >= pagination.totalPages}
              >
                &#9656;
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Product;
