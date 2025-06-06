import React, { useEffect, useState } from "react";
import { noteActionStore } from "../store/NoteActionStore";
import { LoadingRing } from "./LoadingRing";
import axios from "axios";
import { base } from "framer-motion/client";
import { motion } from "framer-motion";
import { usePopUpStore } from "../store/PopUpStore";
import { titleStore } from "../store/NoteTitleStore";

export const NoteView = ({ id, title, dateCreated }) => {
    const [noteTitle, setTitle] = useState((title = ""));
    const [noteContent, setNoteContent] = useState();

    const { setActiveIndex } = noteActionStore();
    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const [loading, setLoading] = useState(true);

    const { type, message, setType, setMessage } = usePopUpStore();
    const { titles, setLoadingStatus, addTitle, removeTitle, setAll } =
        titleStore();

    function closeNote() {
        setActiveIndex(-1);
    }

    const updateData = async () => {
        setLoading(true);

        try {
            const requestData = {
                title: noteTitle,
                content: noteContent,
            };
            const res = await axios.put(
                `${baseUrl}/notes/update-note/${id}`,
                requestData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setType("success");
            setMessage(`note- ${res.data.title} daved`);
            removeTitle(id);
            addTitle({
                id: id,
                title: noteTitle,
                date: dateCreated,
            });
        } catch (error) {
        } finally {
            setLoading(false);
            closeNote();
        }
    };

    const getNoteData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/notes/get-note/${id}`);
            setTitle(response.data.title);
            setNoteContent(response.data.content);
        } catch (error) {
            //no error expected (hard coded)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getNoteData();
    }, []);

    return (
        <>
            <div className=" rounded-lg h-[80vh] w-[90vw] m-4 md:w-[500px] relative md:h-[600px] overflow-hidden bg-linear-to-b from-blue-1 via-blue-2 to-blue-3 p-[2px]">
                {loading && (
                    <div className="h-full w-full grid place-content-center absolute top-0 left-0 bg-background-primary">
                        <LoadingRingSmall></LoadingRingSmall>
                    </div>
                )}
                <div className="h-full w-full bg-background-primary rounded-lg flex flex-col gap-2">
                    <div className="flex flex-col gap-1 p-2">
                        <div className="flex w-full justify-between">
                            <p className="text-xl p-1 font-medium text-yellow-3">
                                Note Title
                            </p>
                            <p className="text-md p-1 font-medium text-yellow-2">
                                {dateCreated}
                            </p>
                        </div>
                        <input
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            value={noteTitle}
                            className="text-yellow-2 focus:outline-none  bg-gray-light p-1 rounded-[4px]"
                        ></input>
                    </div>
                    <div className="flex flex-row gap-2 px-2">
                        <button
                            onClick={updateData}
                            className="px-1 bg-blue-2 hover:bg-blue-1 active:translate-y-1 text-white rounded-sm pb-1"
                        >
                            save note
                        </button>
                        <button
                            onClick={closeNote}
                            className="px-1 bg-red-btn hover:bg-red-800 active:translate-y-1 text-white rounded-sm pb-1"
                        >
                            cancel
                        </button>
                    </div>
                    <div className="p-2 h-full">
                        <textarea
                            onChange={(e) => {
                                setNoteContent(e.target.value);
                            }}
                            value={noteContent}
                            id="message"
                            className="w-full h-full  border border-gray-300 rounded-0 p-2 focus:outline-yellow-2 font-medium  resize-none outline-1 outline-gray-extra-light  border-none text-xl placeholder:text-gray-light placeholder:font-semibold text-gray-extra-light"
                            placeholder="Type your note...."
                        ></textarea>
                    </div>
                </div>
            </div>
        </>
    );
};

function LoadingRingSmall() {
    return (
        <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
            }}
            className="h-[40px] w-[40px] rounded-full border-[6px] border-x-blue-400 border-transparent"
        />
    );
}
