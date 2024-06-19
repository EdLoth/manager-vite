import { Header } from "../../components/Header";
import { CalendarEmployee } from "./partials/Calendar";

export function Employee() {

  return (
    <>
      <Header />
      <div className="max-w-[1500px] font-body h-full px-8 pt-24 bg-[#f6f6f6] mx-auto">
        <CalendarEmployee />
      </div>
    </>
  )
}