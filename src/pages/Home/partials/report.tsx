import React, { useState } from 'react';
import {ReportContent} from './ReportContent'; 

export function Report() {
  const [activeTab, setActiveTab] = useState('diaria');

  return (
    <div className="bg-white px-4 py-2">
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === 'diaria' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('diaria')}
        >
          Diária
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === 'semanal' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('semanal')}
        >
          Semanal
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === 'mensal' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('mensal')}
        >
          Mensal
        </button>
      </div>
      {/* Renderiza o conteúdo da tab ativa */}
      <div className="mt-4">
        {activeTab === 'diaria' && <ReportContent title="Diária" pedidos="100" realizados="80" type="day" />}
        {activeTab === 'semanal' && <ReportContent title="Semanal" pedidos="500" realizados="400" type="week" />}
        {activeTab === 'mensal' && <ReportContent title="Mensal" pedidos="2000" realizados="1800" type="month" />}
      </div>
    </div>
  );
}
