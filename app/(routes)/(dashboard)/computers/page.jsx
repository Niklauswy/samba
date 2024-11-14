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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Monitoreo de Estados por Salón</h1>
      <div className="space-y-6">
        {classrooms.map((classroom) => {
          const totalComputers = classroom.computers.length
          const activeComputers = classroom.computers.filter(c => c.status === 'activo').length
          const activePercentage = ((activeComputers / totalComputers) * 100).toFixed(0)

          return (
            <Card key={classroom.id} className="relative">
              <CardHeader className="flex justify-between items-center p-4">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <School className="mr-2 h-5 w-5" />
                  {classroom.name}
                </CardTitle>
                <div className="text-sm font-medium text-gray-600">
                  {activePercentage}% Activas
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex space-x-1">
                  {classroom.computers.map((computer) => {
                    const statusColor = {
                      'activo': 'bg-green-500',
                      'mantenimiento': 'bg-red-500',
                      'desconocido': 'bg-gray-500'
                    }[computer.status]

                    return (
                      <Tooltip key={computer.id}>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            className={`w-full h-4 ${statusColor} flex-1`}
                            onClick={() => setSelectedComputer(computer)}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p><strong>Nombre:</strong> {computer.name}</p>
                          <p><strong>Estado:</strong> {statusNames[computer.status]}</p>
                          <p><strong>Último inicio de sesión:</strong> {computer.lastLogin}</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                  })}
                </div>
                <div className="mt-4 flex space-x-4">
                  <Badge variant="secondary" className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div> Activo
                  </Badge>
                  <Badge variant="secondary" className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div> Mantenimiento
                  </Badge>
                  <Badge variant="secondary" className="flex items-center">
                    <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div> Desconocido
                  </Badge>
                </div>
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
              <div className="mt-4 space-y-3">
                <p><strong>Estado:</strong> {statusNames[selectedComputer.status]}</p>
                <p><strong>Sistema Operativo:</strong> {selectedComputer.os}</p>
                <p><strong>Dirección IP:</strong> {selectedComputer.ip}</p>
                <p><strong>Último inicio de sesión:</strong> {selectedComputer.lastLogin}</p>
                <p><strong>Cantidad de inicios:</strong> {selectedComputer.loginCount}</p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}