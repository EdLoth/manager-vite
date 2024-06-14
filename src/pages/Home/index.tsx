import { FaPlus } from "react-icons/fa6";
import { Header } from "../../components/Header";
import { TableHome } from "./partials/table";
import { Report } from "./partials/report";

export function Home() {
  return (
    <>
      <Header />
      <div className="max-w-[1500px] font-body h-full px-8 pt-24 bg-[#f6f6f6] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Primeiro card com largura de 70% em telas médias e maiores */}
          <div className="col-span-2 md:col-span-2 bg-white px-8 py-6 rounded-2xl">
            <div className="w-full flex justify-between items-center mb-4">
              <h2 className="mb-3 text-2xl">Funcionários</h2>
              <button className="bg-gray-900 flex items-center gap-2 text-white px-3 py-2 rounded-lg">
                <FaPlus /> Novo Funcionário
              </button>
            </div>
            <TableHome />
          </div>
          {/* Segundo card com largura de 30% em telas médias e maiores */}
          <div className="col-span-1 md:col-span-1 bg-white px-8 py-6 rounded-2xl">
            <Report />
          </div>
        </div>
      </div>

    </>
  )
}