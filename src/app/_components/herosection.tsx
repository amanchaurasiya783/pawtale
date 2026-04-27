import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton";

interface HeroSectionProps {
    title?: string;
    backgroundImage?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title, backgroundImage }) => {
    return (
        <div
            className="relative w-full h-[200px] md:h-[300px] flex items-center justify-center text-white text-center"
        >
            {backgroundImage ? (
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            ) : (
                <Skeleton className="absolute inset-0 w-full h-full" />
            )}

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>

            {/* Title */}
            <h1 className="relative text-4xl md:text-6xl font-bold">
                {title ? title : <Skeleton width={200} height={40} />}
            </h1>
        </div>
    );
};

export default HeroSection;
