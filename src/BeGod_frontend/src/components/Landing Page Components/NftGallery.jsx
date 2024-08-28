import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation
import YellowButton from '../button/YellowButton';
const NFTGallery = ({ currentCollection, collections, currentIndex}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8; // Show 8 images per page
  const [animationClass, setAnimationClass] = useState('');

  // Calculate the range of images to show on the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = currentCollection.slice(startIndex, endIndex);

  // Handlers for pagination
  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < currentCollection.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Apply animation when the component mounts or the page changes
  useEffect(() => {
    setAnimationClass('animate-fadeInUp');
    const timer = setTimeout(() => setAnimationClass(''), 1000); // Remove animation class after animation completes
    return () => clearTimeout(timer);
  }, [currentPage, currentCollection]); // Re-run animation on page change or collection change

  useEffect(()=>{
    setCurrentPage(0);
  },[currentCollection]);
  return (
    <div>
      <div className={`w-[80%] grid grid-cols-4 gap-4 mt-8 ml-32 mb-8 ${animationClass}`}>
        {currentItems && currentItems.map((img, index) => (
          <div className="flip-card border rounded-lg" key={index}>
            <div className="flip-card-inner">
              {/* Front Side */}
              <div className="flip-card-front flex items-center justify-center">
                <img src={img.img1} alt={`NFT ${index + 1}`} className="w-[98%] h-[98%] rounded-lg object-cover" />
              </div>
              {/* Back Side */}
              <div className="flip-card-back relative flex flex-col justify-center items-center text-white">
                <img src={img.img1} alt={`NFT ${index + 1}`} className="object-cover blur-sm w-[98%] h-[98%]" />
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 rounded-lg">
                  <h1 className="text-xl sm:text-3xl font-extrabold">{img.name}</h1>
                  <h2 className="text-lg sm:text-xl mt-2">Sold: {img.sold}/100</h2>
                  <h2 className="text-lg sm:text-xl mt-1">{img.ICP} ICP</h2>
                  <button className="mt-4 w-[60%] h-[5vh] sm:w-[40%] sm:h-[3vh] bg-blue-400 text-black border-3px border-gray-100 shadow-lg transform transition-transform hover:scale-105">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className='w-[1100px] flex justify-between items-center ml-[10%]'>
        <img
          src="/Hero/up.png"
          alt="Previous"
          onClick={handlePreviousPage}
          className={`hover:cursor-pointer -rotate-90 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        <Link to={`/collection/${collections[currentIndex].name}`} className='w-[20%] p-2 border-[1px] border-[#FCD37B]'>
          <YellowButton>Explore <span>Celtic</span> Collection</YellowButton>
        </Link>
        <img
          src="/Hero/down.png"
          alt="Next"
          onClick={handleNextPage}
          className={`hover:cursor-pointer -rotate-90 ${(currentPage + 1) * itemsPerPage >= currentCollection.length ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
      </div>
    </div>
  );
};

export default NFTGallery;