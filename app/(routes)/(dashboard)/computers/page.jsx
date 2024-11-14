'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Monitor, Laptop, Info, School, ChevronDown } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip"
import { Terminal, Apple, HelpCircle } from "lucide-react"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"

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
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Computadoras por Salón</h1>
        <Accordion type="single" collapsible>
          {classrooms.map((classroom) => (
            <AccordionItem key={classroom.id} value={`classroom-${classroom.id}`}>
              <AccordionTrigger className="flex justify-between items-center px-4 py-2 bg-white shadow-md">
                <span className="text-xl font-semibold flex items-center">
                  <School className="mr-2 h-5 w-5" />
                  {classroom.name}
                </span>
                <ChevronDown className="h-5 w-5" />
              </AccordionTrigger>
              <AccordionContent className="p-4 bg-white shadow-md">
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-700">
                    Total de computadoras: {classroom.computers.length}
                  </p>
                  <Badge variant="secondary" className="text-sm">
                    {classroom.computers.filter(c => c.status === 'activo').length} activas
                  </Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                  {(expandedClassrooms[classroom.id] ? classroom.computers : classroom.computers.slice(0,10)).map((computer) => (
                    <Dialog key={computer.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              className={`w-full h-24 flex flex-col items-center justify-center p-2 rounded-md ${statusColors[computer.status]} bg-opacity-20`}
                              onClick={() => setSelectedComputer(computer)}
                            >
                              {osIcons[computer.os] || osIcons.unknown}
                              <span className="mt-2 text-xs font-medium text-gray-700">{computer.name}</span>
                            </Button>
                          </DialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent>
                          {computer.os}
                        </TooltipContent>
                      </Tooltip>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center">
                            <Info className="mr-2 h-5 w-5 text-blue-500" />
                            Información de {computer.name}
                          </DialogTitle>
                        </DialogHeader>
                        <div className="mt-4 space-y-3">
                          <p><strong>Estado:</strong> {statusNames[computer.status]}</p>
                          <p><strong>Sistema Operativo:</strong> {computer.os}</p>
                          <p><strong>Dirección IP:</strong> {computer.ip}</p>
                          <p><strong>Último inicio de sesión:</strong> {computer.lastLogin}</p>
                          <p><strong>Cantidad de inicios:</strong> {computer.loginCount}</p>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
                {classroom.computers.length > 10 && (
                  <Button variant="link" onClick={() => toggleExpand(classroom.id)} className="mt-4">
                    {expandedClassrooms[classroom.id] ? 'Ver menos' : 'Ver más'}
                  </Button>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </TooltipProvider>
  )
}