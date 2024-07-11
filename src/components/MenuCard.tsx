import { useNavigate } from "react-router-dom";

import shoppingLogo from "../assets/images/shopping-cart.svg";
import productImg1 from "../assets/images/menu/1.webp";
import { useStoreDispatch } from "../redux/hooks";
import { setProducts, IDetailProduct } from "../redux/slices/checkout";
import { IProductBody } from "../types/product";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

function MenuCard({ products }: { products: IProductBody[] }) {
  const navigate = useNavigate();
  const dispatch = useStoreDispatch();
  const { getProducts } = useSelector((state: RootState) => state.checkout);

  const handleComponentClick = (uuid: string) => {
    navigate(`/product/${uuid}`);
  };

  function checkoutProduct(product: IProductBody, isNavigate: boolean) {
    const existingProduct = getProducts.find((p) => p.uuid === product.uuid);

    let detailProduct: IDetailProduct;

    if (existingProduct) {
      detailProduct = { ...existingProduct, count: existingProduct.count + 1 };
    } else {
      detailProduct = {
        uuid: product.uuid,
        product_id: product.id,
        count: 1,
        delivery: 1,
        payment: 1,
        ice: false,
        image: product.image,
        price: product.price,
        product_name: product.product_name,
        size: 1,
      };
    }

    dispatch(setProducts(detailProduct));
    if (isNavigate) {
      navigate("/checkout");
    }
  }

  return (
    <>
      {products.map((product) => (
        <div key={product.uuid} className="font-jakarta block mr-2 md:relative md:max-w-44 lg:max-w-64 2xl:max-w-[22rem] md:mb-44">
          <img className=" md:mb-0 mt-4 w-full cursor-pointer" onClick={() => handleComponentClick(product.uuid)} src={product.image || productImg1} alt={product.product_name} />
          <div className="md:absolute md:p-2 md:max-w-36 lg:max-w-52 2xl:max-w-72 md:bottom-[-10rem] left-0 right-0 ms-auto me-auto md:bg-white cursor-pointer">
            <p className="font-bold mb-1 text-sm md:text-base lg:text-lg uw:text-2xl">{product.product_name || "Product Name"}</p>
            <p className="hidden">{product.category}</p>
            <p className="hidden">{product.created_at}</p>
            <p className="text-xs lg:text-sm 4xl:text-base uw:text-xl text-lightgray">{product.description || "Description"}</p>
            <div className="flex text-primary items-center mt-1">
              <div className="uw:text-xl" data-value="1">
                &#9733;
              </div>
              <div className="uw:text-xl" data-value="2">
                &#9733;
              </div>
              <div className="uw:text-xl" data-value="3">
                &#9733;
              </div>
              <div className="uw:text-xl" data-value="4">
                &#9733;
              </div>
              <div className="mr-1 uw:text-xl" data-value="5">
                &#9733;
              </div>
              <div className="text-lightgray text-sm uw:text-2xl">5.0</div>
            </div>
            <div className="block tbt:flex tbt:items-center">
              <p className="text-primary text-sm tbt:text-base md:text-lg uw:text-2xl">IDR {product.price}</p>
            </div>
            <div className="md:flex">
              <button onClick={() => checkoutProduct(product, true)} className="w-full md:w-2/3 md:mr-2 h-8 bg-primary font-semibold rounded hover:bg-darkprimary2 active:bg-darkprimary text-xs">
                Buy
              </button>
              <button onClick={() => checkoutProduct(product, false)} className="mt-3 md:mt-0 w-full md:w-1/3 h-8 border border-solid border-primary text-primary rounded hover:bg-darkwhite2 active:bg-darkwhite text-xs">
                <div className="flex items-center justify-center">
                  <img width="20" height="20" src={shoppingLogo} alt="shopping-cart" />
                </div>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default MenuCard;
