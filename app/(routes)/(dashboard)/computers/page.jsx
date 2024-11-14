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
            const activeComputers = classroom.computers.filter(c => c.status === 'activo').length
            const activePercentage = ((activeComputers / totalComputers) * 100).toFixed(2)

            return (
              <Card key={classroom.id} className="shadow-lg border-0 bg-white/50 backdrop-blur">
                <CardHeader className="border-b border-slate-100 bg-white">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <CardTitle className="text-xl font-medium flex items-center text-slate-700">
                        <School className="mr-2 h-5 w-5 text-slate-600" />
                        {classroom.name}
                      </CardTitle>
                      <div className="text-sm text-slate-500 flex items-center">
                        <Clock className="mr-2 h-4 w-4" />
                        Uptime: {activePercentage}%
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
                        <span className="text-sm font-medium text-slate-700">Estado Histórico</span>
                        <div className="flex items-center space-x-2 text-xs text-slate-500">
                          <div className="w-2 h-2 bg-emerald-500 rounded-full"/>
                          <span>Activo</span>
                          <div className="w-2 h-2 bg-amber-500 rounded-full ml-2"/>
                          <span>Mantenimiento</span>
                          <div className="w-2 h-2 bg-slate-300 rounded-full ml-2"/>
                          <span>Sin datos</span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500">90 días</div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex h-8 gap-px">
                        {classroom.statusHistory.map((status, idx) => (
                          <Tooltip key={idx}>
                            <TooltipTrigger asChild>
                              <div
                                className={`flex-1 transition-all duration-200 ${statusColors[status]} first:rounded-l last:rounded-r`}
                                onClick={() => setSelectedComputer(computer)}
                              />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-slate-800 text-xs">
                              <p className="text-white">
                                {new Date(Date.now() - (idx * 24 * 60 * 60 * 1000)).toLocaleDateString()}
                              </p>
                              <p className="text-slate-300">{statusNames[status]}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-slate-400">
                        <span>90 días atrás</span>
                        <span>Hoy</span>
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