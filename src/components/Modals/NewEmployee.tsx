import * as Dialog from '@radix-ui/react-dialog'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useContext } from 'react'
import { EmployeesContext } from '../../context/EmployeeContext'

export function NewEmployeeModal() {

  const { addEmployee, roles } = useContext(EmployeesContext)

  console.log(roles)

  const addEmployeeFormSchema = z.object({
    name: z.string(),
    role: z.string(),
    birthday: z.string(),
  })

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(addEmployeeFormSchema),
  });
  console.log(errors)

  const onSubmit = (data: any) => {
    addEmployee(data)
  }

  return (
    <Dialog.Portal>
      <div className='fixed w-screen h-screen inset-0 bg-black bg-opacity-75' />
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[32rem] rounded-lg px-10 py-3 bg-gray-800">
        <h1 className='text-2xl text-white py-4 border-b-2'>Novo funcionario</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">

          <div className='flex flex-col gap-3'>
            <label className='text-white text-[1.2rem] font-semibold' htmlFor="name">Nome Completo</label>
            <input
              {...register('name')}
              className="rounded-lg border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
              placeholder="Ex: João Santos"
            />
          </div>


          <div className='flex flex-col gap-3'>
            <label className='text-white text-[1.2rem] font-semibold' htmlFor="role">Area de atuação</label>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  className='rounded-lg border-0 bg-gray-900 text-gray-300 p-4'
                >
                  <option value="0">Selecione</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.name} className='bg-gray-800 text-white uppercase font-semibold'>
                      {role.name}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div className='flex flex-col gap-3'>
            <label className='text-white text-[1.2rem] font-semibold' htmlFor="birthday">Data de Nascimento</label>
            <input
              {...register('birthday')}
              type="date"
              className="rounded-lg border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
              placeholder="Birthday"
            />
          </div>

          <div className='flex justify-between items-center gap-5'>
            <Dialog.Close className='w-full h-12 border-0 bg-gray-500 text-gray-200 font-bold px-5 rounded-lg mt-6  mb-6 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:bg-gray-600 transition ease-in duration-200'>
              Fechar
            </Dialog.Close>
            <button
              type="submit"
              className="h-12 border-0 bg-[#d40f7d] text-white font-bold px-5 rounded-lg mt-6 w-full mb-6 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:bg-[#d40f7fc0] transition ease-in duration-200"
            >
              Salvar
            </button>
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}
