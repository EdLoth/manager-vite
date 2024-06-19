import React, { useState } from 'react';
import {ReportContent} from './ReportContent'; 

export function Report() {
  const [activeTab, setActiveTab] = useState('diaria');

  return (
    <div className="bg-white px-4 py-2">



      <section></section>
      <div></div>

      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === 'diaria' ? 'bg-[#d40f7d] text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('diaria')}
        >
          Diária
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === 'semanal' ? 'bg-[#d40f7d] text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('semanal')}
        >
          Semanal
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            activeTab === 'mensal' ? 'bg-[#d40f7d] text-white' : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('mensal')}
        >
          Mensal
        </button>
      </div>
      {/* Renderiza o conteúdo da tab ativa */}
      <div className="mt-4">
        {activeTab === 'diaria' && <ReportContent title="Diária" pedidos="100" realizados="60" type="day" />}
        {activeTab === 'semanal' && <ReportContent title="Semanal" pedidos="500" realizados="230" type="week" />}
        {activeTab === 'mensal' && <ReportContent title="Mensal" pedidos="2000" realizados="1900" type="month" />}
      </div>
    </div>
  );
}
