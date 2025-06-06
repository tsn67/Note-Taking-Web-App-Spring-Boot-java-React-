import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { noteActionStore } from "../store/NoteActionStore";
import { NoteView } from "./NoteView";

export const TitleCard = ({ searchValue, title, dateCreated, index, id }) => {
    const { activeIndex, setActiveIndex } = noteActionStore();

    const [displayTitle, setDisplayTitle] = useState(null);
    useEffect(() => {
        if (searchValue && title) {
            const lowerTitle = title.toLowerCase();
            const lowerSearch = searchValue.toLowerCase();
            const startIndex = lowerTitle.indexOf(lowerSearch);
            if (startIndex !== -1) {
                const matchLength = searchValue.length;
                setDisplayTitle({
                    prefix: title.slice(0, startIndex),
                    highLight: title.slice(
                        startIndex,
                        startIndex + matchLength // Fixed: was just matchLength
                    ),
                    postfix: title.slice(startIndex + matchLength),
                });
            } else {
                // Not found: return entire title as prefix, no highlight
                setDisplayTitle({
                    prefix: title,
                    highLight: "",
                    postfix: "",
                });
            }
        }
    }, [searchValue, title]);

    if (activeIndex == index) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute z-50 top-0 left-0 w-screen h-screen bg-black/30 backdrop-blur-sm rounded-lg grid place-content-center overflow-hidden"
            >
                <motion.div
                    initial = {{y: -20}}
                    animate = {{y: 0}}
                >
                    <NoteView id={id} title={title} dateCreated={dateCreated}></NoteView>
                </motion.div>
            </motion.div>
        );
    } else
        return (
            <motion.div
                layout={`box-${index}`}
                onClick={() => {
                    setActiveIndex(index);
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="lg:w-[280px] w-full cursor-pointer lg:h-[160px] md:w-full md:h-fit rounded-sm bg-gray-dark flex flex-col justify-between p-4  box-border outline-0 hover:outline-2 hover:outline-yellow-2"
            >
                <div>
                    {displayTitle != null && (
                        <p className="text-gray-light-text md:text-3xl text-2xl font-medium line-clamp-3">
                            <span>{`${displayTitle.prefix} `}</span>
                            <span className="text-blue-2 bg-gray-800 rounded-md px-1">
                                {displayTitle.highLight}
                            </span>
                            <span>{displayTitle.postfix}</span>
                        </p>
                    )}
                    {searchValue == null && (
                        <p className="text-gray-light-text md:text-3xl text-2xl font-medium line-clamp-3">
                            {title}
                        </p>
                    )}
                </div>
                <div className="w-full flex justify-between">
                    <p className="text-yellow-2 text-lg">{dateCreated}</p>
                    <DeleteSVG></DeleteSVG>
                </div>
            </motion.div>
        );
};

function DeleteSVG() {
    return (
        <button title="delete note " className="scale-70">
            <svg
                width="25"
                height="32"
                viewBox="0 0 25 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    className="hover:fill-red-400"
                    d="M1.78571 28.4444C1.78571 30.4 3.39286 32 5.35714 32H19.6429C21.6071 32 23.2143 30.4 23.2143 28.4444V7.11111H1.78571V28.4444ZM25 1.77778H18.75L16.9643 0H8.03571L6.25 1.77778H0V5.33333H25V1.77778Z"
                    fill="#564646"
                />
            </svg>
        </button>
    );
}
