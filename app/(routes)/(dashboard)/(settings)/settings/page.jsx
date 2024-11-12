"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Users, FileSpreadsheet, HardDrive, AlertCircle, RotateCcw, Clock, Server, Info } from "lucide-react"

export default function Settings() {
  const [domain, setDomain] = useState("example.com")
  const [logRotation, setLogRotation] = useState(7)
  const [detailedLogging, setDetailedLogging] = useState(false)
  const [csvFile, setCsvFile] = useState(null)
  const [syslogEntries, setSyslogEntries] = useState([])
  const [systemInfo, setSystemInfo] = useState({
    time: "",
    hostname: "",
    coreVersion: "",
    software: "",
    systemLoad: "",
    uptime: ""
  })

  useEffect(() => {
    // Simulating syslog entries
    const interval = setInterval(() => {
      setSyslogEntries(prev => [
        `[${new Date().toISOString()}] New log entry ${Math.random().toString(36).substring(7)}`,
        ...prev.slice(0, 99)
      ])
    }, 5000)

    // Simulating system info updates
    setSystemInfo({
      time: "Tue Nov 12 01:59:46 AM PST 2024",
      hostname: "zenti",
      coreVersion: "8.0.3 (8.0.4 available)",
      software: "1 component updates, 120 system updates (80 security)",
      systemLoad: "0.02, 0.33, 0.61",
      uptime: "29 min"
    })

    return () => clearInterval(interval)
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Management
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
          </CardContent>
        </Card>

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
                  max={30}
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="w-5 h-5" />
              System Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p><Clock className="inline w-4 h-4 mr-2" /> Time: {systemInfo.time}</p>
            <p><Server className="inline w-4 h-4 mr-2" /> Hostname: {systemInfo.hostname}</p>
            <p><AlertCircle className="inline w-4 h-4 mr-2" /> Core version: {systemInfo.coreVersion}</p>
            <p><HardDrive className="inline w-4 h-4 mr-2" /> Software: {systemInfo.software}</p>
            <p><AlertCircle className="inline w-4 h-4 mr-2" /> System load: {systemInfo.systemLoad}</p>
            <p><Clock className="inline w-4 h-4 mr-2" /> Uptime: {systemInfo.uptime}</p>
            <p><Server className="inline w-4 h-4 mr-2" /> Domain: {domain}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Live Syslog
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            {syslogEntries.map((entry, index) => (
              <p key={index} className="text-sm">{entry}</p>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}