import { useEffect, useState } from "react";

export function TableHome() {
  const [pedidos] = useState(450);
  const [realizados] = useState(375);
  const [taxaAproveitamento, setTaxaAproveitamento] = useState(0);
  const [corTexto, setCorTexto] = useState('');

  useEffect(() => {
    // Calcula a taxa de aproveitamento
    const taxa = (realizados / pedidos) * 100;
    setTaxaAproveitamento(taxa);

    // Define a cor do texto com base na taxa de aproveitamento
    if (taxa <= 25) {
      setCorTexto('text-red-500');
    } else if (taxa <= 50) {
      setCorTexto('text-orange-500');
    } else if (taxa <= 75) {
      setCorTexto('text-yellow-500');
    } else {
      setCorTexto('text-green-500');
    }
  }, [pedidos, realizados]);

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-900">
        <tr>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            Nome
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            Pedidos
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            Realizados
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            Taxa de aproveitamento
          </th>
          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-100 uppercase tracking-wider">
            Situação
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr className="border-b-2">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div>
                João
              </div>
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            450
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <p className={`text-lg font-bold ${corTexto}`}>10</p>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <p className={`text-lg font-bold ${corTexto}`}>{taxaAproveitamento.toFixed(2)}%</p>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            OK
          </td>
        </tr>
        <tr className="border-b-2">
          <td className="px-6 py-4 whitespace-nowrap">
            <div className="flex items-center">
              João
            </div>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            450
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <p className={`text-lg font-bold ${corTexto}`}>10</p>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            <p className={`text-lg font-bold ${corTexto}`}>{taxaAproveitamento.toFixed(2)}%</p>
          </td>
          <td className="px-6 py-4 whitespace-nowrap">
            OK
          </td>
        </tr>
        
      </tbody>
    </table>
  )
}