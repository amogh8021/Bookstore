import { MdOutlineNavigateNext } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import author1 from "./assets/1.jpg";
import author2 from "./assets/2.jpg";
import author3 from "./assets/3.jpg";
import author4 from "./assets/4.jpg";

const authors = [
  { id: 1, name: "James Clear", book: "Atomic Habits", img: author1 },
  { id: 2, name: "Robert Kiyosaki", book: "Rich Dad Poor Dad", img: author2 },
  { id: 3, name: "Arundhati Roy", book: "The God of Small Things", img: author3 },
  { id: 4, name: "Neha Dixit", book: "Bestselling Articles", img: author4 },
 
];

const AuthorSection = () => {
  const navigate = useNavigate();

  const handleAuthorClick = (authorName) => {
    navigate(`/shop?author=${encodeURIComponent(authorName)}`);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Recommended Authors
      </h2>

      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-4 no-scrollbar">
        {authors.map((author) => (
          <div
            key={author.id}
            onClick={() => handleAuthorClick(author.name)}
            className="
              flex items-center gap-3 bg-white
              border rounded-xl shadow-md
              px-4 py-3 cursor-pointer
              transition-all duration-300
              hover:-translate-y-2 hover:shadow-xl
              min-w-[250px]
            "
          >
            <img
              src={author.img}
              alt={author.name}
              className="w-12 h-12 rounded-full object-cover shadow"
            />

            <div>
              <p className="font-medium text-gray-800">{author.name}</p>
              <p className="text-sm text-gray-500">{author.book}</p>
            </div>

            <MdOutlineNavigateNext className="ml-auto text-gray-500 text-xl" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorSection;
