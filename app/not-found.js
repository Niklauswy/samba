'use client'

import { FrownIcon, HomeIcon, RotateCcwIcon, Binary, Atom, Database, Dna, PiSquare, Microscope, Beaker, Cpu, Infinity } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { motion } from 'framer-motion'

const ScientificBackground = () => {
  const icons = [Binary, Atom, Database, Dna, PiSquare, Microscope, Beaker, Cpu, Infinity]
  return (
    <div className="fixed inset-0 overflow-hidden opacity-10">
      {Array.from({ length: 50 }).map((_, index) => {
        const Icon = icons[index % icons.length]
        return (
          <Icon
            key={index}
            className="absolute text-primary"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 4 + 3}rem`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            aria-hidden="true"
          />
        )
      })}
    </div>
  )
}

// Redefine AnimatedFrownIcon using motion component directly
const AnimatedFrownIcon = motion(FrownIcon, {
  animate: {
    rotate: [0, -10, 10, -10, 0],
    y: [0, -5, 5, -5, 0]
  },
  transition: {
    duration: 2,
    repeat: Infinity,
    repeatType: "loop",
    ease: "easeInOut"
  },
  className: "w-32 h-32 text-red-500 z-20" // Ensure proper styling and visibility
})

export default function NotFound() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary/20 overflow-hidden">
      <ScientificBackground />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10"
      >
        <Card className="w-[400px] overflow-hidden shadow-lg backdrop-blur-sm bg-background/80">
          <CardHeader className="bg-primary text-primary-foreground p-6">
            <CardTitle className="text-2xl font-bold text-center">¡Ups! Error en el Sistema</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex justify-center mb-6">
              <AnimatedFrownIcon />
            </div>
            <p className="text-center text-muted-foreground mb-4">
              Parece que nuestros cálculos han encontrado una anomalía en el espacio-tiempo.
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Nuestros mejores científicos están trabajando en resolver esta ecuación. Mientras tanto, puedes intentar recargar o volver al inicio.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center gap-4 p-6 bg-muted/50">
            <Button 
              variant="outline"
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 hover:bg-secondary"
            >
              <RotateCcwIcon className="w-4 h-4" />
              Recalcular
            </Button>
            <Button asChild className="flex items-center gap-2">
              <Link href="/">
                <HomeIcon className="w-4 h-4" />
                Volver al laboratorio
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}