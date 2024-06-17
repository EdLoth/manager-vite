import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getISOWeek, getMonth } from 'date-fns';
import axios from 'axios';

interface Employee {
  id: number;
  name: string;
  role: string; // Alterar para tipo number para referenciar ID da role
  birthday: string;
  work: {
    id: number;
    date: string;
    pedidos: number;
    realizados: number;
    isPresente: 0 | 1 | 2;
  }[];
}

interface Role {
  id: number;
  nome: string;
}

interface EmployeesContextType {
  // Métodos para funcionários
  getEmployees: () => Employee[];
  getEmployeeByID: (id: number) => Employee | undefined;
  getWorksByEmployeeID: (employeeId: number) => { id: number; date: string; pedidos: number; realizados: number; isPresente: 0 | 1 | 2 }[];
  getWorkByID: (employeeId: number, workId: number) => { id: number; date: string; pedidos: number; realizados: number; isPresente: 0 | 1 | 2 } | undefined;
  getSummary: (type: 'day' | 'week' | 'month', date?: string) => { pedidosTotal: number; realizadosTotal: number; taxaAproveitamento: number };
  getSummaryForEmployee: (type: 'day' | 'week' | 'month', employeeId: number) => { pedidosTotal: number; realizadosTotal: number; taxaAproveitamento: number };
  addEmployee: (employee: Employee) => void;
  addWorkDay: (employeeId: number, workDay: { id: number; date: string; pedidos: number; realizados: number; isPresente: 0 | 1 | 2 }) => void;

  // Métodos para roles
  getRoles: () => Role[];
  addRole: (role: Role) => void;
  deleteRole: (roleId: number) => void;

  // Novo método para obter todos os funcionários com resumo
  getEmployeesWithSummary: (type?: 'day' | 'week' | 'month') => Employee[];
}

export const EmployeesContext = createContext({} as EmployeesContextType);

