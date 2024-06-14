interface Props {
  title: string;
  pedidos: string;
  realizados: string;
  type: 'day' | 'week' | 'month';
}

export function ReportContent({ title, pedidos, realizados, type }: Props) {
  // Convertendo pedidos e realizados para números antes de calcular a taxa de aproveitamento
  const pedidosNumero = parseFloat(pedidos);
  const realizadosNumero = parseFloat(realizados);

  const calcularTaxaAproveitamento = () => {
    return (realizadosNumero / pedidosNumero) * 100;
  };

  const taxaAproveitamento = calcularTaxaAproveitamento();

  return (
    <div>
      <h1>{title}</h1>
      <span>Média baseada nos pedidos realizados</span>
      <div className="w-full bg-gray-200 rounded-full mt-2">
        <div
          className={`h-2 rounded-full bg-green-500`}
          style={{ width: `${taxaAproveitamento}%` }}
        ></div>
      </div>
      <div className="flex justify-between mt-2">
        <span>Pedidos: {pedidos}</span>
        <span>Realizados: {realizados}</span>
      </div>
    </div>

  );
}
