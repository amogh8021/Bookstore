import React from 'react';

const BookSkeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col border border-gray-100 animate-pulse">
            {/* Image Skeleton */}
            <div className="w-full h-40 bg-gray-200"></div>

            {/* Content Skeleton */}
            <div className="p-3 flex flex-col flex-1 gap-2">
                {/* Title */}
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                {/* Author */}
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>

                {/* Price (bottom) */}
                <div className="h-4 bg-gray-200 rounded w-1/4 mt-auto"></div>
            </div>
        </div>
    );
};

export default BookSkeleton;
