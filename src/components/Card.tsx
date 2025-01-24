import React from "react";


interface CardProps{
  title: string;
  content: React.ReactNode;
}
const Card: React.FC<CardProps> = ({title, content}) => {
  
    return (
      <div className=" p-4 m-4 border bg-blue-200 border-gray-300 rounded-lg shadow-lg shadow-black hover:bg-blue-300 hover:border-black">
        <h3 className="text-xl font-semibold text-center capitalize mb-2">{title}</h3>
        <div className="text-center">{content}</div>
      </div>
    );
};
export default Card;
