import React from "react";

//For pagination we have to create interface which takes values as
/* 
currPage, 
onNext,
onPrev
isDisabled (if curPage === 1 then it should be disabled)
*/

interface PaginationProps {
    currPage: number;
    onNext: () => void;
    onPrev: () => void;
    isDisabled: boolean;
    totalPages: number;  // Added to display total pages
    onFirst: () => void;  // Added for navigating to the first page
    onLast: () => void;   // Added for navigating to the last page
}

const Pagination: React.FC<PaginationProps> = ({
    currPage,
    onNext,
    onPrev,
    isDisabled,
    totalPages,
    onFirst,
    onLast,
}) => {
    return (
        <div className="flex items-center justify-center space-x-3 m-4 mt-6 ">
            {/* First Page Button */}
            <button
                onClick={onFirst}
                disabled={currPage === 1}
                className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-300 disabled:bg-gray-400 disabled:text-gray-500"
            >
                First
            </button>

            {/* Previous Button */}
            <button
                onClick={onPrev}
                disabled={isDisabled}
                className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:text-gray-500"
            >
                Previous
            </button>

            {/* Current Page and Total Pages */}
            <span className="text-blue-50 text-lg font-semibold ">
                {currPage} of {totalPages}
            </span>

            {/* Next Button */}
            <button
                onClick={onNext}
                className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-blue-400 disabled:bg-gray-400 disabled:text-gray-500"
            >
                Next
            </button>

            {/* Last Page Button */}
            <button
                onClick={onLast}
                disabled={currPage === totalPages}
                className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-300 disabled:bg-gray-400 disabled:text-gray-500"
            >
                Last
            </button>
        </div>
    );
};

export default Pagination;
