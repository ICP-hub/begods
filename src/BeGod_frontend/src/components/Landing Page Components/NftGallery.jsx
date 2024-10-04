import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation
import YellowButton from '../button/YellowButton';
import { useTranslation } from 'react-i18next';


const NFTGallery = ({ currentCollection }) => {
  // console.log("current collection in nft gallery",currentCollection);
  const [currentPage, setCurrentPage] = useState(0);
  // const itemsPerPage = 1; // Show 8 images per page
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [animationClass, setAnimationClass] = useState('');
  // console.log(itemsPerPage)
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

  const {t} = useTranslation()

  // Apply animation when the component mounts or the page changes
  useEffect(() => {
    setAnimationClass('animate-fadeInUp');
    const timer = setTimeout(() => setAnimationClass(''), 1000); // Remove animation class after animation completes
    return () => clearTimeout(timer);
  }, [currentPage, currentCollection]); // Re-run animation on page change or collection change

  useEffect(() => {
    setCurrentPage(0);
  }, [currentCollection]);

  useEffect(() => {
    const updateImagesPerSet = () => {
      if (window.innerWidth >= 650) { // md and above
        setItemsPerPage(8);
      } else { // below md
        setItemsPerPage(1);
      }
    };
    // Initial call
    updateImagesPerSet();
    // Event listener for window resize
    window.addEventListener('resize', updateImagesPerSet);
    // Clean up the event listener on component unmount
    return () => window.removeEventListener('resize', updateImagesPerSet);
  }, []);

  console.log("current collection in nft gallery",currentCollection);
  return (
    <div>
      <div className='flex items-center justify-center sm:hidden'>
        <div>
          <img
            src="/Hero/up.png"
            alt="Previous"
            onClick={handlePreviousPage}
            className={`hover:cursor-pointer -rotate-90 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
        <div className={`w-[90%] flex img-center justify-center mt-12 mb-12 sm:hidden ${animationClass}`}>
          {currentItems && currentItems.map((eachCard, index) => {
            const img = eachCard[0];
            return(
              <div className="rounded-lg flip-card" key={index}>
              <div className="flip-card-inner w-[210px] h-[335px]">
                {/* Front Side */}
                <div className="flex items-center justify-center flip-card-front">
                  <img src={img.img1} alt={`NFT ${index + 1}`} className="w-[100%] h-[98%] rounded-lg object-cover" />
                </div>
                {/* Back Side */}
                <div className="relative flex flex-col items-center justify-center text-white flip-card-back">
                  <img src={img.img1} alt={`NFT ${index + 1}`} className="object-cover blur-sm w-[98%] h-[98%]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black rounded-lg bg-opacity-60">
                    <h1 className="text-xl font-extrabold sm:text-3xl">{img.name}</h1>
                    <h2 className="mt-2 text-lg capitalize sm:text-xl">Type: {img.nftType}</h2>
                    <h2 className="mt-2 text-lg capitalize sm:text-xl">Quantity :{eachCard.length+1}</h2>
                    <h2 className="mt-1 text-lg sm:text-xl">{img.ICP} ICP</h2>
                    <Link to={`/Nft/${img.name}/buy?collectionId=${img.collectionId}&index=${img.index}`} className="flex items-center justify-center mt-4 w-[60%] h-[30px] sm:w-[40%] sm:h-[32px] bg-blue-400 text-black border-3px border-gray-100 shadow-lg transform transition-transform hover:scale-105">
                      {t('buyNow')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            )
            
})}
        </div>
        <div>
          <img
            src="/Hero/down.png"
            alt="Next"
            onClick={handleNextPage}
            className={`hover:cursor-pointer -rotate-90 ${(currentPage + 1) * itemsPerPage >= currentCollection.length ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        </div>
      </div>
      <div className={`hidden w-[80%] sm:grid sm:grid-cols-3 2xl:grid-cols-4 gap-24 lg:gap-4 mt-8 sm:mx-11 lg:mx-15 mb-8 ${animationClass}`}>
        {currentItems && currentItems.map((eachCard, index) => {
          const img = eachCard[0];
         return(
          <div className="rounded-lg flip-card " key={index}>
          <div className={`flip-card-inner border-3 ${
            img.borderColor === 'Golden'
              ? 'border-golden'
              : img.borderColor === 'Silver'
              ? 'border-silver'
              : img.borderColor === 'Bronze'
              ? 'border-bronze'
              : 'border-gray-100'
          }`}>
            {/* Front Side */}
            <div className="flex items-center justify-center flip-card-front">
              <img src={img.img1} alt={`NFT ${index + 1}`} className="object-cover w-full h-full rounded-lg" />
            </div>
            {/* Back Side */}
            <div className="relative flex flex-col items-center justify-center text-white flip-card-back">
              <img src={img.img1} alt={`NFT ${index + 1}`} className="object-cover w-full h-full blur-sm" />
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black rounded-lg bg-opacity-60">
                <h1 className="text-xl font-extrabold sm:text-3xl lg:text-2xl">{img.name}</h1>
                <h2 className="mt-2 text-lg capitalize sm:text-xl">Type : {img.nftType}</h2>
                <h2 className="mt-2 text-lg capitalize sm:text-xl">Quantity : {eachCard.length}</h2>
                <h2 className="mt-1 text-lg sm:text-xl">{img.ICP} ICP</h2>
                <Link to={`/Nft/${img.name}/buy?collectionId=${img.collectionId}&index=${img.index}`} className="flex items-center justify-center mt-4 w-[60%] h-[30px] sm:w-[40%] sm:h-[32px] bg-blue-400 text-black border-3px border-gray-100 shadow-lg transform transition-transform hover:scale-105">
                  {t('buyNow')}
                </Link>


              </div>
            </div>
          </div>
        </div>
         )
    })}
      </div>

      {/* Pagination Controls */}
      <div className='hidden w-[86%] sm:flex justify-between items-center '>
        <img
          src="/Hero/up.png"
          alt="Previous"
          onClick={handlePreviousPage}
          className={`hover:cursor-pointer  -rotate-90 ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
        />

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
