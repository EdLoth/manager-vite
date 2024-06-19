import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import Swal from 'sweetalert2';
import { LuPackage, LuPackageCheck } from 'react-icons/lu';
import { useContextEmployees } from '../../../context/EmployeeContext';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  id: string | undefined;
  date: Date | undefined;
}

export function NewWorkDayModal({ id, date }: Props) {

  const { addWorkDay } = useContextEmployees();

  const addWorkDayFormSchema = z.object({
    date: z.string().min(1, { message: 'A data é obrigatória' }),
    initialHour: z.string().min(1, { message: 'A hora inicial é obrigatória' }),
    endHour: z.string().min(1, { message: 'A hora final é obrigatória' }),
    pedidos: z.string().min(1, { message: 'Pedidos deve ser um número não negativo' }),
    realizados: z.string().min(1, { message: 'Realizados deve ser um número não negativo' }),
    isPresente: z.enum(['0', '1', '2'], { required_error: 'Presença é obrigatória' }),
  });

  type AddWorkDayFormSchema = z.infer<typeof addWorkDayFormSchema>;

  const { handleSubmit, register, control, formState: { errors } } = useForm<AddWorkDayFormSchema>({
    resolver: zodResolver(addWorkDayFormSchema)
  });

  console.log(errors)

  const onSubmit = async (data: AddWorkDayFormSchema) => {
    if (!id) {
      throw new Error('ID não está definido');
    }

    try {
      await addWorkDay(id, { id: uuidv4(), ...data });
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Dia de trabalho adicionado com sucesso!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Ocorreu um erro ao adicionar o dia de trabalho. Por favor, tente novamente.',
      });
    }

  };

  return (
    <Dialog.Portal>
      <div className="fixed w-screen h-screen inset-0 bg-black bg-opacity-75" />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[32rem] rounded-lg px-10 py-3 bg-gray-800 z-50">
        <h1 className="font-semibold text-white py-4 border-b-2 mb-4">Novo dia de trabalho</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-white text-[1.2rem] font-light" htmlFor="date">Data</label>
            <input
              {...register('date')}
              type="text"
              
              className="rounded-lg w-full border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
              defaultValue={date ? new Date(date).toLocaleDateString('pt-BR') : ''}
              onChange={(e) => console.log(e.target.value)}
            />

            {errors.date && <span className="text-red-500">{errors.date.message}</span>}
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col flex-1 gap-2">
              <label className="text-white text-[1.2rem] font-semibold" htmlFor="initialHour">Hora Inicial</label>
              <input
                {...register('initialHour')}
                type="time"
                className="rounded-lg w-full border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
                placeholder="Hora Inicial"
              />
              {errors.initialHour && <span className="text-red-500">{errors.initialHour.message}</span>}
            </div>

            <div className="flex flex-col flex-1 gap-2">
              <label className="text-white text-[1.2rem] font-semibold" htmlFor="endHour">Hora Final</label>
              <input
                {...register('endHour')}
                type="time"
                className="rounded-lg w-full border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
                placeholder="Hora Final"
              />
              {errors.endHour && <span className="text-red-500">{errors.endHour.message}</span>}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex gap-4 items-center">
              <div className="flex flex-col flex-1 gap-2">
                <label className="text-white text-[1.2rem] font-semibold" htmlFor="pedidos">Pedidos</label>
                <div className="relative">
                  <input
                    {...register('pedidos')}
                    type="number"
                    min={0}
                    className="rounded-lg w-full border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
                    placeholder="Pedidos"
                  />
                  <LuPackage className="absolute right-4 top-4 text-amber-700 text-3xl" />
                </div>
                {errors.pedidos && <span className="text-red-500">{errors.pedidos.message}</span>}
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="flex flex-col flex-1 gap-2">
                <label className="text-white text-[1.2rem] font-semibold" htmlFor="realizados">Realizados</label>
                <div className="relative">
                  <input
                    {...register('realizados')}
                    type="number"
                    min={0}
                    className="rounded-lg w-full border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
                    placeholder="Realizados"
                  />
                  <LuPackageCheck className="absolute right-4 top-4 text-green-700 text-3xl" />
                </div>
                {errors.realizados && <span className="text-red-500">{errors.realizados.message}</span>}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-white text-[1.2rem] font-semibold" htmlFor="isPresente">Presença</label>
            <Controller
              control={control}
              name="isPresente"
              render={({ field }) => (
                <select
                  {...field}
                  className="rounded-lg border-0 bg-gray-900 text-gray-300 p-4"
                >
                  <option value="">Selecione</option>
                  <option value={0}>Faltou</option>
                  <option value={1}>Presente</option>
                  <option value={2}>Falta Justificada</option>
                </select>
              )}
            />
            {errors.isPresente && <span className="text-red-500">{errors.isPresente.message}</span>}
          </div>

          <button
            type="submit"
            className="mt-2 mb-4 rounded-lg bg-green-500 text-white p-3 hover:bg-green-700"
          >
            Adicionar
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
