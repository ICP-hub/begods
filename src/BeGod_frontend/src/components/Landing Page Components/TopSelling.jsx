import React from 'react';

const TopSelling = () => {
  const images = [
    { img1: "/image/nft.png",name:"TANNGIOST",sold:"50",ICP:"0.56"},
    { img1: "/image/Component 25.png",name:"POSIDONE",sold:"50",ICP:"0.56" },
    { img1: "/image/Component 27.png",name:"SET",sold:"50",ICP:"0.56" },
    { img1: "/image/Component 28.png",name:"KARNAYAM",sold:"50",ICP:"0.56" },
    { img1: "/image/Component 22.png",name:"MIDGARD",sold:"50",ICP:"0.56" },
    { img1: "/image/Front.png",name:"CERBERVES",sold:"50",ICP:"0.56" },
    { img1: "/image/Component 43.png",name:"RA",sold:"50",ICP:"0.56" },
    { img1: "/image/Component 45.png",name:"DANU",sold:"50",ICP:"0.56" },
  ];

  return (
    <div style={{ fontFamily: "QuickSand" }} className="h-[45vh] w-full -mt-[70vh] sm:-mt-[90vh] md:-mt-[80vh] lg:-mt-[25%] pt-4">
      <h1 className="text-white text-3xl sm:text-3xl md:text-4xl lg:text-6xl  font-medium h-[5vh] w-full flex items-center justify-center mt-4 sm:pl-20 md:pl-4">
        Top Selling
      </h1>
      <div className="flex items-center sm:pl-[10%] md:pl-[150%] lg:pl-[110%] xl:pl-[55%] md:justify-center gap-4 overflow-x-auto px-4 mt-8 hide-scrollbar">
        {images.map((img, index) => (
          <div className="flip-card border-[5px] border-yellow-700 rounded-lg " key={index}>
            <div className="flip-card-inner">
              {/* Front Side */}
              <div className="flip-card-front">
                <img src={img.img1} alt={`NFT ${index + 1}`} className="w-full h-full object-cover" />
              </div>
              {/* Back Side */}
              <div className="flip-card-back relative flex flex-col justify-center items-center text-white">
                <img src={img.img1} alt={`NFT ${index + 1}`} className="w-full h-full object-cover blur-sm" />
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
    </div>
  );
};

export default TopSelling;
