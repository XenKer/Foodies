import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase.config";
import Reviews from "./Reviews";
import { Link } from "react-router-dom";


const Footer = () => {
  const [rating, setRating] = useState(0);
  const [totalRatings, setTotalRatings] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    const querySnapshot = await getDocs(collection(firestore, "ratings"));
    const ratings = querySnapshot.docs.map((doc) => doc.data());

    const total = ratings.length;
    const sum = ratings.reduce((acc, rating) => acc + rating.value, 0);
    const average = total > 0 ? sum / total : 0;

    setTotalRatings(total);
    setAverageRating(average);
  };

  const handleRatingChange = (event) => {
    const newRating = parseInt(event.target.value);
    setRating(newRating);
  };

  const handleRateSite = async () => {
    if (rating > 0) {
      await addDoc(collection(firestore, "ratings"), {
        value: rating,
        timestamp: new Date().toISOString(),
      });

      setRating(0);
      fetchRatings();
    }
  };

  return (
    <footer className="w-screen h-16 bg-black flex items-center justify-between">
      <p className="text-gray-100 text-lg">&copy; {new Date().getFullYear()} Foodies</p>
      <div className="flex items-center">
        <div className="flex items-center mr-4 text-gray-100">
          <p className="mr-2">Rate the site:</p>
          <select
            className="bg-gray-800 text-gray-100 rounded"
            value={rating}
            onChange={handleRatingChange}
          >
            <option value={0}>Select rating</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
            <option value={7}>7</option>
            <option value={8}>8</option>
            <option value={9}>9</option>
            <option value={10}>10</option>
          </select>
        </div>
        <button
          className="bg-gray-800 text-gray-100 px-4 py-2 rounded"
          onClick={handleRateSite}
        >
          Rate
        </button>
         <Link to="/reviews">
        <button className="bg-gray-800 text-gray-100 px-4 py-2 rounded ml-3">
          Reviews
        </button>
      </Link>
      </div>
      <div className="text-gray-100 mr-12">
        <p>Average Rating: {averageRating.toFixed(1)}</p>
        <p>Total Ratings: {totalRatings}</p>
        
      </div>
      
      
    </footer>
  );
};

export default Footer;
