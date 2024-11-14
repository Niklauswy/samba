'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Monitor, Laptop, Info, School } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip"
import { Windows, Terminal, Apple, HelpCircle } from "lucide-react"
import { TooltipPortal } from '@radix-ui/react-tooltip'

const osIcons = {
  windows: <Windows className="h-6 w-6 text-blue-500" />,
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
      status: ['inDomain', 'outOfDomain', 'maintenance'][i % 3],
      os: ['windows', 'unix', 'mac', 'unknown'][i % 4],
      ip: `192.168.1.${100 + i + 1}`,
      lastSeen: '2023-10-01 10:30',
    })),
  },
  {
    id: '2',
    name: 'Salón 102',
    computers: Array.from({ length: 20 }, (_, i) => ({
      id: `${i + 21}`,
      name: `PC-102-${i + 1}`,
      status: ['inDomain', 'outOfDomain', 'maintenance'][i % 3],
      os: ['windows', 'unix', 'mac', 'unknown'][i % 4],
      ip: `192.168.2.${100 + i + 1}`,
      lastSeen: '2023-10-01 10:30',
    })),
  }
]

const statusColors = {
  inDomain: 'text-green-500',
  outOfDomain: 'text-yellow-500',
  maintenance: 'text-red-500'
}

const statusNames = {
  inDomain: 'En dominio',
  outOfDomain: 'Fuera de dominio',
  maintenance: 'Mantenimiento'
}

export default function ComputerManagement({ classrooms = exampleClassrooms }) {
  const [selectedComputer, setSelectedComputer] = useState(null)

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
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Computadoras por Salón</h1>
      <Tabs defaultValue="salon-1">
        <TabsList className="mb-6">
          {classrooms.map((classroom) => (
            <TabsTrigger key={classroom.id} value={`salon-${classroom.id}`}>
              {classroom.name}
            </TabsTrigger>
          ))}
        </TabsList>
        {classrooms.map((classroom) => (
          <TabsContent key={classroom.id} value={`salon-${classroom.id}`}>
            <Card className="mb-6">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
                <CardTitle className="text-white flex items-center text-2xl">
                  <School className="mr-2 h-6 w-6" />
                  {classroom.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4 flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-700">Total de computadoras: {classroom.computers.length}</p>
                  <Badge variant="secondary" className="text-sm">
                    {classroom.computers.filter(c => c.status === 'inDomain').length} en dominio
                  </Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4">
                  {classroom.computers.map((computer) => (
                <TooltipProvider key={computer.id}>
                    <Tooltip key={computer.id} content={computer.os}>
                      <Button
                        variant="outline"
                        className="w-full h-24 flex flex-col items-center justify-center p-2"
                        onClick={() => setSelectedComputer(computer)}
                      >
                        {osIcons[computer.os] || osIcons.unknown}
                        <span className="mt-2 text-xs font-medium text-gray-700">{computer.name}</span>
                      </Button>
                    </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}