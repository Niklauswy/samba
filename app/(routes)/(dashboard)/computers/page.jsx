'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Monitor, Laptop, Info, School, ChevronDown, CheckCircle, XCircle, MinusCircle, Clock, Calendar, Check, X, Minus } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Terminal, Apple, HelpCircle } from "lucide-react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Progress } from "@/components/ui/progress"

// Elimina importaciones innecesarias
// import { TooltipPortal } from '@radix-ui/react-tooltip'

const osIcons = {
  windows: <Monitor className="h-6 w-6 text-blue-500" />, // Reemplazado con 'Monitor'
  unix: <Terminal className="h-6 w-6 text-green-500" />,
  mac: <Apple className="h-6 w-6 text-gray-800" />,
  unknown: <HelpCircle className="h-6 w-6 text-gray-500" />,
}

// Actualizar exampleClassrooms con al menos 20 computadoras por salón
const exampleClassrooms = [
  {
    id: '1',
    name: 'Salón 101',
    statusHistory: Array.from({ length: 90 }, () => 
      ['activo', 'mantenimiento', 'desconocido'][Math.floor(Math.random() * 3)]
    ),
    computers: Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 1}`,
      name: `PC-101-${i + 1}`,
      status: ['activo', 'mantenimiento', 'desconocido'][i % 3],
      os: ['windows', 'unix', 'mac', 'unknown'][i % 4],
      ip: `192.168.1.${100 + i + 1}`,
      lastLogin: '2023-10-01 08:30', // Agregar 'lastLogin'
      loginCount: Math.floor(Math.random() * 100), // Agregar 'loginCount'
    })),
  },
  {
    id: '2',
    name: 'Salón 102',
    statusHistory: Array.from({ length: 90 }, () => 
      ['activo', 'mantenimiento', 'desconocido'][Math.floor(Math.random() * 3)]
    ),
    computers: Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 21}`,
      name: `PC-102-${i + 1}`,
      status: ['activo', 'mantenimiento', 'desconocido'][i % 3],
      os: ['windows', 'unix', 'mac', 'unknown'][i % 4],
      ip: `192.168.2.${100 + i + 1}`,
      lastLogin: '2023-10-01 08:30', // Agregar 'lastLogin'
      loginCount: Math.floor(Math.random() * 100), // Agregar 'loginCount'
    })),
  },
  {
    id: '3',
    name: 'Laboratorio Principal',
    computers: Array.from({ length: 50 }, (_, i) => ({
      id: `${i + 41}`,
      name: `PC-LAB-${i + 1}`,
      status: ['activo', 'mantenimiento', 'desconocido'][i % 3],
      os: ['windows', 'unix', 'mac', 'unknown'][i % 4],
      ip: `192.168.3.${100 + i + 1}`,
      lastLogin: '2023-10-01 08:30',
      loginCount: Math.floor(Math.random() * 100),
    })),
  }
]

const statusColors = {
  activo: 'bg-emerald-500 hover:bg-emerald-600',
  mantenimiento: 'bg-amber-500 hover:bg-amber-600',
  desconocido: 'bg-slate-300 hover:bg-slate-400',
}

const statusNames = {
  activo: 'Activo',
  mantenimiento: 'Mantenimiento',
  desconocido: 'Desconocido',
}

const statusIcons = {
  activo: <CheckCircle className="h-5 w-5 text-green-500" />,
  mantenimiento: <XCircle className="h-5 w-5 text-red-500" />,
  desconocido: <MinusCircle className="h-5 w-5 text-gray-500" />,
}

export default function ComputerManagement({ classrooms = exampleClassrooms }) {
  const [selectedComputer, setSelectedComputer] = useState(null)
  const [expandedClassrooms, setExpandedClassrooms] = useState({})

  const toggleExpand = (classroomId) => {
    setExpandedClassrooms((prev) => ({
      ...prev,
      [classroomId]: !prev[classroomId],
    }))
  }

  if (!classrooms || classrooms.length === 0) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-10">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">No hay salones disponibles</h2>
            <p className="text-gray-500">No se encontraron datos de salones para mostrar.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="p-8 bg-slate-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-10 text-slate-800 text-center">
          Estado de Laboratorios
        </h1>
        
        <div className="max-w-5xl mx-auto space-y-8">
          {classrooms.map((classroom) => {
            const totalComputers = classroom.computers.length

            return (
              <Card key={classroom.id} className="shadow-lg border-0 bg-white/50 backdrop-blur">
                <CardHeader className="border-b border-slate-100 bg-white">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-medium flex items-center text-slate-700">
                        <School className="mr-2 h-5 w-5 text-slate-600" />
                        {classroom.name}
                      </CardTitle>
                      <div className="text-sm text-slate-500">
                        {totalComputers} computadoras
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-700">
                      Última actualización: hace 5 minutos
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"/>
                          <span>Activo</span>
                          <div className="w-2 h-2 bg-amber-500 rounded-full ml-2"/>
                          <span>Mantenimiento</span>
                          <div className="w-2 h-2 bg-slate-300 rounded-full ml-2"/>
                          <span className="flex items-center group relative">
                            Desconocido
                            <Info 
                              className="h-3 w-3 ml-1 text-slate-400 cursor-help"
                              onClick={(e) => {
                                e.stopPropagation();
                                // Puedes agregar lógica adicional aquí si es necesario
                              }}
                            />
                            <div className="invisible group-hover:visible absolute -top-12 left-0 bg-slate-800 text-white text-xs p-2 rounded w-64">
                              Una computadora se marca como "desconocida" cuando no ha registrado actividad en los últimos 3 meses.
                            </div>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex h-8 gap-px" style={{ maxWidth: '100%' }}>
                        {classroom.computers.map((computer) => (
                          <Tooltip key={computer.id}>
                            <TooltipTrigger asChild>
                              <button
                                className={`w-10 min-w-[10px] transition-all duration-200 ${statusColors[computer.status]} first:rounded-l last:rounded-r`}
                                onClick={() => setSelectedComputer(computer)}
                                style={{ width: `${100/50}%` }} // Divide por el máximo de computadoras (50)
                              />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-slate-800 text-xs p-2">
                              <p className="text-white font-medium">{computer.name}</p>
                              <p className="text-slate-300">Último inicio: {computer.lastLogin}</p>
                              <p className="text-slate-300">Estado: {statusNames[computer.status]}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                        {/* Relleno para mantener consistencia visual cuando hay menos de 50 PCs */}
                        {classroom.computers.length < 50 && (
                          <div 
                            className="bg-transparent"
                            style={{ width: `${(50 - classroom.computers.length) * (100/50)}%` }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {selectedComputer && (
          <Dialog open={!!selectedComputer} onOpenChange={() => setSelectedComputer(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex items-center">
                  <Info className="mr-2 h-5 w-5 text-blue-500" />
                  Información de {selectedComputer.name}
                </DialogTitle>
              </DialogHeader>
              <div className="mt-6 space-y-4">
                <p><strong>Estado:</strong> {statusNames[selectedComputer.status]}</p>
                <p><strong>Sistema Operativo:</strong> {selectedComputer.os}</p>
                <p><strong>Dirección IP:</strong> {selectedComputer.ip}</p>
                <p><strong>Última actualización:</strong> {selectedComputer.lastLogin}</p>
                <p><strong>Uptime:</strong> {selectedComputer.uptimePercentage || '98.08%'}</p>
                <p><strong>Cantidad de inicios:</strong> {selectedComputer.loginCount}</p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </TooltipProvider>
  )
}