"use client";
import { StarIcon as Star } from "@heroicons/react/outline";
import { StarIcon as SolidStar } from "@heroicons/react/solid";
import { useState } from "react";

const StarIcon = () => {
  const [starred, setStarred] = useState([1, 1, 1, 1, 0]);
  return (
    <div className="flex justify-center">
      {starred.map((star, index) =>
        star ? (
          <SolidStar key={index} className="w-4 h-4" />
        ) : (
          <Star key={index} className="w-3.5 h-3.5" />
        )
      )}
    </div>
  );
};

export default StarIcon;
