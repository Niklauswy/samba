"use client";

import * as React from "react";
import { TrendingUp, Users } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const units = [
  { name: 'FIS', description: 'Estudiantes de Fisica', users: 10, gradient: 'bg-gradient-to-r from-purple-500 to-purple-700', icon: <Users size={20} /> },
  { name: 'CS', description: 'Estudiantes de Ciencias Computacionales', users: 20, gradient: 'bg-gradient-to-r from-blue-500 to-blue-700', icon: <Users size={20} /> },
  { name: 'MAT', description: 'Estudiantes de Matematicas', users: 30, gradient: 'bg-gradient-to-r from-red-500 to-red-700', icon: <Users size={20} /> },
  { name: 'CDD', description: 'Estudiantes de Ciencias de Datos', users: 40, gradient: 'bg-gradient-to-r from-blue-300 to-blue-500', icon: <Users size={20} /> },
  { name: 'BIO', description: 'Estudiantes de Biologia', users: 50, gradient: 'bg-gradient-to-r from-green-500 to-green-700', icon: <Users size={20} /> },
  { name: 'TCCE', description: 'Estudiante del tronco comun de ciencias exactas', users: 50, gradient: 'bg-gradient-to-r from-yellow-500 to-yellow-700', icon: <Users size={20} /> },
  { name: 'TCCN', description: 'Estudiante del tronco comun de ciencias naturales', users: 60, gradient: 'bg-gradient-to-r from-gray-500 to-gray-700', icon: <Users size={20} /> },
  {name: 'MYDCI',description:'Maestra  y Doctorado en Ciencias e Ingenieria ', users: 70, gradient: 'bg-gradient-to-r from-indigo-500 to-indigo-700', icon: <Users size={20} /> },
  {name:'MEZA',description: 'Manejo de ecosistemas en zonas aridas', users: 80, gradient: 'bg-gradient-to-r from-pink-500 to-pink-700', icon: <Users size={20} /> },
];

const chartData = units.map(unit => ({
  name: unit.name,
  users: unit.users,
  fill: unit.gradient.split(' ')[2].replace('from-', '').replace('-500', ''), // Extracting the color for simplicity
}));

const chartConfig = units.reduce((config, unit) => {
  config[unit.name] = {
    label: unit.name,
    color: unit.gradient.split(' ')[2].replace('from-', '').replace('-500', ''), // Extracting the color for simplicity
  };
  return config;
}, {});

const OrganizationalUnits = () => {
  const totalUsers = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.users, 0);
  }, []);

  return (
    <div className="m-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-9">
        {units.map((unit, index) => (
          <Card key={index} className="max-w-xs mb-4 shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl border border-gray-200">
            <CardHeader className={`${unit.gradient} p-4 flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                {unit.icon}
                <CardTitle className="text-lg font-bold text-white">{unit.name}</CardTitle>
              </div>
            </CardHeader>

            <CardFooter className="flex justify-between items-center p-4 bg-gray-100">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                Editar
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card className="flex flex-col mt-8">
        <CardHeader className="items-center pb-0">
          <CardTitle>Pie Chart - Donut with Text</CardTitle>
          <CardDescription>Organizational Units</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey="users"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalUsers.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Users
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total users for the organizational units
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OrganizationalUnits;