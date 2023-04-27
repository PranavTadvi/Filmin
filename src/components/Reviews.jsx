import React, { useState } from "react";
import ReactStars from "react-stars";
import { reviewsRef, db } from "./firebase/firebase";
import {
  addDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { TailSpin, ThreeDots } from "react-loader-spinner";
import swal from "sweetalert";
import { useEffect } from "react";
const Reviews = ({ id, prevRating, userRated }) => {
  const [rating, setRating] = useState(0);
  const [loader, setLoader] = useState(false);
  const [form, setForm] = useState("");
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getData() {
      setReviewsLoading(true);
      let myQuer = query(reviewsRef, where("movieid", "==", id));
      const myQuerSnapshot = await getDocs(myQuer);
      myQuerSnapshot.forEach((doc) => {
        setData((prev) => [...prev, doc.data()]);
      });
      setReviewsLoading(false);
    }
    getData();
  }, []);
  const sendReview = async () => {
    try {
      setLoader(true);
      await addDoc(reviewsRef, {
        movieid: id,
        name: "Pranav",
        rating: rating,
        thought: form,
        timestamp: new Date().getTime(),
      });
      swal({
        title: "Review Sent",
        icon: "success",
        buttons: false,
        timer: 3000,
      });
      const ref = doc(db, "movies", id);
      await updateDoc(ref, {
        rating: prevRating + rating,
        rated: userRated + 1,
      });
      setRating(0);
      setForm("");
    } catch (error) {
      swal({
        title: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
    setLoader(false);
  };

  return (
    <div className="mt-4 w-full py-1 border-t-2 border-gray-600 ">
      <ReactStars
        size={30}
        half={true}
        value={rating}
        onChange={(rate) => setRating(rate)}
      />
      <input
        className="p-2 w-full outline-none header"
        placeholder="Share your thoughts...."
        value={form}
        onChange={(e) => setForm(e.target.value)}
      />
      <button
        className="bg-blue-500 w-full p-1 mt-1 flex justify-center"
        onClick={sendReview}
      >
        {loader ? <TailSpin height={20} color="white" /> : "Share"}
      </button>

      <div className="flex justify-center my-5 p-2 ">
        {reviewsLoading ? (
          <ThreeDots
            height={30}
            color="white"
            className="flex justify-center"
          />
        ) : (
          <div className="flex flex-col w-full mt-2">
            {data.map((revData, index) => {
              return (
                <>
                  <div className="mt-2  bg-gray-800 rounded-lg p-2" key={index}>
                    <div className="flex justify-between items-center p-3">
                      <p className="text-blue-500">{revData.name}</p>
                      <p>{new Date(revData.timestamp).toLocaleString()}</p>
                      <ReactStars
                        size={20}
                        half={true}
                        value={revData.rating}
                        edit={false}
                      />
                    </div>

                    <div className="flex ml-2">
                      <p className="text-gray-400">{revData.thought}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
