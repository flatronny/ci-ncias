import React from 'react';
import { CourseData } from '../types';
import { Card, CardContent, CardHeader, CardTitle, Badge, cn } from './ui';
import { Users, GraduationCap, ArrowUpRight, ArrowDownRight, UserPlus, BookOpen } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Props {
  course: CourseData;
}

const COLORS = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#9333ea', '#475569'];

export function CourseDetail({ course }: Props) {
  const vagasData = [
    { name: 'Ampla', Vestibular: course.vagas.vestibular.ampla, SISU: course.vagas.sisu.ampla },
    { name: 'Negros', Vestibular: course.vagas.vestibular.negros, SISU: course.vagas.sisu.negros },
    { name: 'Indígenas', Vestibular: course.vagas.vestibular.indigenas, SISU: course.vagas.sisu.indigenas },
    { name: 'PCD', Vestibular: course.vagas.vestibular.pcd, SISU: course.vagas.sisu.pcd },
  ];

  if (course.vagas.vestibular.res_ms || course.vagas.sisu.res_ms) {
    vagasData.push({ 
      name: 'Res. MS', 
      Vestibular: course.vagas.vestibular.res_ms || 0, 
      SISU: course.vagas.sisu.res_ms || 0 
    });
  }

  const seriesData = course.students.series.map((val, idx) => ({
    name: `${idx + 1}ª Série`,
    Matriculados: val
  }));

  const ingressosData = [
    { name: 'SISU', value: course.students.ingresso.sisu },
    { name: 'PSS', value: course.students.ingresso.pss },
    { name: 'Vestibular', value: course.students.ingresso.vestibular },
    { name: 'Outros', value: course.students.ingresso.outros },
  ].filter(d => d.value > 0);

  const renderSinaesIndicator = (title: string, data: any) => {
    const diff = data.nota - data.mediaNacional;
    const isPositive = diff > 0;
    
    return (
      <div className="flex flex-col p-4 bg-gray-50 rounded-lg border border-gray-100">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</span>
          <Badge variant={data.conceito >= 3 ? (data.conceito >= 4 ? 'success' : 'primary') : 'danger'}>
            Conceito {data.conceito}
          </Badge>
        </div>
        <div className="flex items-end gap-3">
          <span className="text-3xl font-bold text-gray-900">{data.nota.toFixed(3).replace('.', ',')}</span>
          <div className={cn("flex flex-col text-sm font-medium mb-1", isPositive ? "text-emerald-600" : "text-red-600")}>
             <span className="flex items-center">
               {isPositive ? <ArrowUpRight className="w-4 h-4 mr-0.5" /> : <ArrowDownRight className="w-4 h-4 mr-0.5" />}
               {Math.abs(diff).toFixed(3).replace('.', ',')}
             </span>
             <span className="text-xs text-gray-400 font-normal">vs nacional ({data.mediaNacional.toFixed(3).replace('.', ',')})</span>
          </div>
        </div>
      </div>
    );
  };

  const historyChartData = course.history.map((item, index) => {
    let evasao = 0;
    if (index > 0) {
      const prev = course.history[index - 1].students;
      evasao = Math.max(0, (prev.matriculados - prev.concluintes) + item.students.ingressantes - item.students.matriculados);
    }
    return {
      year: item.year,
      Ingressantes: item.students.ingressantes,
      Matriculados: item.students.matriculados,
      Concluintes: item.students.concluintes,
      Evasão: index > 0 ? evasao : 0,
    };
  });

  return (
    <div className="space-y-6">
      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <UserPlus className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Vagas Ofertadas (Total)</p>
              <h4 className="text-2xl font-bold text-gray-900">{course.vagas.totalGeral}</h4>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Ingressantes</p>
              <h4 className="text-2xl font-bold text-gray-900">{course.students.ingressantes}</h4>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Matriculados</p>
              <h4 className="text-2xl font-bold text-gray-900">{course.students.matriculados}</h4>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Concluintes</p>
              <h4 className="text-2xl font-bold text-gray-900">{course.students.concluintes}</h4>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Resultados Consolidados SINAES (Ciclo 2021-2023)</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               {renderSinaesIndicator('ENADE', course.enade.enade)}
               {renderSinaesIndicator('IDD', course.enade.idd)}
               {renderSinaesIndicator('CPC', course.enade.cpc)}
             </div>
              <p className="text-xs text-gray-500 mt-4 leading-relaxed">
               <strong>ENADE:</strong> Avalia o rendimento dos concluintes. 
               <strong> IDD:</strong> Mede o "valor agregado" pelo curso ao aluno. 
               <strong> CPC:</strong> Conceito Preliminar de Curso.
               {course.id === 'licenciatura' && (
                 <>
                   <br />
                   <span className="inline-block mt-2 font-medium text-[#003366]">
                     * Nota: Os conceitos das licenciaturas tiveram alterações, porém as notas demonstradas no Resultado SINAES e Detalhamento do CPC seguem as diretrizes do ciclo passado ainda. O curso já possui o Conceito ENADE relativo a 2025 divulgado (no histórico abaixo). As demais notas métricas (IDD, CPC) referentes ao ciclo de 2025 ainda não foram publicadas. Os resultados detalhados refletem o último ciclo consolidado (2021-2023).
                   </span>
                 </>
               )}
             </p>
             {course.cpcDetails && (
               <div className="mt-6 pt-6 border-t border-gray-200">
                 <h4 className="text-sm font-semibold text-gray-900 mb-4">Detalhamento do CPC ({course.cpcDetails.ano})</h4>
                 <div className="overflow-x-auto">
                   <table className="w-full text-left text-sm border-collapse">
                     <thead>
                       <tr className="bg-gray-100 font-semibold text-gray-700">
                         <th className="p-2 border-b border-gray-200">Indicador</th>
                         <th className="p-2 border-b border-gray-200 text-center">Nota Bruta</th>
                         <th className="p-2 border-b border-gray-200 text-center">Nota Padronizada</th>
                       </tr>
                     </thead>
                     <tbody className="text-gray-700">
                       <tr className="border-b border-gray-100">
                         <td className="p-2">Formação Geral (FG)</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaBrutaFG.toFixed(3).replace('.', ',')}</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaFG.toFixed(3).replace('.', ',')}</td>
                       </tr>
                       <tr className="border-b border-gray-100 bg-gray-50">
                         <td className="p-2">Componente Específico (CE)</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaBrutaCE.toFixed(3).replace('.', ',')}</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaCE.toFixed(3).replace('.', ',')}</td>
                       </tr>
                       <tr className="border-b border-gray-100">
                         <td className="p-2">Conceito ENADE (Contínuo)</td>
                         <td className="p-2 text-center font-mono bg-blue-50 text-blue-800 font-semibold" colSpan={2}>{course.cpcDetails.conceitoEnadeContinuo.toFixed(3).replace('.', ',')}</td>
                       </tr>
                       <tr className="border-b border-gray-100 bg-gray-50">
                         <td className="p-2">IDD</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaBrutaIDD.toFixed(3).replace('.', ',')}</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaIDD.toFixed(3).replace('.', ',')}</td>
                       </tr>
                       <tr className="border-b border-gray-100">
                         <td className="p-2">Mestres</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaBrutaMestres.toFixed(3).replace('.', ',')}</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaMestres.toFixed(3).replace('.', ',')}</td>
                       </tr>
                       <tr className="border-b border-gray-100 bg-gray-50">
                         <td className="p-2">Doutores</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaBrutaDoutores.toFixed(3).replace('.', ',')}</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaDoutores.toFixed(3).replace('.', ',')}</td>
                       </tr>
                       <tr className="border-b border-gray-100">
                         <td className="p-2">Regime de Trabalho</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaBrutaRegimeTrabalho.toFixed(3).replace('.', ',')}</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaRegimeTrabalho.toFixed(3).replace('.', ',')}</td>
                       </tr>
                       <tr className="border-b border-gray-100 bg-gray-50">
                         <td className="p-2">Organização Didático-Pedagógica</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaBrutaOrganizacao.toFixed(3).replace('.', ',')}</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaOrganizacao.toFixed(3).replace('.', ',')}</td>
                       </tr>
                       <tr className="border-b border-gray-100">
                         <td className="p-2">Infraestrutura e Instalações Físicas</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaBrutaInfraestrutura.toFixed(3).replace('.', ',')}</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaInfraestrutura.toFixed(3).replace('.', ',')}</td>
                       </tr>
                       <tr className="border-b border-gray-100 bg-gray-50">
                         <td className="p-2">Oportunidade de Ampliação da Formação</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaBrutaOportunidade.toFixed(3).replace('.', ',')}</td>
                         <td className="p-2 text-center font-mono">{course.cpcDetails.notaPadronizadaOportunidade.toFixed(3).replace('.', ',')}</td>
                       </tr>
                       <tr className="bg-blue-50 border-t-2 border-[#003366]">
                         <td className="p-2 font-bold text-[#003366]">CPC (Contínuo)</td>
                         <td className="p-2 text-center font-bold font-mono text-[#003366]" colSpan={2}>{course.cpcDetails.cpcContinuo.toFixed(3).replace('.', ',')}</td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
                 <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <p className="text-xs text-gray-500 font-semibold uppercase">Concluintes Inscritos</p>
                      <p className="text-xl font-bold text-gray-900">{course.cpcDetails.concluintesInscritos}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <p className="text-xs text-gray-500 font-semibold uppercase">Concluintes Participantes</p>
                      <p className="text-xl font-bold text-gray-900">{course.cpcDetails.concluintesParticipantes}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <p className="text-xs text-gray-500 font-semibold uppercase">Participantes c/ Nota ENEM</p>
                      <p className="text-xl font-bold text-gray-900">{course.cpcDetails.concluintesParticipantesNotaEnem}</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded border border-gray-200">
                      <p className="text-xs text-gray-500 font-semibold uppercase">Proporção ENADE/ENEM</p>
                      <p className="text-xl font-bold text-gray-900">{(course.cpcDetails.proporcaoConcluintesNotaEnem * 100).toFixed(0)}%</p>
                    </div>
                 </div>
               </div>
             )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Forma de Ingresso (Série - 2025)</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center min-h-[220px]">
            {ingressosData.length > 0 ? (
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={ingressosData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {ingressosData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm text-gray-500">Dados não disponíveis</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <Card>
          <CardHeader>
            <CardTitle>Distribuição de Vagas por Cota e Modalidade (2025)</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={vagasData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 13}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 13}} />
                  <RechartsTooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend wrapperStyle={{paddingTop: '20px'}} />
                  <Bar dataKey="Vestibular" fill="#2563EB" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="SISU" fill="#16A34A" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Matriculados por Série (2025)</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={seriesData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 13}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 13}} />
                  <RechartsTooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="Matriculados" fill="#8B5CF6" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
             </div>
          </CardContent>
        </Card>
      </div>

      {/* New Row for Histórico ENADE */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Evolução do Conceito ENADE</CardTitle>
          </CardHeader>
          <CardContent>
            {course.enadeHistory.length > 0 ? (
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={course.enadeHistory} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                    <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 13}} />
                    <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 13}} />
                    <RechartsTooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                    <Line type="monotone" dataKey="conceito" name="Conceito ENADE" stroke="#003366" strokeWidth={3} dot={{r: 6, fill: '#003366', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 8, fill: '#003366', strokeWidth: 0}} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[300px] flex items-center justify-center">
                <p className="text-gray-500">Sem histórico disponível</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* New Row for Historico Matriculas */}
      <div className="grid grid-cols-1 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Histórico do Curso</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={historyChartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 13}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 13}} />
                  <RechartsTooltip cursor={{fill: '#F3F4F6'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend wrapperStyle={{paddingTop: '20px'}} />
                  <Bar dataKey="Ingressantes" fill="#0284c7" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Matriculados" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Concluintes" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Evasão" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
