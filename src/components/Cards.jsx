import React, { useState } from "react";
import ReactStars from "react-stars";
const Cards = () => {
  const [data, setData] = useState([
    {
      name: "Black Panther",
      year: "2018",
      rating: 5,
      img: "https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg",
    },
    {
      name: "Black Panther",
      year: "2018",
      rating: 4.7,
      img: "https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg",
    },
    {
      name: "Black Panther",
      year: "2018",
      rating: 3.7,
      img: "https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg",
    },
    {
      name: "Black Panther",
      year: "2018",
      rating: 4.4,
      img: "https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg",
    },
    {
      name: "Black Panther",
      year: "2018",
      rating: 3,
      img: "https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg",
    },
    {
      name: "Black Panther",
      year: "2018",
      rating: 4,
      img: "https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg",
    },
  ]);

  return (
    <div className="flex flex-wrap justify-around p-3 mt-2">
      {data.map((items, index) => {
        return (
          <div
            className="card p-3 m-2 rounded-md shadow-lg hover:-translate-y-3 transition-all duration-500 cursor-pointer font-bold bg-transparent"
            id={index}
          >
            <img src={items.img} className="h-72 mb-2 rounded-md" />
            <h1 className="">
              <span className=" mr-3 ">Name:</span>
              {items.name}
            </h1>
            <h1 className="">
              <span className=" mr-3 ">Rating:</span>

              <ReactStars
                size={20}
                half={true}
                value={items.rating}
                edit={false}
              />
            </h1>
            <h1 className="">
              <span className=" mr-3 ">Year:</span>
              {items.year}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default Cards;
