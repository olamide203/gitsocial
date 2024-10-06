import React, { useState } from "react";
import { BsDash, BsPlus } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

function Accordion({ heading, content, expand }) {
    const [isExpanded, setIsExpanded] = useState(expand);
    const variants = {
        open: {
            height: "auto",
            opacity: 1,
        },
        close: {
            height: "0px",
            overflow: "hidden",
            opacity: 0,
        },
        expanded: {
            backgroundColor: "#FAFAFA",
        },
        collapsed: {
            backgroundColor: "#F6F8FB",
        },
    };

    return (
        <>
            <motion.div
                className="w-full px-10 py-6 rounded-xl text-slate-800 shadow-lg hover:cursor-pointer overflow-hidden h-max"
                onClick={() => setIsExpanded(!isExpanded)}
                initial="collapsed"
                variants={variants}
                animate={`${isExpanded ? "expanded" : "collapsed"}`}
            >
                <div className="grid grid-cols-auto-2 gap-10 ">
                    <h3 className="font-medium text-md self-center">
                        {heading}
                    </h3>
                    <button className="btn btn-circle btn-ghost">
                        {!isExpanded && <BsPlus className="text-xl" />}
                        {isExpanded && <BsDash className="text-xl" />}
                    </button>
                </div>
                <AnimatePresence>
                    <motion.div
                        className=""
                        initial="close"
                        variants={variants}
                        animate={`${isExpanded ? "open" : "close"}`}
                        transition={{
                            duration: 0.8,
                            ease: [0.04, 0.62, 0.23, 0.98],
                        }}
                    >
                        <p className="font-extralight text-sm leading-loose">
                            {content}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </>
    );
}

Accordion.DefaultProps = {
    expand: false,
};
export default Accordion;
