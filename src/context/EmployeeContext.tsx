import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { api } from '../lib/axios';
import { startOfMonth, endOfMonth, format } from 'date-fns';

interface Employee {
  id: number;
  name: string;
  role: string; 
  birthday: string;
  work: {
    id: number;
    date: string;
    pedidos: number;
    realizados: number;
    isPresente: 0 | 1 | 2;
  }[];
}

interface EmployeeInput {
  id: number;
  name: string;
  role: string;
  birthday: string;
  work: [];
}

interface Role {
  id: number;
  name: string;
}

interface Work {
  id: number;
  date: string;
  pedidos: number;
  realizados: number;
  isPresente: 0 | 1 | 2;
}

interface EmployeesContextType {
  employees: Employee[];
  roles: Role[];
  getEmployees: () => Promise<void>;
  addEmployee: (employee: EmployeeInput) => Promise<void>;
  updateEmployee: (id: number, employee: EmployeeInput) => Promise<void>;
  deleteEmployee: (id: number) => Promise<void>;
  getRoles: () => Promise<void>;
  addRole: (role: Role) => Promise<void>;
  deleteRole: (roleId: number) => Promise<void>;
  getSummaryForEmployee: (type: 'day' | 'week' | 'month', employeeId: number) => { pedidosTotal: number; realizadosTotal: number; taxaAproveitamento: number };
  addWorkDay: (employeeId: string, workDay: Work) => Promise<void>;
  updateWorkDay: (employeeId: number, workDay: Work) => Promise<void>;
  getWorksByEmployeeID: (employeeId: number, startDate?: string, endDate?: string) => Work[];
  deleteWork: (employeeId: number, workId: number) => Promise<void>;
}

export const EmployeesContext = createContext({} as EmployeesContextType);

export const EmployeesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);

  async function getEmployees() {
    const response = await api.get<Employee[]>('employees');
    setEmployees(response.data);
  }

  async function addEmployee(employee: EmployeeInput) {
    const newEmployee = { ...employee, work: [] }; 
    await api.post('employees', newEmployee);
    await getEmployees();
  }

  async function updateEmployee(id: number, employee: EmployeeInput) {
    await api.put(`employees/${id}`, employee);
    await getEmployees();
  }

  async function deleteEmployee(id: number) {
    await api.delete(`employees/${id}`);
    await getEmployees();
  }

  async function getRoles() {
    const response = await api.get<Role[]>('roles');
    setRoles(response.data);
  }

  async function addRole(role: Role) {
    await api.post('roles', role);
    await getRoles();
  }

  async function deleteRole(roleId: number) {
    await api.delete(`roles/${roleId}`);
    await getRoles();
  }

  const getSummaryForEmployee = (type: 'day' | 'week' | 'month', employeeId: number) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee || !employee.work) {
      return { pedidosTotal: 0, realizadosTotal: 0, taxaAproveitamento: 0 };
    }

    let filteredWorks: { pedidos: number; realizados: number }[] = [];
    const today = new Date();
    let targetDate: Date;
    switch (type) {
      case 'day':
        targetDate = new Date(today);
        targetDate.setDate(today.getDate() - 1);
        const targetDateString = targetDate.toISOString().split('T')[0];
        filteredWorks = employee.work.filter(work => work.date === targetDateString);
        break;
      case 'week':
        const lastWeekStart = new Date(today);
        lastWeekStart.setDate(today.getDate() - 7);
        filteredWorks = employee.work.filter(work => {
          const workDate = new Date(work.date);
          return workDate >= lastWeekStart && workDate <= today;
        });
        break;
      case 'month':
        const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
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

  const addWorkDay = async (employeeId: string, workDay: Work) => {
    const employee = employees.find(emp => emp.id === parseInt(employeeId));
    if (!employee) return;
    employee.work.push(workDay);
    await api.put(`employees/${employeeId}`, employee);
    await getEmployees();
  };

  const updateWorkDay = async (employeeId: number, workDay: Work) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;
    const workIndex = employee.work.findIndex(work => work.id === workDay.id);
    if (workIndex === -1) return;
    employee.work[workIndex] = workDay;
    await api.put(`employees/${employeeId}`, employee);
    await getEmployees();
  };

  const getWorksByEmployeeID = (employeeId: number, startDate?: string, endDate?: string) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee || !employee.work) {
      return [];
    }

    if (!startDate || !endDate) {
      const today = new Date();
      startDate = format(startOfMonth(today), 'yyyy-MM-dd');
      endDate = format(endOfMonth(today), 'yyyy-MM-dd');
    }

    return employee.work.filter(work => work.date >= startDate && work.date <= endDate);
  };

  const deleteWork = async (employeeId: number, workId: number) => {
    const employee = employees.find(emp => emp.id === employeeId);
    if (!employee) return;
    employee.work = employee.work.filter(work => work.id !== workId);
    await api.put(`employees/${employeeId}`, employee);
    await getEmployees();
  };

  useEffect(() => {
    getEmployees();
    getRoles();
  }, []);

  return (
    <EmployeesContext.Provider
      value={{
        employees,
        roles,
        getEmployees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        getRoles,
        addRole,
        deleteRole,
        getSummaryForEmployee,
        addWorkDay,
        updateWorkDay,
        getWorksByEmployeeID,
        deleteWork,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};

export const useContextEmployees = () => useContext(EmployeesContext);
