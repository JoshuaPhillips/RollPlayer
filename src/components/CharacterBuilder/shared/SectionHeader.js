import React, { useState } from "react";

const SectionHeader = props => {
  const { title, children } = props;

  const [showSectionHelp, toggleSectionHelp] = useState(false);

  return (
    <>
      <div className='flex flex-wrap justify-between py-6 px-4 font-semibold bg-gray-800 text-gray-400'>
        <h2 className='uppercase tracking-widest'>{title}</h2>
        <button className='tracking-wide outline-none' onClick={() => toggleSectionHelp(!showSectionHelp)}>
          More Info
        </button>
      </div>
      <div className={`${showSectionHelp ? "block" : "hidden"} py-4 leading-relaxed text-gray-700 bg-white`}>
        {children}
      </div>
    </>
  );
};

export default SectionHeader;
