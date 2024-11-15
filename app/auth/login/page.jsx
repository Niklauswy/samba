
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <img src="/uabcLogo.png" alt="UABC Logo" className="mx-auto h-20 w-20" />
            <CardTitle className="mt-4 text-2xl font-bold">Inicio de Sesión</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input type="email" placeholder="Correo Electrónico" required />
              <Input type="password" placeholder="Contraseña" required />
              <Button type="submit" className="w-full">Ingresar</Button>
            </form>
            <div className="mt-6 text-center">
              <img src="/facultadLogo.png" alt="Facultad Logo" className="mx-auto h-16 w-16" />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}