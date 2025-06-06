import React, { useEffect, useState } from "react";
import { CreateNote } from "../components/CreateNote";
import { MessagePopUp } from "../components/MessagePopUp";
import { usePopUpStore } from "../store/PopUpStore";
import { titleStore } from "../store/NoteTitleStore";
import { TitleCard } from "../components/TitleCard";
import axios from "axios";
import { LoadingRing } from "../components/LoadingRing";
import { noteActionStore } from "../store/NoteActionStore";

export const Notes = () => {
    const [userId, setUserId] = useState(
        localStorage.getItem("note-app-userid")
    );
    const [userName, setUserName] = useState(
        localStorage.getItem("note-app-username")
    );

    //store
    const { type, message, setType, setMessage } = usePopUpStore();
    const { loading, titles, setLoadingStatus, addTitle, removeTitle, setAll } =
        titleStore();
    const { searching, setSearching } = noteActionStore();

    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

    const getTitles = async () => {
        const url = `${baseUrl}/notes/get-titles/${userId}`;

        try {
            const response = await axios.get(url);
            const dataArr = [];
            response.data.forEach((item, i) => {
                dataArr.push({
                    id: item.id,
                    title: item.title,
                    date: item["date-created"],
                });
            });
            console.log(dataArr);
            setAll(dataArr);
        } catch (error) {
            setAll([]);
            //no erorr to handle, output always []
            //enusre userId is 'valid'
        } finally {
            setLoadingStatus(false);
        }
    };

    const [creatingNote, setNoteCreating] = useState(false);
    const [searchKey, setSearchKey] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    useEffect(() => {
        setType("info");
        setMessage(`Welcome ${userName}`);
        getTitles();
    }, []);

    useEffect(() => {
        console.log(titles)
    }, [titles])

    useEffect(() => {
        if (searchKey.length > 0) {
            //include the
            const result = titles
                .filter((item) =>
                    item.title.toLowerCase().includes(searchKey.toLowerCase())
                )
                .map((item) => ({ ...item, searchKey }));
            setSearchResult(result);
        } else {
            setSearchResult((prev) => []);
        }
    }, [searchKey]);

    return (
        <>
            {creatingNote && (
                <CreateNote setClose={setNoteCreating}></CreateNote>
            )}
            {<MessagePopUp></MessagePopUp>}
            {loading && <LoadingRing></LoadingRing>}
            <div className="min-w-screen min-h-screen bg-background-primary overflow-hidden max-w-screen max-h-screen overflow-y-scroll">
                {/* area for notes */}
                <div
                    className="h-full w-full p-4 flex flex-wrap gap-4 
                flex-col md:flex-row md:items-start md:justify-start overflow-scroll"
                >
                    {!searching &&
                        titles.map((item, i) => {
                            if (titles.length - 1 == i) {
                                return (
                                    <>
                                        <TitleCard
                                            key={i}
                                            dateCreated={item.date}
                                            title={item.title}
                                            index={i}
                                            id={item.id}
                                        />
                                        <div className="mb-20"></div>
                                    </>
                                );
                            }
                            return (
                                <TitleCard
                                    key={i}
                                    dateCreated={item.date}
                                    title={item.title}
                                    index={i}
                                    id={item.id}
                                />
                            );
                        })}

                    {searching &&
                        searchResult.map((item, i) => {
                            if (searchResult.length - 1 == i) {
                                return (
                                    <>
                                        <TitleCard
                                            searchValue={searchKey}
                                            key={i}
                                            dateCreated={item.date}
                                            title={item.title}
                                            index={i}
                                            id={item.id}
                                        />
                                        <div className="mb-20"></div>
                                    </>
                                );
                            }
                            return (
                                <TitleCard
                                    key={i}
                                    searchValue={searchKey}
                                    dateCreated={item.date}
                                    title={item.title}
                                    index={i}
                                />
                            );
                        })}
                </div>

                <div className="fixed bottom-0 w-screen p-4 flex flex-row justify-between bg-gradient-to-t from-background-primary to-transparent ">
                    <div className="flex gap-4 w-full">
                        <div className="p-1 bg-gray-dark rounded-lg">
                            <button
                                disabled={message != null}
                                onClick={() => {
                                    setNoteCreating(true);
                                }}
                                className="flex gap-2 bg-blue-3 px-2 py-0 rounded-md active:translate-y-1 hover:bg-blue-2"
                            >
                                <p className="text-2xl font-semibold md:block hidden">
                                    new note
                                </p>{" "}
                                <div className="scale-90">
                                    <PlusSVG></PlusSVG>
                                </div>
                            </button>
                        </div>
                        <div className="h-full flex flex-row w-full  md:w-fit justify-center bg-gray-light px-4 rounded-lg">
                            <input
                                value={searchKey}
                                onChange={(e) => {
                                    setSearchKey(e.target.value.trimStart());
                                    if (e.target.value.length > 0) {
                                        setSearching(true);
                                    } else {
                                        setSearching(false);
                                    }
                                }}
                                type="text"
                                placeholder="Search notes"
                                className="bg-transparent w-full font-semibold text-lg focus:bg-transparent focus:outline-none placeholder-gray-extra-light text-white"
                            />
                            <div className=" place-content-center ">
                                <div className="scale-70 hover:scale-80">
                                    <SerachSVG></SerachSVG>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="py-2 bg-gray-900/40 md:bg-gray-900 md:static fixed top-4 left-4 md:px-10 px-4 rounded-md ">
                        <p className="text-gray-extra-light max-w-[100px] text-xl font-semibold">
                            {userName}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

function SerachSVG() {
    const { searching, setSearching } = noteActionStore();

    return (
        <>
            <svg
                className=""
                width="38"
                height="36"
                viewBox="0 0 38 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M19 2C28.4921 2 36 9.26396 36 18C36 26.736 28.4921 34 19 34C9.50789 34 2 26.736 2 18C2 9.26396 9.50789 2 19 2Z"
                    fill="#455163"
                />
                <path
                    style={{ stroke: !searching ? "#9FB4D4" : "yellow" }}
                    d="M19 2C28.4921 2 36 9.26396 36 18C36 26.736 28.4921 34 19 34C9.50789 34 2 26.736 2 18C2 9.26396 9.50789 2 19 2Z"
                    stroke="#9FB4D4"
                    strokeWidth="4"
                />
                <path
                    d="M19 2C28.4921 2 36 9.26396 36 18C36 26.736 28.4921 34 19 34C9.50789 34 2 26.736 2 18C2 9.26396 9.50789 2 19 2Z"
                    stroke="black"
                    strokeOpacity="0.2"
                    strokeWidth="4"
                />
            </svg>
        </>
    );
}

function PlusSVG() {
    return (
        <>
            <svg
                width="39"
                height="39"
                viewBox="0 0 39 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    className="fill-[#231F20] hover:fill-red-btn"
                    d="M30.8752 17.875H21.1252V8.125C21.1252 7.69402 20.954 7.2807 20.6493 6.97595C20.3445 6.67121 19.9312 6.5 19.5002 6.5C19.0693 6.5 18.6559 6.67121 18.3512 6.97595C18.0464 7.2807 17.8752 7.69402 17.8752 8.125V17.875H8.12524C7.69427 17.875 7.28094 18.0462 6.9762 18.351C6.67145 18.6557 6.50024 19.069 6.50024 19.5C6.50024 19.931 6.67145 20.3443 6.9762 20.649C7.28094 20.9538 7.69427 21.125 8.12524 21.125H17.8752V30.875C17.8752 31.306 18.0464 31.7193 18.3512 32.024C18.6559 32.3288 19.0693 32.5 19.5002 32.5C19.9312 32.5 20.3445 32.3288 20.6493 32.024C20.954 31.7193 21.1252 31.306 21.1252 30.875V21.125H30.8752C31.3062 21.125 31.7195 20.9538 32.0243 20.649C32.329 20.3443 32.5002 19.931 32.5002 19.5C32.5002 19.069 32.329 18.6557 32.0243 18.351C31.7195 18.0462 31.3062 17.875 30.8752 17.875Z"
                    fill="#231F20"
                />
            </svg>
        </>
    );
}
