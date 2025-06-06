import React from "react";
import { motion } from "framer-motion";

export const LoadingRing = () => {
    return <div className="h-screen w-screen fixed top-0 left-0 grid place-content-center">
        <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
            }}
            className="h-[70px] w-[70px] rounded-full border-[10px] border-x-blue-400 border-transparent"
        />
    </div>;
};
