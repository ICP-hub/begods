import React, { useState, useEffect } from 'react';

const CollectionTypes = () => {
    const images = [
        {
            img: "/image/image 18.png",
            h: "Lorem ipsum",
            p: "Lorem ipsum dolor sit amet consectetur. Suspendisse pretium vel elit pellentesque. Mattis varius urna scelerisque cum mattis vel.",
            type: "Norse"
        },
        {
            img: "/image/image 20.png",
            h: "Lorem ipsum",
            p: "Lorem ipsum dolor sit amet consectetur. Suspendisse pretium vel elit pellentesque. Mattis varius urna scelerisque cum mattis vel.",
            type: "Norse"
        },
        {
            img: "/image/image 23.png",
            h: "Lorem ipsum",
            p: "Lorem ipsum dolor sit amet consectetur. Suspendisse pretium vel elit pellentesque. Mattis varius urna scelerisque cum mattis vel.",
            type: "Norse"
        },
        {
            img: "/image/image 25.png",
            h: "Lorem ipsum",
            p: "Lorem ipsum dolor sit amet consectetur. Suspendisse pretium vel elit pellentesque. Mattis varius urna scelerisque cum mattis vel.",
            type: "Norse"
        },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 2000);

        return () => clearInterval(intervalId); // Clear the interval on component unmount
    }, [images.length]);

    return (
        <div style={{ fontFamily: "QuickSand" }} className="flex mt-12 relative">
            <div className="h-[500px] w-full sm:w-1/2 flex items-end">
                <img src={images[currentIndex].img} alt="" className="h-full w-full" />
            </div>
            <div className="absolute bg-white bg-opacity-20 sm:bg-inherit w-[80%] sm:w-1/2 right-0 bottom-8 sm:bottom-40 sm:mr-32 p-4 flex flex-col text-white items-end sm:items-start gap-4">
                <h1 className="text-[20px] sm:text-[30px] font-[400] leading-[40px] text-right">
                    {images[currentIndex].h}
                </h1>
                <p className="w-[100%] sm:w-[57%] text-[15px] font-[400] leading-[20px] text-right sm:text-start">
                    {images[currentIndex].p}
                </p>
                <button className='w-[50vw] sm:w-[15vw] h-[4vh] bg-black text-white mt-4 explore-button'>
                    <span>{images[currentIndex].type} Collection</span>
                </button>
            </div>
        </div>
    );
}

export default CollectionTypes;
