import Image from "next/image";
import { Toaster } from "react-hot-toast";
import { SlashIcon } from "@radix-ui/react-icons"
export default function Home() {
  return (
   <>
     <div className="overflow-hidden bg-new-custom bg-cover bg-center h-screen flex flex-col items-center justify-center">
        <div>
         <h1 className="text-8xl text-white">TASK MANAGER</h1>
          <h2 className="text-center p-4 text-xl text-white">Master Your Day,One Task at a Time</h2>
         </div>
     </div>
     <Toaster/>
   </>
  );
}
