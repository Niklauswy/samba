
export async function GET(request) {
    // Lógica para obtener los logs
    const logs = await obtenerLogs(); // Implementa esta función según tus necesidades
    return new Response(JSON.stringify(logs), {
        headers: { 'Content-Type': 'application/json' },
    });
}