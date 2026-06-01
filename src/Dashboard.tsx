import React, { useState, useRef } from 'react';
import { coursesData } from './data';
import { CourseLevel } from './types';
import { CourseDetail } from './components/CourseDetail';
import { PrintableReport } from './components/PrintableReport';
import { Printer, Download, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Dashboard() {
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel>('licenciatura');
  const [isGenerating, setIsGenerating] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleGeneratePDF = async () => {
    if (!reportRef.current) return;
    setIsGenerating(true);
    
    try {
      const element = reportRef.current;
      
      const canvas = await html2canvas(element, {
        scale: 2, // Melhor qualidade
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = pdfHeight;
      let position = 0;

      // Adiciona a primeira página
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
      heightLeft -= pdf.internal.pageSize.getHeight();

      // Adiciona as páginas seguintes se couber em mais de uma A4 (raro para este tamanho, mas precavido)
      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pdf.internal.pageSize.getHeight();
      }

      pdf.save(`Relatorio_SINAES_${coursesData[selectedLevel].name}.pdf`);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Não foi possível gerar o PDF. Se o problema persistir, abra o app em uma Nova Guia e use Ctrl+P / Cmd+P.');
    } finally {
      setIsGenerating(false);
    }
  };

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
                <p className="text-sm text-gray-500 mt-1 text-balance">
                  Código do Curso (INEP): <strong className="text-gray-700">{coursesData[selectedLevel].codigo}</strong> &bull; Painel analítico de indicadores (SINAES, Vagas e Matrículas).
                </p>
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
                
                <div className="flex gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                  <button
                    onClick={handleGeneratePDF}
                    disabled={isGenerating}
                    className="flex-1 sm:flex-none bg-[#003366] hover:bg-[#002244] disabled:bg-[#003366]/70 text-white px-4 py-2.5 text-sm font-medium rounded-lg shadow-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Gerando PDF...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Baixar PDF
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => window.print()}
                    title="Imprimir visualização pelo navegador (Melhor qualidade de texto)"
                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-3 py-2.5 rounded-lg shadow-sm flex items-center justify-center transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-0">
          <CourseDetail course={coursesData[selectedLevel]} />
        </main>
      </div>

      {/* Printable Report (Off-screen for html2canvas to capture it cleanly) */}
      <div className="absolute top-0 left-[-9999px] w-[21cm] pointer-events-none print:static print:w-auto print:block">
        <div ref={reportRef} className="bg-white">
          <PrintableReport course={coursesData[selectedLevel]} />
        </div>
      </div>
    </>
  );
}
