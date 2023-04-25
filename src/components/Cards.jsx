import React, { useEffect, useState } from "react";
import { Audio, ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "./firebase/firebase";
import { Link } from "react-router-dom";
const Cards = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoader(true);
      const _data = await getDocs(moviesRef);

      _data.forEach((doc) => {
        setData((prev) => [...prev, { ...doc.data(), id: doc.id }]);
      });
      setLoader(false);
    }

    getData();
  }, []);

  return (
    <div className="flex flex-wrap justify-around p-3 mt-2">
      {loader ? (
        <ThreeDots height={40} color="white" />
      ) : (
        data.map((items, index) => {
          return (
            <Link to={`/details/${items.id}`}>
              <div
                className="card  flex
               flex-col p-3 m-2 w-80 rounded-md shadow-lg hover:-translate-y-3 transition-all duration-500 cursor-pointer font-bold bg-transparent"
                key={index}
              >
                <img
                  src={items.image}
                  className=" h-64md:h-80 m-2 rounded-md"
                />
                <h1 className="">
                  <span className=" mr-3 text-gray-400">Name:</span>
                  {items.title}
                </h1>
                <h1 className="flex items-center">
                  <span className=" mr-3 text-gray-400 ">Rating:</span>
                  <ReactStars size={20} half={true} value={5} edit={false} />
                </h1>
                <h1 className="">
                  <span className=" mr-3 text-gray-400">Year:</span>
                  {items.year}
                </h1>
              </div>
            </Link>
          );
        })
      )}
    </div>
  );
};

export default Cards;
