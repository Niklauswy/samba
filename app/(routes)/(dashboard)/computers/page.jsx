import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Monitor, Laptop, Info, School } from "lucide-react"

const exampleClassrooms = [
  {
    id: '1',
    name: 'Salón 101',
    computers: [
      { id: '1', name: 'PC-101-1', status: 'inDomain', os: 'windows', ip: '192.168.1.101', lastSeen: '2023-05-20 10:30' },
      { id: '2', name: 'PC-101-2', status: 'outOfDomain', os: 'windows', ip: '192.168.1.102', lastSeen: '2023-05-20 09:45' },
      { id: '3', name: 'PC-101-3', status: 'maintenance', os: 'unix', ip: '192.168.1.103', lastSeen: '2023-05-19 16:20' },
      { id: '4', name: 'PC-101-4', status: 'inDomain', os: 'unix', ip: '192.168.1.104', lastSeen: '2023-05-20 11:15' },
      { id: '5', name: 'PC-101-5', status: 'inDomain', os: 'windows', ip: '192.168.1.105', lastSeen: '2023-05-20 11:30' },
      { id: '6', name: 'PC-101-6', status: 'outOfDomain', os: 'windows', ip: '192.168.1.106', lastSeen: '2023-05-20 08:50' },
    ]
  },
  {
    id: '2',
    name: 'Salón 102',
    computers: [
      { id: '7', name: 'PC-102-1', status: 'inDomain', os: 'windows', ip: '192.168.1.201', lastSeen: '2023-05-20 10:45' },
      { id: '8', name: 'PC-102-2', status: 'inDomain', os: 'unix', ip: '192.168.1.202', lastSeen: '2023-05-20 11:00' },
      { id: '9', name: 'PC-102-3', status: 'inDomain', os: 'windows', ip: '192.168.1.203', lastSeen: '2023-05-20 11:20' },
      { id: '10', name: 'PC-102-4', status: 'maintenance', os: 'windows', ip: '192.168.1.204', lastSeen: '2023-05-19 15:30' },
    ]
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
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Gestión de Computadoras por Salón</h1>

      <div className="mb-8 flex flex-wrap justify-center gap-6">
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} className="flex items-center bg-white rounded-full px-4 py-2 shadow-md">
            <div className={`w-3 h-3 rounded-full ${color.replace('text', 'bg')} mr-2`}></div>
            <span className="text-sm font-medium text-gray-700">{statusNames[status]}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {classrooms.map((classroom) => (
          <Card key={classroom.id} className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105">
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {classroom.computers.map((computer) => (
                  <Dialog key={computer.id}>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-24 flex flex-col items-center justify-center p-2 hover:bg-gray-50 transition-colors duration-200"
                        onClick={() => setSelectedComputer(computer)}
                      >
                        {computer.os === 'windows' ? (
                          <Monitor className={`h-8 w-8 ${statusColors[computer.status]}`} />
                        ) : (
                          <Laptop className={`h-8 w-8 ${statusColors[computer.status]}`} />
                        )}
                        <span className="mt-2 text-xs font-medium text-gray-700">{computer.name}</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="flex items-center">
                          <Info className="mr-2 h-5 w-5 text-blue-500" />
                          Información de {computer.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 space-y-3">
                        <p className="flex items-center">
                          <span className="font-semibold mr-2">Estado:</span>
                          <Badge variant="outline" className={statusColors[computer.status]}>
                            {statusNames[computer.status]}
                          </Badge>
                        </p>
                        <p><span className="font-semibold">Sistema Operativo:</span> {computer.os === 'windows' ? 'Windows' : 'Unix'}</p>
                        <p><span className="font-semibold">Dirección IP:</span> {computer.ip}</p>
                        <p><span className="font-semibold">Última vez visto:</span> {computer.lastSeen}</p>
                      </div>
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}