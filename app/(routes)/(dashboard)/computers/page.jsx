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
  activo: 'bg-green-500',
  mantenimiento: 'bg-yellow-500',
  desconocido: 'bg-gray-500',
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
      <div className="p-8 bg-white min-h-screen">
        <h1 className="text-4xl font-bold mb-10 text-gray-800 text-center">Monitoreo de Estados por Salón</h1>
        <div className="flex justify-center mb-6 space-x-6">
          <div className="flex items-center">
            <div className="w-5 h-5 bg-green-500 rounded mr-2"></div>
            <span className="text-gray-700">Operativo</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-red-500 rounded mr-2"></div>
            <span className="text-gray-700">Problemas</span>
          </div>
          <div className="flex items-center">
            <div className="w-5 h-5 bg-gray-500 rounded mr-2"></div>
            <span className="text-gray-700">Sin Datos</span>
          </div>
        </div>
        <div className="space-y-10">
          {classrooms.map((classroom) => {
            const totalComputers = classroom.computers.length
            const activeComputers = classroom.computers.filter(c => c.status === 'activo').length
            const activePercentage = ((activeComputers / totalComputers) * 100).toFixed(2)

            return (
              <Card key={classroom.id} className="shadow-md">
                <CardHeader className="flex justify-between items-center p-6 bg-gray-50">
                  <div>
                    <CardTitle className="text-2xl font-semibold flex items-center">
                      <School className="mr-3 h-6 w-6 text-blue-500" />
                      {classroom.name}
                    </CardTitle>
                    <div className="text-gray-500 flex items-center mt-2">
                      <Calendar className="mr-2 h-5 w-5" />
                      <span>90 days ago - Today</span>
                    </div>
                  </div>
                  <div className="text-gray-600 text-lg flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Uptime: {activePercentage}%
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Add Status History Tracker */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Estado Histórico</span>
                      <span className="text-xs text-gray-500">Última actualización: {classroom.statusHistory.length} días atrás</span>
                    </div>
                    <div className="flex h-4 space-x-0.5">
                      {classroom.statusHistory.map((status, idx) => (
                        <div
                          key={idx}
                          className={`flex-1 ${statusColors[status]} rounded`}
                          title={`Día ${idx + 1}: ${statusNames[status]}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Existing Horizontal Tracker (Optional: Remove if replaced by status history) */}
                  <div className="flex items-center space-x-2 overflow-x-auto mb-4">
                    {classroom.computers.map((computer) => (
                      <Tooltip key={computer.id}>
                        <TooltipTrigger asChild>
                          <div
                            className={`w-6 h-6 rounded-lg ${statusColors[computer.status]} flex items-center justify-center cursor-pointer transition-transform transform hover:scale-110 shadow-md`}
                            onClick={() => setSelectedComputer(computer)}
                          >
                            {computer.status === 'activo' && <Check className="h-4 w-4 text-white" />}
                            {computer.status === 'mantenimiento' && <X className="h-4 w-4 text-white" />}
                            {computer.status === 'desconocido' && <Minus className="h-4 w-4 text-white" />}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-gray-800 text-white p-2 rounded">
                          <p><strong>Estado:</strong> {statusNames[computer.status]}</p>
                          <p><strong>Último inicio de sesión:</strong> {computer.lastLogin}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                  
                  {/* ...existing code... */}
                </CardContent>
              </Card>
            )
          })}
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
      </div>
    </TooltipProvider>
  )
}