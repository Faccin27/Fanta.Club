import { User } from "@/utils/auth";
import { X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";


interface ModalDescProps{
    user:User | undefined;
    onClose:()=>void;
    ident:number | undefined;
};

export default function ModalDesc({user,onClose,ident}:ModalDescProps){
        const [newDescription, setNew] = useState<string | TrustedHTML | undefined>(user?.description);
    
    const {t} = useTranslation();

    const handleSubmit = async(evento:React.FormEvent)=>{
        evento.preventDefault();
        try{
          await fetch(`http://localhost:3535/users/${ident}/desc`,{
            method:"PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify({
              description:newDescription
            })
          });
          alert(t("translation.recharg"))
        } catch(err){
          throw new Error(`We can't update your description Error: ${err}`)
        };
      };


return(
    <div className="mt-10 mb-10 fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="container mx-auto px-4 -mt-16 md:w-[30%] sm:w-[30%]">
          <div className="text-center">
            <div className="z-50">
              <motion.form
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                onSubmit={handleSubmit}
              >
                <div className="mt-6 rounded-xl shadow-2xl p-6 outline-none border border-orange-500 min-w-full bg-zinc-950">
                  <div className="flex flex-col">
                <div className="self-end">
                <button 
                onClick={onClose}
                className="text-3xl text-orange-600 mb-5 hover:text-orange-400"><X size={40}/></button>
                </div>
                  </div>
                  <div>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.9,
                        ease: [0, 0.71, 0.2, 1.01], 
                        scale: {
                          type: "spring",
                          damping: 5,
                          stiffness: 100,
                          restDelta: 0.001,
                        },
                      }}
                      className="mb-32"
                    >
                      <input
                          value={String(newDescription)}
                          onChange={evento=>setNew(evento.target.value)}
                          maxLength={52}
                          type="text"
                          className="text-white outline-none border-2 border-orange-500 min-h-20 min-w-full bg-zinc-800 text-start pb-[7.5rem] px-4 sm:px-0 pt-[1rem] md:min-w-[30%] md:min-h-6 break-words sm:min-w-[90%]"
                        />

                    </motion.div>
                  </div>
                  <motion.button
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 3 }}
                    type="submit"
                    className="bg-orange-600 shadow-2xl rounded-lg hover:bg-orange-400 px-8 py-2"
                  >
                    {t("translation.userr")}
                  </motion.button>
                </div>
              </motion.form>
            </div>
          </div>
        </div>
                </div>
    );
};