import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, doc, deleteDoc } from "firebase/firestore";
import { firestore } from "../firebase.config";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const querySnapshot = await getDocs(collection(firestore, "reviews"));
    const fetchedReviews = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReviews(fetchedReviews);
  };

  const handleAddReview = async () => {
    if (reviewText.trim() !== "") {
      await addDoc(collection(firestore, "reviews"), {
        text: reviewText,
        timestamp: new Date().toISOString(),
      });

      setReviewText("");
      fetchReviews();
    }
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const formatTimestamp = (timestamp) => {
    if (typeof timestamp === "object" && timestamp.toDate instanceof Function) {
      return timestamp.toDate().toLocaleString();
    } else if (!isNaN(Date.parse(timestamp))) {
      return new Date(timestamp).toLocaleString();
    } else {
      return "Invalid Date";
    }
  };

  const handleDeleteReview = async (index) => {
    const reviewToDelete = reviews[index];
    await deleteDoc(doc(firestore, "reviews", reviewToDelete.id));
    fetchReviews();
  };

  return (
    <div className="container mx-auto px-4 py-8 z-2">
      <h1 className="text-3xl font-bold mb-4">Reviews</h1>
      <div className="mb-4">
        <textarea
          className="bg-gray-800 text-gray-100 rounded p-4 w-full h-24 resize-none"
          placeholder="Write a review..."
          value={reviewText}
          onChange={handleReviewTextChange}
        />
      </div>
      <div>
        <button
          className="bg-gray-800 text-gray-100 px-4 py-2 rounded"
          onClick={handleAddReview}
        >
          Add Review
        </button>
      </div>
      <div className="mt-8">
        {reviews.map((review, index) => (
          <div key={index} className="border border-gray-300 rounded p-4 mb-4">
            <p className="text-gray-700 mb-2">{review.text}</p>
            <p className="text-gray-500 text-sm">
              {formatTimestamp(review.timestamp)}
            </p>
            <button
              className="bg-gray-800 text-gray-100 px-4 py-2 rounded mt-2"
              onClick={() => handleDeleteReview(index)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
