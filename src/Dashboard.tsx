import React, { useState } from 'react';
import { coursesData } from './data';
import { CourseLevel } from './types';
import { CourseDetail } from './components/CourseDetail';
import { PrintableReport } from './components/PrintableReport';
import { Printer, ArrowLeft } from 'lucide-react';

export default function Dashboard() {
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel>('licenciatura');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  if (isPreviewMode) {
    return (
      <div className="min-h-screen bg-gray-200 py-8 font-sans selection:bg-blue-100 selection:text-blue-900">
        <div className="max-w-[21cm] mx-auto mb-4 flex justify-between items-center print:hidden px-4 sm:px-0">
          <button 
            onClick={() => setIsPreviewMode(false)}
            className="bg-white hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 transition-colors border border-gray-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Painel
          </button>
          <button 
            onClick={() => window.print()}
            className="bg-[#003366] hover:bg-[#002244] text-white font-medium px-4 py-2 rounded-lg shadow-sm flex items-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Imprimir / Salvar PDF
          </button>
        </div>
        <div className="print:break-after-page mb-8 print:mb-0">
          <PrintableReport course={coursesData.bacharelado} />
        </div>
        <div>
          <PrintableReport course={coursesData.licenciatura} />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="print:hidden min-h-screen bg-[#F8FAFC] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                  {coursesData[selectedLevel].name} <span className="text-gray-400 font-medium">| UEMS Paranaíba</span>
                </h1>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-3 self-start sm:self-auto">
                <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedLevel('licenciatura')}
                    className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      selectedLevel === 'licenciatura'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Licenciatura
                  </button>
                  <button
                    onClick={() => setSelectedLevel('bacharelado')}
                    className={`flex-1 sm:flex-none px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      selectedLevel === 'bacharelado'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Bacharelado
                  </button>
                </div>
                
                <button
                  onClick={() => setIsPreviewMode(true)}
                  className="w-full sm:w-auto bg-[#003366] hover:bg-[#002244] text-white px-4 py-2.5 text-sm font-medium rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  Gerar PDF
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-0">
          <CourseDetail course={coursesData[selectedLevel]} />
        </main>
      </div>

      {/* Printable Report */}
      <div className="hidden print:block">
        <div className="print:break-after-page">
          <PrintableReport course={coursesData.bacharelado} />
        </div>
        <div>
          <PrintableReport course={coursesData.licenciatura} />
        </div>
      </div>
    </>
  );
}
