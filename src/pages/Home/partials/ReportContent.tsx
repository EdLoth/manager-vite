import { useState, useEffect } from 'react';

interface Props {
  title: string;
  pedidos: string;
  realizados: string;
  type: 'day' | 'week' | 'month';
}

export function ReportContent({ title, pedidos, realizados, type }: Props) {
  const [corBarraProgresso, setCorBarraProgresso] = useState<string>('bg-green-500');
  const [taxaAproveitamento, setTaxaAproveitamento] = useState<number>(0);

  useEffect(() => {
    const pedidosNumero = parseFloat(pedidos);
    const realizadosNumero = parseFloat(realizados);
    
    if (pedidosNumero > 0) {
      const taxa = (realizadosNumero / pedidosNumero) * 100;
      setTaxaAproveitamento(taxa);

      if (taxa <= 25) {
        setCorBarraProgresso('bg-red-500');
      } else if (taxa <= 50) {
        setCorBarraProgresso('bg-orange-500');
      } else if (taxa <= 75) {
        setCorBarraProgresso('bg-yellow-500');
      } else {
        setCorBarraProgresso('bg-green-500');
      }
    }
  }, [pedidos, realizados]);

  return (
    <div>
      <h1>{title}</h1>
      <span>Média baseada nos pedidos realizados</span>
      <div className="w-full bg-gray-200 rounded-full mt-2">
        <div
          className={`h-2 rounded-full ${corBarraProgresso}`}
          style={{ width: `${taxaAproveitamento}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2">
        <span>Realizados: {realizados}</span>
        <span>Pedidos: {pedidos}</span>
      </div>
    </div>
  );
}
