import { Outlet } from "react-router-dom";

export function DefaultLayout(){
  return(
    <div className="bg-[#f6f6f6] w-full h-screen my-0 mx-auto">
      <Outlet />
    </div>
  )
}