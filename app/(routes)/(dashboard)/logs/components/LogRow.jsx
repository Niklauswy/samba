import React from 'react';
import { TableCell, TableRow } from "@/components/ui/table";

const LogRow = ({ log }) => {
    console.log('Rendering log:', log); // Añadido para depuración

    return (
        <TableRow>
            <TableCell>{log.user}</TableCell>
            <TableCell>{log.ip}</TableCell>
            <TableCell>{log.computadora}</TableCell>
            <TableCell>{log.laboratorio}</TableCell>
            <TableCell>{log.event}</TableCell>
            <TableCell>{log.date}</TableCell>
        </TableRow>
    );
};

export default LogRow;