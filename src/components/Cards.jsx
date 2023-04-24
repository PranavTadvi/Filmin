import React, { useEffect, useState } from "react";
import { Audio, ThreeDots } from "react-loader-spinner";
import ReactStars from "react-stars";
import { getDocs } from "firebase/firestore";
import { moviesRef } from "./firebase/firebase";
const Cards = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoader(true);
      const _data = await getDocs(moviesRef);

      _data.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
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
            <div
              className="card  flex
               flex-col p-1 m-2 w-60 rounded-md shadow-lg hover:-translate-y-3 transition-all duration-500 cursor-pointer font-bold bg-transparent"
              id={index}
            >
              <img src={items.image} className="h-60 md:h-72 m-2 rounded-md" />
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
              <h1 className="">
                <span className=" mr-3 text-gray-400">Year:</span>
                {items.description}
              </h1>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Cards;
