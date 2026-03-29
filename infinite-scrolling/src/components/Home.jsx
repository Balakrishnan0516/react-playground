import { useEffect, useState, useRef } from "react";
import "../../src/App.css";
import DummyCard from "./DummyCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loadMore, setLoadMore] = useState(0);
  const [loading, setLoading] = useState(false);
  let LIMIT = 20;
  let MAX_LIMIT = useRef(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products?limit=${LIMIT}&skip=${loadMore}`
        );
        const data = await response.json();
        console.log(data, data.total);
        MAX_LIMIT.current = data.total;
        setProducts((prev) => [...prev, ...data.products]);
      } catch (e) {
        console.error("Fetch data failed...", e);
      } finally {
        setTimeout(() => setLoading(false), 2000);
        //setLoading(false);
      }
    };
    console.log(MAX_LIMIT, loadMore);
    if (loadMore <= MAX_LIMIT.current) fetchData();
  }, [loadMore]);

  const useThrottle = (cb, d) => {
    let start = 0;
    return (...args) => {
      let now = new Date().getTime();
      if (now - start > d) {
        start = now;
        return cb(...args);
      }
    };
  };

  const handleScroll = useThrottle(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 700 >
      document.documentElement.offsetHeight
    ) {
      setLoadMore((prev) => prev + 20);
    }
  }, 300);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
    <div style={{display: "flex", margin: "0px", paddingLeft: "20px", backgroundColor:"#21a6c7ff"}}>
          <h2>Infinite scrolling</h2>
        </div>
      <div id="products-container">
        {products.map((product, index) => {
          return (
            <div key={index} className="product-card fade-in">
              <h3
                style={{
                  borderRadius: "20px 20px 0 0",
                  margin: "0px",
                  color: "white",
                  fontSize: "small",
                  fontFamily: "Raleway, sans-serif",
                  padding: "5px",
                  borderBottom: " 1px solid #008080",
                  backgroundColor: "#01aaaaff",
                }}
              >
                {product.title}
              </h3>
              <img
                className="product-img"
                src={product.thumbnail}
                alt="products"
              />
              <p
                style={{
                  color: "black",
                  fontSize: "small",
                  fontFamily: "Raleway, sans-serif",
                  margin: "10px",
                }}
              >
                {product.description}
              </p>
              <div className="product-rating">
                <span
                  style={{
                    color: "white",
                    fontSize: "medium",
                    fontFamily: "Raleway, sans-serif",
                    fontWeight: "Bold",
                  }}
                >
                  {product.price} $
                </span>
                <span
                  style={{
                    color: "white",
                    fontSize: "medium",
                    fontFamily: "Raleway, sans-serif",
                  }}
                >
                  {product.rating} ⭐
                </span>
              </div>
            </div>
          );
        })}

        {loading &&
          Array.from({ length: LIMIT }).map((_, i) => <DummyCard key={i} />)}
      </div>
    </>
  );
};

export default Home;
