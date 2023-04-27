import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { ThreeCircles } from "react-loader-spinner";
import Reviews from "./Reviews";

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState({
    title: "",
    year: "",
    image: "",
    description: "",
    rating: 0,
    rated: 0,
  });
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    async function getData() {
      setLoader(true);
      const _doc = doc(db, "movies", id);
      const _data = await getDoc(_doc);
      setData(_data.data());
      console.log(_data.data());
      setLoader(false);
    }
    getData();
  }, []);
  return (
    <div className="p-4 mt-4 flex flex-col md:flex-row justify-center items-center md:items-start">
      <>
        {loader ? (
          <div className="h-96 w-full flex justify-center items-center">
            <ThreeCircles height={30} color="white" />
          </div>
        ) : (
          <>
            <img
              className="block md:sticky top-24 h-96 w-60 md:h-96 "
              src={data.image}
            />
            <div className="m-2 flex flex-col w-full md:w-1/2 ">
              <h1 className="m-2 text-2xl font-bold text-gray-400">
                {data.title}
                <span className="text-xl">({data.year})</span>
              </h1>
              <h1 className="flex items-center">
                <ReactStars
                  className="m-2"
                  size={30}
                  half={true}
                  value={data.rating / data.rated}
                  edit={false}
                />
              </h1>
              <p className="ml-4 mt-2 w-2/2">{data.description}</p>
              <Reviews id={id} preRating={data.rating} userRated={data.rated} />
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default Details;
