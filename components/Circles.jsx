import React from 'react'

const Circles = ({ type }) => {
        return (
                <div className="flex-none w-[2.083vw] h-[3.704vh] flex items-center justify-center mr-[1.524vw] ">
                        <span
                                className={`${
                                        type.toLowerCase().trim() == 'malware'
                                                ? 'bg-[#e47eb3]/10'
                                                : ''
                                }  ${
                                        type.toLowerCase().trim() == 'phishing'
                                                ? 'bg-[#f4d390]/10'
                                                : ''
                                } ${
                                        type.toLowerCase().trim() == 'intrusion'
                                                ? 'bg-[#a4e9d4]/10'
                                                : ''
                                } absolute rounded-full flex-none w-[2.083vw] h-[3.704vh] z-1 `}></span>
                        <span
                                className={`${
                                        type.toLowerCase().trim() == 'malware'
                                                ? 'bg-[#e47eb3]/10'
                                                : ''
                                }  ${
                                        type.toLowerCase().trim() == 'phishing'
                                                ? 'bg-[#f4d390]/10'
                                                : ''
                                } ${
                                        type.toLowerCase().trim() == 'intrusion'
                                                ? 'bg-[#a4e9d4]/10'
                                                : ''
                                } absolute rounded-full flex-none w-[1.693vw] h-[2.963vh] z-2 `}></span>
                        <span
                                className={`${
                                        type.toLowerCase().trim() == 'malware'
                                                ? 'bg-[#e47eb3]/10'
                                                : ''
                                }  ${
                                        type.toLowerCase().trim() == 'phishing'
                                                ? 'bg-[#f4d390]/10'
                                                : ''
                                } ${
                                        type.toLowerCase().trim() == 'intrusion'
                                                ? 'bg-[#a4e9d4]/10'
                                                : ''
                                } absolute rounded-full flex-none w-[0.677vw] h-[1.204vh] z-3 `}></span>
                </div>
        )
}

export default Circles
