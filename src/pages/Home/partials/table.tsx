import { useContextEmployees } from '../../../context/EmployeeContext'
export function TableHome() {
  const {
    employees,
    getSummaryForEmployee
  } = useContextEmployees()


  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-200">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Nome
          </th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Pedidos
          </th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Realizados
          </th>
          <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Taxa de aproveitamento
          </th>
          <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
            Situação
          </th>
        </tr>
      </thead>

      <tbody className="bg-white divide-y divide-gray-200">
        {employees.map((employee) => {
          const summary = getSummaryForEmployee('month', employee.id);

          let corTexto = 'green-500'; // Cor padrão para 'Excelente'
          let feedbackMessage = 'Excelente 🤩'; // Mensagem padrão para 'Excelente'

          if (summary.taxaAproveitamento <= 25) {
            corTexto = 'red-500';
            feedbackMessage = 'Ruim 😖';
          } else if (summary.taxaAproveitamento <= 50) {
            corTexto = 'orange-500';
            feedbackMessage = 'Mediano 🙁';
          } else if (summary.taxaAproveitamento <= 75) {
            corTexto = 'yellow-500';
            feedbackMessage = 'Bom 🙂';
          }

          console.log(summary);

          return (
            <tr key={employee.id} className="border-b-2">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <span className="text-gray-900 font-bold">{employee.name}</span>
                    <span className="text-xs font-light text-[#d40f7d]">{employee.role}</span>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                {summary.pedidosTotal}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <p className={`text-lg font-bold text-${corTexto}`}>{summary.realizadosTotal}</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <p className={`text-lg font-bold text-${corTexto}`}>{summary.taxaAproveitamento.toFixed(2)}%</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex justify-end">
                <span className={`rounded-lg px-4 py-2 bg-${corTexto}`}>
                  {feedbackMessage}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>

    </table>
  )
}