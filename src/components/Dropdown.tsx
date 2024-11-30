import {Ellipsis as Options, Trash2,  RefreshCw as UpdatesIcon  } from "lucide-react";
import React, { useState } from "react";

export default function DropdownComponent({anunId}:{anunId:number}) {

    const [open, setIsOpen] = useState<boolean>(false);


    const handleDelete = async () => {
        window.location.href = "/forum";
        try{
            await fetch(`http://localhost:3535/anun/${anunId}`,{
                method:"DELETE"
            });
        } catch(err){
          throw new Error("We can't end the request to delete the Announcement");  
        };
    };


  return (
        <div className="relative inline-block">
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      className="p-2 rounded-full  hover:bg-zinc-700 ml-[1010px]"
    >
      <Options />
    </button>

    {open && (
      <div className="absolute right-0 mt-2 w-40 bg-zinc-800 rounded-lg shadow-lg z-20 ml-[900px]">
        <button
          onClick={handleDelete}
          className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-zinc-500 rounded-t-lg active:text-red-800"
        >
          <Trash2 className="mr-2" />
          Delete
        </button>

        <button
          className="flex items-center w-full px-4 py-2 text-sky-600 hover:bg-zinc-500 rounded-b-lg active:text-sky-800"
        >
          <UpdatesIcon className="mr-2" />
          Update
        </button>
      </div>
    )}
  </div>
    
  )
}