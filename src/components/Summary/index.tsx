import { FaRegClock } from 'react-icons/fa6'
import { LuPackageCheck, LuPackage } from 'react-icons/lu'

interface Props {
  valuePedidos: string
}
export function SummaryHome({valuePedidos}: Props) {
  return (
    <div className="max-w-[1500px] my-4 grid grid-cols-1 md:grid-cols-3 gap-8">

      <div className=" bg-white px-4 py-4 flex flex-col shadow-md rounded-2xl">
        <div className='flex items-center justify-between'>
          <span className='text-4xl'>Pedidos</span>
          <LuPackage className='text-amber-700 text-5xl' />
        </div>
        <span className='text-4xl'>{valuePedidos}k</span>
      </div>

      <div className="bg-white px-4 py-4 flex flex-col shadow-md rounded-2xl">
        <div className='flex items-center justify-between'>
          <span className='text-4xl'>Realizados</span>
          <LuPackageCheck className='text-green-700 text-5xl' />
        </div>
        <span className='text-4xl'>9k</span>
      </div>

      <div className="bg-white px-4 py-4 flex flex-col shadow-md rounded-2xl">
        <div className='flex items-center justify-between'>
          <span className='text-4xl'>Média</span>
          <FaRegClock className='text-lime-500 text-5xl' />
        </div>
        <span className='text-4xl'>1m03s</span>
      </div>

    </div>
  )
}