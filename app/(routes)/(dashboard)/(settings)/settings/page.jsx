"use client"

import { useState, useEffect } from "react"
import useSWR from 'swr'; // Importar useSWR para manejo eficiente de datos
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, FileSpreadsheet, HardDrive, AlertCircle, RotateCcw, Clock, Server, Info, Database, Home } from "lucide-react"

export default function Settings() {
  const [activeTab, setActiveTab] = useState("General")
  const [domain, setDomain] = useState("example.com")
  const [hostname, setHostname] = useState("zenti")
  const [logRotation, setLogRotation] = useState(7)
  const [detailedLogging, setDetailedLogging] = useState(false)
  const [csvFile, setCsvFile] = useState(null)
  const [defaultPassword, setDefaultPassword] = useState("")
  const [syslogEntries, setSyslogEntries] = useState([])
  const [syslogError, setSyslogError] = useState(null); // Nuevo estado para errores de syslog

  // Fetcher para SWR
  const fetcher = (url) => fetch(url).then(res => res.json());

  // Utilizar useSWR para systemInfo con actualización cada segundo
  const { data: systemInfo, error: systemInfoError } = useSWR('/api/systeminfo', fetcher, {
    refreshInterval: 1000, // Actualizar cada 1 segundo
  });

  useEffect(() => {
    const fetchSyslog = async () => {
      try {
        const response = await fetch('/api/syslog');
        const result = await response.json();
        if (response.ok) {
          setSyslogEntries(result.syslog);
          setSyslogError(null); // Resetear error si la solicitud es exitosa
        } else {
          console.error(result.error);
          setSyslogError(result.error); // Establecer mensaje de error
        }
      } catch (error) {
        console.error('Error fetching syslog:', error);
        setSyslogError('Error fetching syslog'); // Establecer mensaje de error
      }
    };

    // Realizar la solicitud inicial
    fetchSyslog();

    // Configurar polling para syslog cada 5 segundos
    const syslogInterval = setInterval(fetchSyslog, 5000);

    return () => {
      clearInterval(syslogInterval);
    };
  }, [])

  const handleCsvDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type === "text/csv") {
      setCsvFile(file)
    }
  }

  const handleCsvSelect = (e) => {
    const file = e.target.files?.[0]
    if (file && file.type === "text/csv") {
      setCsvFile(file)
    }
  }

  const handleUpload = () => {
    if (csvFile) {
      // Here you would typically send the file to your server
      console.log("Uploading file:", csvFile.name)
      // Reset the file input after upload
      setCsvFile(null)
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Settings</h1>

      <div className="tabs">
        <div className="flex space-x-4 border-b">
          <Button 
            variant={activeTab === "General" ? "primary" : "ghost"} 
            onClick={() => setActiveTab("General")}
          >
            General
          </Button>
          <Button 
            variant={activeTab === "Usuarios" ? "primary" : "ghost"} 
            onClick={() => setActiveTab("Usuarios")}
          >
            Usuarios
          </Button>
          <Button 
            variant={activeTab === "Grupos" ? "primary" : "ghost"} 
            onClick={() => setActiveTab("Grupos")}
          >
            Grupos
          </Button>
          <Button 
            variant={activeTab === "Unidades" ? "primary" : "ghost"} 
            onClick={() => setActiveTab("Unidades")}
          >
            Unidades Organizacionales
          </Button>
          <Button 
            variant={activeTab === "Logs" ? "primary" : "ghost"} 
            onClick={() => setActiveTab("Logs")}
          >
            Logs
          </Button>
        </div>
      </div>

      <div className="mt-6">
        {activeTab === "General" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Server className="w-5 h-5" />
                System Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {systemInfoError ? (
                <p className="text-red-500">{systemInfoError}</p>
              ) : (
                <>
                  <p><Clock className="inline w-4 h-4 mr-2" /> Time: {systemInfo?.time}</p>
                  <p><Home className="inline w-4 h-4 mr-2" /> Hostname: {hostname}</p>
                  <p><Server className="inline w-4 h-4 mr-2" /> Domain: {domain}</p>
                  <p><AlertCircle className="inline w-4 h-4 mr-2" /> Core version: {systemInfo?.coreVersion}</p>
                  <p><HardDrive className="inline w-4 h-4 mr-2" /> Software: {systemInfo?.software}</p>
                  <p><AlertCircle className="inline w-4 h-4 mr-2" /> System load: {systemInfo?.systemLoad}</p>
                  <p><Clock className="inline w-4 h-4 mr-2" /> Uptime: {systemInfo?.uptime}</p>
                  <p><Database className="inline w-4 h-4 mr-2" /> Storage: {systemInfo?.storage}</p>
                </>
              )}
            </CardContent>
          </Card>
        )}
        {activeTab === "Usuarios" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">User Management</h2>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  CSV Import
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        <Info className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>CSV Format</DialogTitle>
                        <DialogDescription>
                          Your CSV file should follow this format:
                        </DialogDescription>
                      </DialogHeader>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Group</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>john_doe</TableCell>
                            <TableCell>john@example.com</TableCell>
                            <TableCell>John Doe</TableCell>
                            <TableCell>Users</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>jane_smith</TableCell>
                            <TableCell>jane@example.com</TableCell>
                            <TableCell>Jane Smith</TableCell>
                            <TableCell>Admins</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleCsvDrop}
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary"
                >
                  <FileSpreadsheet className="w-12 h-12 mx-auto text-gray-400" />
                  <p className="mt-2">Drag and drop a CSV file here, or click to select</p>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleCsvSelect}
                    className="hidden"
                    id="csv-upload"
                  />
                  <Label htmlFor="csv-upload" className="mt-2 inline-block">
                    <Button variant="outline" size="sm" as="span">
                      Select CSV
                    </Button>
                  </Label>
                </div>
                {csvFile && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">Selected file: {csvFile.name}</p>
                    <Button className="mt-2" onClick={handleUpload}>Upload and Process Users</Button>
                  </div>
                )}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="default-password">Default Password</Label>
                    <Input
                      id="default-password"
                      type="password"
                      value={defaultPassword}
                      onChange={(e) => setDefaultPassword(e.target.value)}
                      placeholder="Enter default password for new users"
                    />
                  </div>
                  <Button>Save Default Settings</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Default User Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
           
              </CardContent>
            </Card>
          </div>
        )}
        {activeTab === "Grupos" && (
          <>
            {/* contenido para Grupos */}
          </>
        )}
        {activeTab === "Unidades" && (
          <>
            {/* contenido para Unidades Organizacionales */}
          </>
        )}
        {activeTab === "Logs" && (
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardDrive className="w-5 h-5" />
                  Log Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="log-rotation">Log Rotation (days)</Label>
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="w-4 h-4 text-gray-500" />
                    <Slider
                      id="log-rotation"
                      min={1}
                      max={120}
                      step={1}
                      value={[logRotation]}
                      onValueChange={(value) => setLogRotation(value[0])}
                    />
                    <span className="w-12 text-right">{logRotation}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="detailed-logging"
                    checked={detailedLogging}
                    onCheckedChange={setDetailedLogging}
                  />
                  <Label htmlFor="detailed-logging">Enable Detailed Logging</Label>
                </div>
                <Button>Save Log Settings</Button>
              </CardContent>
            </Card>

            <Separator className="my-6" />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Live Syslog
                </CardTitle>
              </CardHeader>
              <CardContent>
                {syslogError ? (
                  <p className="text-red-500">{syslogError}</p>
                ) : (
                  <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                    {syslogEntries.map((entry, index) => (
                      <p key={index} className="text-sm">{entry}</p>
                    ))}
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}