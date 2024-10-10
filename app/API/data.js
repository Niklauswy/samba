const usuarios = [
    {
        matricula: 123456,
        nome: 'Joao da Silva',
        carrera: 'CS',
        logsTotales: 76,
        ultimoLog: '2021-01-01 10:31:00'
    }, {
        matricula: 313131,
        nome: 'Maria da Silva',
        carrera: 'CS',
        logsTotales: 76,
        ultimoLog: '2021-01-01 10:31:00'
    },


];

export const fetchUsers = async () => {
    try {
        const res = await fetch("http://localhost:5000/api/users", {
            cache: "no-store",
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};