import React, { useActionState, useState } from "react";
import { motion } from "framer-motion";
import { LoadingRing } from "./LoadingRing";
import axios from "axios";
import { usePopUpStore } from "../store/PopUpStore";
import { titleStore } from "../store/NoteTitleStore";

export const CreateNote = ({setClose}) => {

    const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(false);

    const userid = localStorage.getItem('note-app-userid');
    const {type, message, setType, setMessage} = usePopUpStore();
    const { addTitle } = titleStore();

    const handleNoteCreate = async () => {
        setLoading(true)
        try {
            const requestData = {
                title: title,
                content: '',
            };
            const res = await axios.post(
                `${baseUrl}/notes/add-note/${userid}`,
                requestData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            setType('success');
            setMessage(`note- ${res.data.title} created`)
            addTitle({id: res.data.id, title: res.data.title, date: res.data['date-created']})
        } catch (error) {
            if(error.response) {
                setType('error');
                setMessage('title already exists!')
            }
        } finally {
            setLoading(false);
            setClose(false);
        }
    };

    return (
        <div className="z-40 h-screen w-screen absolute left-0 top-0  flex justify-center items-center">
            {loading && <LoadingRing></LoadingRing>}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-screen md:max-w-[500px] mx-4 rounded-lg bg-transparent p-[2px] bg-linear-to-b from-yellow-1 via-yellow-2 to-yellow-3"
            >
                <div className="h-full w-full bg-background-primary rounded-lg  outline-1 outline-gray-light-text flex flex-col p-2">
                    <p className="text-lg font-semibold text-gray-light-text pl-1 my-2">Note Title</p>
                    <div className="bg-gray-light p-2 rounded-sm flex flex-col">
                        <input
                            value={title}
                            onChange={(e)=>{setTitle(e.target.value)}}
                            type="text"
                            placeholder="Title"
                            className="bg-transparent font-semibold text-lg focus:bg-transparent placeholder-gray-extra-light text-white focus:outline-none"
                        />
                    </div>

                    <div className="w-full flex gap-10 justify-center pt-2 mt-4">
                        <button onClick={handleNoteCreate} className="bg-green-btn px-4 hover:bg-green-btn/50 active:translate-y-1 py-1 rounded-md text-lg text-gray-300">create</button>
                        <button onClick={() => {setClose(false)}} className="hover:bg-red-btn/50  bg-red-btn active:translate-y-1 px-4 py-1 rounded-md text-lg text-gray-300">cancel</button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
