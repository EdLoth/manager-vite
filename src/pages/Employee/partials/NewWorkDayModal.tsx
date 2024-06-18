import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog'
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useContextEmployees } from '../../../context/EmployeeContext';

interface Props {
  id: string | undefined;
  date: Date | null;
}

export function NewWorkDayModal({ id, date }: Props) {

  const { addWorkDay } = useContextEmployees();

  const addWorkDayFormSchema = z.object({
    id: z.number(),
    date: z.string(),
    initialHour: z.string(),
    endHour: z.string(),
    pedidos: z.number(),
    realizados: z.number(),
    isPresente: z.number(),
  });

  const { handleSubmit, register, control } = useForm({
    resolver: zodResolver(addWorkDayFormSchema),
  });

  const onSubmit = (data: any) => {
    if (!id) {
      throw new Error('ID não está definido');
    }

    addWorkDay(id, data)
  }


  return (
    <Dialog.Portal >
      <div className='fixed w-screen h-screen inset-0 bg-black bg-opacity-75' />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[32rem] rounded-lg px-10 py-3 bg-gray-800 z-50">
        <h1 className='text-2xl text-white py-4 border-b-2 mb-4'>Novo dia de trabalho</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-3'>
            <label className='text-white text-[1.2rem] font-semibold' htmlFor="role">Area de atuação</label>
            <input
              className="rounded-lg w-full border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
              type="text" defaultValue={id} />
          </div>


          <div className='flex flex-col gap-3'>
            <label className='text-white text-[1.2rem] font-semibold' htmlFor="role">Area de atuação</label>
            <Controller
              control={control}
              name="role"
              render={({ field }) => (
                <select
                  {...field}
                  className='rounded-lg border-0 bg-gray-900 text-gray-300 p-4'
                >
                  <option value="">Selecione</option>
                  <option value="0">Faltou</option>
                  <option value="1">Presente</option>
                  <option value="2">Falta Justificada</option>
                </select>
              )}
            />
          </div>

          <div className='flex flex-col gap-3'>
            <label className='text-white text-[1.2rem] font-semibold' htmlFor="birthday">Data de Nascimento</label>
            <input
              type="date"
              className="rounded-lg border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
              placeholder="Birthday"
            />
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
