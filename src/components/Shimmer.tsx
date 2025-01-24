import React from "react";

const Shimmer: React.FC = () => {
  return (
    <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-7 mt-5">
      {Array.from({ length: 15 }).map((_, index) => (
        <div
          key={index}
          className="w-52 animate-pulse flex flex-col items-center bg-gray-200 rounded-lg shadow-md gap-4"
        >
          {/* Image Placeholder */}
          <div className="bg-gray-300 rounded-t-lg w-full h-48"></div>
          {/* Title Placeholder */}
          <div className="bg-gray-300 rounded h-5 w-3/4 my-4"></div>
          {/* Subtitle Placeholder */}
          <div className="bg-gray-300 rounded h-4 w-1/2 mb-4"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
