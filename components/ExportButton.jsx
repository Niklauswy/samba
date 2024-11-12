
'use client'
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function ExportButton({ data, columns, filename = 'export' }) {
    const exportToCSV = () => {
        const headers = columns.map(col => col.label);
        const rows = data.map(item =>
            columns.map(col => item[col.key] || '')
        );

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(value => `"${value}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${filename}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const exportToPDF = () => {
        const doc = new jsPDF();
        const headers = columns.map(col => col.label);
        const rows = data.map(item =>
            columns.map(col => item[col.key] || '')
        );

        doc.autoTable({
            head: [headers],
            body: rows,
            styles: { fontSize: 8 },
            theme: 'grid',
            headStyles: { fillColor: [22, 160, 133] },
        });

        doc.save(`${filename}.pdf`);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-dashed">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 7l-5 5m0 0l5 5m-5-5h12m-7-5v10" />
                    </svg>
                    Exportar
                    <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onSelect={exportToCSV}>
                    Exportar como CSV
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={exportToPDF}>
                    Exportar como PDF
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}