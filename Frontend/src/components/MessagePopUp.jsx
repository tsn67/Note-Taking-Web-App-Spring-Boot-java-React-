import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePopUpStore } from "../store/PopUpStore";

export const MessagePopUp = () => {

    const [show, setShowing] = useState(true);
    const {type, message, setType, setMessage} = usePopUpStore();

    useEffect(() => {
        if(type) {
            setShowing(true);
            setTimeout(() => {
                setShowing(false)
            }, 2000)
            setTimeout(() => {
                setType(null); setMessage(null);
            }, 2300)
        }
    }, [type])


    if(type &&  type == 'info') {
        return <div className="w-screen absolute left-0 bottom-0 flex justify-center overflow-y-hidden">
            <AnimatePresence>
                {show && <motion.div initial={{y: 60}} animate={{y: 0}} exit={{y: 60}} transition={{damping: 'none'}} className="bg-blue-2 z-40 mb-4 rounded-md px-2 py-1">
                    <p className="text-white">{message}</p>
                </motion.div>}
            </AnimatePresence>
        </div>
    }

    else if(type &&  type == 'error') {
        return <div className="w-screen absolute left-0 bottom-0 flex justify-center overflow-y-hidden">
            <AnimatePresence>
                {show && <motion.div initial={{y: 60}} animate={{y: 0}} exit={{y: 60}} transition={{damping: 'none'}} className="bg-red-btn z-40 mb-4 rounded-md px-2 py-1">
                    <p className="text-white">{message}</p>
                </motion.div>}
            </AnimatePresence>
        </div>
    }

    else if(type &&  type == 'success') {
        return <div className="w-screen absolute left-0 bottom-0 flex justify-center overflow-y-hidden">
            <AnimatePresence>
                {show && <motion.div initial={{y: 60}} animate={{y: 0}} exit={{y: 60}} transition={{damping: 'none'}} className="bg-green-btn z-40 mb-4 rounded-md px-2 py-1">
                    <p className="text-white">{message}</p>
                </motion.div>}
            </AnimatePresence>
        </div>
    }

    return null;
};
