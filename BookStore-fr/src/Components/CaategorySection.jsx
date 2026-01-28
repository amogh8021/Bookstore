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
            {(() => {
              const lowerGenre = genreName.toLowerCase();
              let matchedImg = fiction; // Default fallback

              // Specific mappings
              if (lowerGenre.includes("history") || lowerGenre.includes("war") || lowerGenre.includes("ancient")) matchedImg = history;
              else if (lowerGenre.includes("self") || lowerGenre.includes("motivat") || lowerGenre.includes("success")) matchedImg = self;
              else if (lowerGenre.includes("child") || lowerGenre.includes("kid") || lowerGenre.includes("teen")) matchedImg = kids;
              else if (lowerGenre.includes("comic") || lowerGenre.includes("graphic") || lowerGenre.includes("manga")) matchedImg = comics;

              else if (lowerGenre.includes("science") || lowerGenre.includes("tech") || lowerGenre.includes("computer") || lowerGenre.includes("data") || lowerGenre.includes("prog")) matchedImg = tech;
              else if (lowerGenre.includes("bio") || lowerGenre.includes("memoir")) matchedImg = bio;

              else if (lowerGenre.includes("romance") || lowerGenre.includes("love")) matchedImg = romance;
              else if (lowerGenre.includes("fantasy") || lowerGenre.includes("magic") || lowerGenre.includes("dragon")) matchedImg = fantasy;
              else if (lowerGenre.includes("mystery") || lowerGenre.includes("thriller") || lowerGenre.includes("crime") || lowerGenre.includes("horror")) matchedImg = mystery;
              else if (lowerGenre.includes("poetry") || lowerGenre.includes("verse")) matchedImg = poetry;

              // Broad Non-Fiction
              else if (lowerGenre.includes("non-fiction") || lowerGenre.includes("non fiction") ||
                lowerGenre.includes("business") || lowerGenre.includes("finance") ||
                lowerGenre.includes("travel") || lowerGenre.includes("cook") ||
                lowerGenre.includes("food") || lowerGenre.includes("art") ||
                lowerGenre.includes("design") || lowerGenre.includes("psychology") ||
                lowerGenre.includes("phil") || lowerGenre.includes("relig") ||
                lowerGenre.includes("edu")) matchedImg = nonfiction;

              return (
                <img
                  src={matchedImg}
                  alt={genreName}
                  className="w-full h-28 object-cover rounded-t-lg"
                />
              );
            })()}
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