export const EmployeesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [nextEmployeeId, setNextEmployeeId] = useState<number>(1);
  const [roles, setRoles] = useState<Role[]>([]);
  const [nextRoleId, setNextRoleId] = useState<number>(1);
  const [nextWorkId, setNextWorkId] = useState<number>(1); // Estado para controlar o próximo ID de trabalho

  // Carregar dados iniciais dos funcionários do JSON Server
  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(response => {
        const employeesData = response.data as Employee[]; // Cast para Employee[]
        setEmployees(employeesData);
        const maxId = employeesData.reduce((max: number, employee: Employee) => (employee.id > max ? employee.id : max), 0);
        setNextEmployeeId(maxId + 1);
      })
      .catch(error => {
        console.error('Erro ao carregar funcionários do JSON Server:', error);
      });
  }, []); // Array vazio significa que useEffect será executado apenas uma vez, após a montagem inicial

  // Função para calcular a semana ISO de uma data
  function getISOWeekNumber(date: Date): number {
    return getISOWeek(date);
  }

  // Função para calcular o resumo baseado no tipo (day, week, month)
  const getSummary = (type: 'day' | 'week' | 'month', date?: string) => {
    let filteredWorks: { pedidos: number; realizados: number }[] = [];

    switch (type) {
      case 'day':
        filteredWorks = employees.flatMap(employee =>
          employee.work.filter(work => work.date === date)
        );
        break;
      case 'week':
        filteredWorks = employees.flatMap(employee =>
          employee.work.filter(work => {
            const workDate = new Date(work.date);
            const workWeek = getISOWeek(workDate);
            const targetDate = new Date(date || '');
            const targetWeek = getISOWeek(targetDate);
            return workWeek === targetWeek;
          })
        );
        break;
      case 'month':
        filteredWorks = employees.flatMap(employee =>
          employee.work.filter(work => {
            const workDate = new Date(work.date);
            const workMonth = getMonth(workDate);
            const targetDate = new Date(date || '');
            const targetMonth = getMonth(targetDate);
            return workMonth === targetMonth;
          })
        );
        break;
      default:
        break;
    }

    const pedidosTotal = filteredWorks.reduce((total, work) => total + work.pedidos, 0);
    const realizadosTotal = filteredWorks.reduce((total, work) => total + work.realizados, 0);
    const taxaAproveitamento = pedidosTotal === 0 ? 0 : (realizadosTotal / pedidosTotal) * 100;

    return { pedidosTotal, realizadosTotal, taxaAproveitamento };
  };

  const getSummaryForEmployee = (type: 'day' | 'week' | 'month', employeeId: number): { pedidosTotal: number; realizadosTotal: number; taxaAproveitamento: number } => {
    const employee = employees.find(emp => emp.id === employeeId);
  
    if (!employee) {
      return { pedidosTotal: 0, realizadosTotal: 0, taxaAproveitamento: 0 };
    }
  
    let filteredWorks: { pedidos: number; realizados: number }[] = [];
    const today = new Date();
    let targetDate: Date;
  
    switch (type) {
      case 'day':
        // Filtrar trabalhos do dia anterior
        targetDate = new Date(today);
        targetDate.setDate(today.getDate() - 1);
        const targetDateString = targetDate.toISOString().split('T')[0]; // Formato yyyy-mm-dd
  
        filteredWorks = employee.work.filter(work => work.date === targetDateString);
        break;
      case 'week':
        // Filtrar trabalhos da última semana
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - 7);
        const lastWeekStartDateString = lastWeekStart.toISOString().split('T')[0]; // Início da última semana
  
        filteredWorks = employee.work.filter(work => {
          const workDate = new Date(work.date);
          return workDate >= lastWeekStart && workDate <= today;
        });
        break;
      case 'month':
        // Filtrar trabalhos do mês atual
        const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const thisMonthStartDateString = thisMonthStart.toISOString().split('T')[0]; // Início do mês atual
  
        filteredWorks = employee.work.filter(work => {
          const workDate = new Date(work.date);
          return workDate >= thisMonthStart && workDate <= today;
        });
        break;
      default:
        break;
    }
  
    const pedidosTotal = filteredWorks.reduce((total, work) => total + work.pedidos, 0);
    const realizadosTotal = filteredWorks.reduce((total, work) => total + work.realizados, 0);
    const taxaAproveitamento = pedidosTotal === 0 ? 0 : (realizadosTotal / pedidosTotal) * 100;
  
    return { pedidosTotal, realizadosTotal, taxaAproveitamento };
  };

  const addEmployee = (employee: Employee) => {
    const newEmployee = { ...employee, id: nextEmployeeId };
    setEmployees([...employees, newEmployee]);
    setNextEmployeeId(nextEmployeeId + 1);
  };

  const addWorkDay = (employeeId: number, workDay: { id: number; date: string; pedidos: number; realizados: number; isPresente: 0 | 1 | 2 }) => {
    const updatedEmployees = employees.map(employee => {
      if (employee.id === employeeId) {
        const updatedWork = [...employee.work, { ...workDay, id: nextWorkId }];
        return { ...employee, work: updatedWork };
      }
      return employee;
    });

    setEmployees(updatedEmployees);
    setNextWorkId(prevNextWorkId => prevNextWorkId + 1); // Incrementa o próximo ID de trabalho
  };

  const getEmployees = () => employees;

  const getEmployeeByID = (id: number) => employees.find(employee => employee.id === id);

  const getWorksByEmployeeID = (employeeId: number) => {
    const employee = employees.find(employee => employee.id === employeeId);
    return employee ? employee.work : [];
  };

  const getWorkByID = (employeeId: number, workId: number) => {
    const employee = employees.find(employee => employee.id === employeeId);
    if (employee) {
      return employee.work.find(work => work.id === workId);
    }
    return undefined;
  };

  const getRoles = () => roles;

  const addRole = (role: Role) => {
    const newRole = { ...role, id: nextRoleId };
    setRoles([...roles, newRole]);
    setNextRoleId(nextRoleId + 1);
  };

  const deleteRole = (roleId: number) => {
    const updatedRoles = roles.filter(role => role.id !== roleId);
    setRoles(updatedRoles);

    // Atualizar os funcionários para remover a role deletada
    const updatedEmployees = employees.map(employee => {
      if (employee.role === roleId.toString()) {
        return { ...employee, role: '' }; // Limpar a role do funcionário
      }
      return employee;
    });
    setEmployees(updatedEmployees);
  };

  // Nova função para obter todos os funcionários com resumo
  const getEmployeesWithSummary = (type: 'day' | 'week' | 'month' = 'month') => {
    return employees.map(employee => {
      const summary = getSummaryForEmployee(type, employee.id );
      return {
        ...employee,
        pedidosTotal: summary.pedidosTotal,
        realizadosTotal: summary.realizadosTotal,
        taxaAproveitamento: summary.taxaAproveitamento
      };
    });
  };

  return (
    <EmployeesContext.Provider value={{
      getEmployees,
      getEmployeeByID,
      getWorksByEmployeeID,
      getWorkByID,
      getSummary,
      getSummaryForEmployee,
      addEmployee,
      addWorkDay,
      getEmployeesWithSummary,
      getRoles,
      addRole,
      deleteRole
    }}>
      {children}
    </EmployeesContext.Provider>
  );
};
