async function getLogs() {
  const res = await fetch("http://localhost:5000/api/logs", { // Verificar que la URL es correcta
    cache: 'no-store'
  });
  const data = await res.json();
  return data;
}

const Page = async () => {
  const logs = await getLogs();
  console.log('Logs from settings:', logs); // Añadido para comparar los logs

  return (
      <div>
        <ul>
          {logs.map((log, index) => (
              <li key={index}>{JSON.stringify(log)}</li>
          ))}
        </ul>
      </div>
  );
}

export default Page;