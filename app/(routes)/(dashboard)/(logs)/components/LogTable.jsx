import React from 'react';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import LogRow from "./LogRow";

const LogTable = ({logs}) => {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Logs</CardTitle>
                <CardDescription>Conexiones y desconexiones de usuarios</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Usuario</TableHead>
                            <TableHead>IP de la computadora</TableHead>
                            <TableHead>Evento</TableHead>
                            <TableHead>Fecha</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {logs.map(log => <LogRow key={log.id} log={log}/>)}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <div className="text-xs text-muted-foreground">
                    Mostrando <strong>{logs.length}</strong> logs
                </div>
            </CardFooter>
        </Card>
    );
};

export default LogTable;