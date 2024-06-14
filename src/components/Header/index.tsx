import { FaPlay } from "react-icons/fa6";

export function Header(){
  return(
    <div className="w-full bg-gray-900 py-3 fixed">
      <div className="max-w-[1500px] px-8 py-2 mx-auto flex justify-between">
        <span className="text-2xl text-white">Manager</span>
        <div>
          <button className="bg-gray-100 rounded px-3 py-2 flex items-center gap-1.5">Vizualizar<FaPlay /></button>
        </div>
      </div>
    </div>
  )
}