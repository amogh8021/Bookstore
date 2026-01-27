import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Images mapping for each genre
import history from "./assets/history.jpg";
import self from "./assets/self.jpg";
import kids from "./assets/kids.jpg";
import comics from "./assets/comics.jpg";
import fiction from "./assets/image.png";
import nonfiction from "./assets/non-fiction.png";
import tech from "./assets/tech.webp";
import bio from "./assets/bio.webp";
import romance from "./assets/romance.webp";
import fantasy from "./assets/fantasy.webp";
import mystery from "./assets/mystrery.jpeg";
import poetry from "./assets/poetry.jpg";

// Map genre name to image
const genreImages = {
  "History": history,
  "Self-Help": self,
  "Children's Books": kids,
  "Comics & Graphic Novels": comics,
  "Fiction": fiction,
  "Non-Fiction": nonfiction,
  "Science & Technology": tech,
  "Biographies": bio,
  "Romance": romance,
  "Fantasy": fantasy,
  "Mystery & Thriller": mystery,
  "Poetry": poetry,
};

const CaategorySection = () => {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);


  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get("http://localhost:8080/book/genres");
        setGenres(response.data); 
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  const handleCategoryJump = (genre) => {
    navigate(`/shop?genre=${encodeURIComponent(genre)}`);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Categories</h1>

      <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
        {genres.map((genreName, index) => (
          <div
            key={index}
            onClick={() => handleCategoryJump(genreName)}
           className="
  flex-shrink-0 w-40 bg-white
  border rounded-xl shadow-md
  transition-all duration-300
  hover:-translate-y-2 hover:shadow-xl
">
            <img
              src={genreImages[genreName] || fiction}
              alt={genreName}
              className="w-full h-28 object-cover rounded-t-lg"
            />
            <h2 className="text-center text-sm font-semibold py-2">
              {genreName}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaategorySection;
