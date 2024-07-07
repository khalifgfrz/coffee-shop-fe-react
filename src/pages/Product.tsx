import { ChangeEvent, useCallback, useEffect, useState } from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";

import promoImg1 from "../assets/images/promo/1.svg";
import promoImg2 from "../assets/images/promo/2.svg";
import MenuCard from "../components/MenuCard";
import axios from "axios";

export function Products() {
  return (
    <>
      <Header />
      <Product />
      <Footer />
    </>
  );
}

interface Filters {
  category: string;
  sortBy: string;
  product_name: string;
  min_price: string;
  max_price: string;
}

interface ProductBody {
  uuid: string;
  image: string;
  product_name: string;
  category: string;
  created_at: string;
  description: string;
  price: number;
}

function Product() {
  const [filters, setFilters] = useState<Filters>({
    category: "",
    sortBy: "",
    product_name: "",
    min_price: "0",
    max_price: "100000",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      category: event.target.value,
    }));
  };

  const handleSortByChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sortBy: event.target.value,
    }));
  };

  const [getProduct, setProduct] = useState<ProductBody[]>([]);

  useEffect(() => {
    const getDataProduct = async () => {
      const url = "https://coffee-shop-three-omega.vercel.app/product";
      try {
        const result = await axios.get(url);
        setProduct(result.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDataProduct();
  }, []);

  const handleApplyFilter = () => {
    const { category, sortBy, product_name, min_price, max_price } = filters;
    const categoryFilters = { category, sortBy, product_name, min_price, max_price };

    const params = new URLSearchParams(categoryFilters).toString();
    // console.log(params)
    axios
      .get(`https://coffee-shop-three-omega.vercel.app/product/?${params}`)
      .then((response) => {
        setProduct(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);

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
              <button
                onClick={() =>
                  setFilters({
                    category: "",
                    sortBy: "",
                    product_name: "",
                    min_price: "0",
                    max_price: "100000",
                  })
                }
              >
                Reset Filter
              </button>
            </div>
            <div className="mb-4">
              <form>
                <label className="search-name text-sm mb-1" htmlFor="product_name">
                  Search
                </label>
                <div>
                  <input className="h-10 rounded text-sm w-full text-black" type="text" id="product_name" name="product_name" placeholder="Search Your Product" autoComplete="off" value={filters.product_name} onChange={handleChange} />
                </div>
              </form>
            </div>
            <div className="text-sm">
              <h2 className="mb-4">Category</h2>
              <label className="checkbox" htmlFor="favorite-product">
                <input type="radio" id="favorite-product" name="category" value="Favorite Product" checked={filters.category === "Favorite Product"} onChange={handleCategoryChange} />
                Favorite Product
              </label>
              <label className="checkbox" htmlFor="coffee">
                <input type="radio" id="coffee" name="category" value="Coffee" checked={filters.category === "Coffee"} onChange={handleCategoryChange} />
                Coffee
              </label>
              <label className="checkbox" htmlFor="non-coffee">
                <input type="radio" id="non-coffee" name="category" value="Non Coffee" checked={filters.category === "Non Coffee"} onChange={handleCategoryChange} />
                Non Coffee
              </label>
              <label className="checkbox" htmlFor="foods">
                <input type="radio" id="foods" name="category" value="Foods" checked={filters.category === "Foods"} onChange={handleCategoryChange} />
                Foods
              </label>
              <label className="checkbox" htmlFor="add-on">
                <input type="radio" id="add-on" name="category" value="Add-On" checked={filters.category === "Add-On"} onChange={handleCategoryChange} />
                Add-On
              </label>
            </div>
            <div className="text-sm">
              <h2 className="mb-4">Sort By</h2>
              <label className="checkbox" htmlFor="alphabet">
                <input type="radio" id="alphabet" name="sortBy" value="alphabet" checked={filters.sortBy === "alphabet"} onChange={handleSortByChange} />
                Alphabet
              </label>
              <label className="checkbox" htmlFor="flash-sale">
                <input type="radio" id="price" name="sortBy" value="price" checked={filters.sortBy === "price"} onChange={handleSortByChange} />
                Price
              </label>
              <label className="checkbox" htmlFor="birthday-package">
                <input type="radio" id="latest" name="sortBy" value="latest" checked={filters.sortBy === "latest"} onChange={handleSortByChange} />
                Latest
              </label>
              <label className="checkbox" htmlFor="cheap">
                <input type="radio" id="oldest" name="sortBy" value="oldest" checked={filters.sortBy === "oldest"} onChange={handleSortByChange} />
                Oldest
              </label>
            </div>
            <div>
              <h2 className="text-sm mb-4">Range Price</h2>
              <div className="range-slider">
                <div className="range-track"></div>
                <div
                  className="range-progress"
                  style={{
                    left: `${(minPrice / 100000) * 100}%`,
                    right: `${100 - (maxPrice / 100000) * 100}%`,
                  }}
                ></div>
                <input type="range" id="min-price-range" min="0" max="100000" step="10000" value={minPrice} onChange={(e) => setMinPrice(parseInt(e.target.value))} />
                <input type="range" id="max-price-range" min="0" max="100000" step="10000" value={maxPrice} onChange={(e) => setMaxPrice(parseInt(e.target.value))} />
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
            <div className="flex flex-wrap justify-center">
              <div>
                <MenuCard products={getProduct} />
              </div>
            </div>
            <div className="flex justify-center mt-5">
              <button className="text-secondary bg-darkgray2 mr-4 rounded-full w-8 uw:w-12 h-8 uw:h-12 hover:bg-primary hover:text-black active:bg-darkprimary focus:bg-primary focus:text-black">1</button>
              <button className="text-secondary bg-darkgray2 mr-4 rounded-full w-8 uw:w-12 h-8 uw:h-12 hover:bg-primary hover:text-black active:bg-darkprimary focus:bg-primary focus:text-black">2</button>
              <button className="text-secondary bg-darkgray2 mr-4 rounded-full w-8 uw:w-12 h-8 uw:h-12 hover:bg-primary hover:text-black active:bg-darkprimary focus:bg-primary focus:text-black">3</button>
              <button className="text-secondary bg-darkgray2 mr-4 rounded-full w-8 uw:w-12 h-8 uw:h-12 hover:bg-primary hover:text-black active:bg-darkprimary focus:bg-primary focus:text-black">4</button>
              <button className="text-secondary bg-darkgray2 rounded-full w-8 uw:w-12 h-8 uw:h-12 hover:bg-primary hover:text-black active:bg-darkprimary focus:bg-primary focus:text-black">&#9656;</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Product;
