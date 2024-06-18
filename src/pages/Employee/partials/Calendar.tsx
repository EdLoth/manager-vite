import { useState } from 'react';
import { Calendar, SlotInfo, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useParams } from 'react-router-dom';
import * as Dialog from '@radix-ui/react-dialog'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './custom.css';
import { useContextEmployees } from '../../../context/EmployeeContext';
import { NewWorkDayModal } from './NewWorkDayModal';

const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface Params {
  id: string;
  [key: string]: string | undefined;
}
export function CalendarEmployee() {
  
  const { id } = useParams<Params>();
  const { getWorksByEmployeeID } = useContextEmployees();

  const today = new Date();
  const startDate = format(startOfMonth(today), 'yyyy-MM-dd');
  const endDate = format(endOfMonth(today), 'yyyy-MM-dd');

  const works = getWorksByEmployeeID(Number(id), startDate, endDate);

  const events = works.map(work => ({
    title: `Pedidos: ${work.pedidos}, Realizados: ${work.realizados}`,
    start: new Date(work.date),
    end: new Date(work.date),
    allDay: true,
  }));

  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleOpenDialog = (slotInfo: SlotInfo) => {
    setIsOpen(true);
    setSelectedDate(slotInfo.start as Date);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Calendário</h1>
      <Calendar
        localizer={localizer}
        events={events}
        culture='pt-BR'
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        selectable
        onSelectSlot={handleOpenDialog}
      />
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger />
        <NewWorkDayModal id={id} date={selectedDate} />
      </Dialog.Root>
    </div>
  );
}
