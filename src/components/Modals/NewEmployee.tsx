import * as Dialog from '@radix-ui/react-dialog'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
export function NewEmployeeModal() {
  const employeeWorkSchema = z.object({
    id: z.number().optional(), // opcional já que é autoincrementado
    date: z.string(),
    pedidos: z.number(),
    realizados: z.number(),
    isPresente: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  });
  
  const addEmployeeFormSchema = z.object({
    name: z.string(),
    role: z.number(), // ID da role
    birthday: z.string(),
    work: z.array(employeeWorkSchema),
  });


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(addEmployeeFormSchema),
  });

  const onSubmit = (data) => {
    // Remover o campo id dos dados enviados
    const cleanData = {
      ...data,
      work: data.work.map(({ id, ...rest }) => rest),
    };
    // Função para adicionar funcionário
    addEmployee(cleanData);
  };


  return (
    <Dialog.Portal>
      <div className='fixed w-screen h-screen inset-0 bg-black bg-opacity-75' />
      <h1>asdasd</h1>
      <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-[32rem] rounded-lg p-10 bg-gray-800">
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-4">
          <input
            {...register('name')}
            className="rounded-lg border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
            placeholder="Name"
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}

          <input
            {...register('role')}
            type="number"
            className="rounded-lg border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
            placeholder="Role ID"
          />
          {errors.role && <span className="text-red-500">{errors.role.message}</span>}

          <input
            {...register('birthday')}
            type="date"
            className="rounded-lg border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
            placeholder="Birthday"
          />
          {errors.birthday && <span className="text-red-500">{errors.birthday.message}</span>}

          <div className="flex flex-col gap-4">
            {/* Repetir para cada trabalho */}
            <input
              {...register('work.0.date')}
              type="date"
              className="rounded-lg border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
              placeholder="Work Date"
            />
            {errors.work?.[0]?.date && <span className="text-red-500">{errors.work[0].date.message}</span>}

            <input
              {...register('work.0.pedidos')}
              type="number"
              className="rounded-lg border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
              placeholder="Pedidos"
            />
            {errors.work?.[0]?.pedidos && <span className="text-red-500">{errors.work[0].pedidos.message}</span>}

            <input
              {...register('work.0.realizados')}
              type="number"
              className="rounded-lg border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
              placeholder="Realizados"
            />
            {errors.work?.[0]?.realizados && <span className="text-red-500">{errors.work[0].realizados.message}</span>}

            <select
              {...register('work.0.isPresente')}
              className="rounded-lg border-0 bg-gray-900 text-gray-300 p-4 placeholder-gray-500"
            >
              <option value={0}>Absent</option>
              <option value={1}>Present</option>
              <option value={2}>Half-day</option>
            </select>
            {errors.work?.[0]?.isPresente && <span className="text-red-500">{errors.work[0].isPresente.message}</span>}
          </div>

          <button
            type="submit"
            className="h-14 border-0 bg-green-500 text-white font-bold px-5 rounded-lg mt-6 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:bg-green-700 transition ease-in duration-200"
          >
            Add Employee
          </button>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}