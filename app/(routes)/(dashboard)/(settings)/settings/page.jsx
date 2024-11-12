import { Settings } from "lucide-react";

async function getLogs() {
  const res = await fetch("http://localhost:5000/api/logs", { // Verificar que la URL es correcta
    cache: 'no-store'
  });
  const data = await res.json();
  return data;
}

const SettingsPage = async () => {
  const logs = await getLogs();

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

export default SettingsPage;