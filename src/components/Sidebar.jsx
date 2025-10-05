import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'

const Sidebar = () => {
  return (
    <div className="w-1/15 h-full bg-[rgb(31,33,33)] text-white border-r-1 border-gray-700 flex flex-col items-center justify-between py-5 ">
      <img className="w-10" src="./images/ai.png" alt="ai logo" />
      <button className="mb-2 text-sm rounded-2xl bg-red-600 hover:bg-red-700 active:bg-red-800 px-4 py-4 transition-colors duration-200 flex items-center gap-2 shadow-md hover:shadow-lg">
        <FontAwesomeIcon icon={faArrowRightFromBracket} className="text-sm" /> 
        {/* <span className="font-medium">Logout</span> */}
      </button>
    </div>
  )
}

export default Sidebar