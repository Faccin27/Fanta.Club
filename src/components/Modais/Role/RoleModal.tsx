import { useState, useEffect, FormEvent } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { User } from "@/utils/auth";
import { api } from "@/utils/api";

interface ChnageRoleProps{
    Close: ()=> void;
    userId: number;
}


export default function ModalChangeRole({Close, userId}: ChnageRoleProps){
    const [isModalRoleOpen, setIsModalRoleOpen] = useState<boolean>(false);
    const [users, setUsersData] = useState<User[] | null>(null);
    const [newRole, setNewRole] = useState();
    const [error, setError] = useState<string | null>(null);
    

    useEffect(()=>{
       async function takeUser(){
        try{
            const [usersResponse] = await Promise.all([
                fetch(`http://localhost:3535/users/${userId}`),
            ])      
            if (!usersResponse.ok) {
                alert("Errot to Fetch Data")
            }
            const userData = await usersResponse.json();
            setUsersData(userData);
        }
        catch(err){
            setError(error);
        }
       }
       takeUser()
    },[])

    const handleSubmit = async (evento: React.FormEvent) => {
        evento.preventDefault();
        try{
            await api.put(`/users/${userId}/role`, {
                newRole
            });
        }
        catch(err) {
            alert(err)
        }
    }


    return(
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 120 }}
          className=" text-white max-w-md w-full rounded-2xl overflow-hidden border border-orange-400"
        >
          <div className="bg-[#0D0D0E] p-8 relative">
            <button
              onClick={Close}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>
            
          
          <h3 className="text-2xl font-bold mb-6">Alterar o cargo do usuário</h3>
          
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <select 
              name="role" 
              id="role"
              className="w-full px-4 py-3 bg-[#1A1A1C] border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              required
              >
                <option 
                value={newRole}
                className="text-zinc-400 font-bold"
                >
                    User
                    </option>
                <option 
                value={newRole}
                className="ttext-orange-400 font-bold"
                >
                    Premium
                    </option>
                <option 
                value={newRole}
                className="text-purple-400 font-bold"
                >Moderator
                </option>
                <option value={newRole} 
                className="font-bold text-orange-400 animate-pulse">
                    FANTA
                    </option>
              </select>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-orange-400 hover:bg-orange-500 text-white rounded-lg transition-colors text-lg font-semibold"
            >
              Alterar Cargo
            </motion.button>
          </form>
        </div>
      </motion.div>
    </motion.div>
    )
}
