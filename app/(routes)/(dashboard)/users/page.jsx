import { fetchUsers } from '@/app/API/data';
import UserTable from '@/components/UserTable';

async function getInitialUsers() {
  return await fetchUsers();
}

export default async function UsersPage() {
  const initialUsers = await getInitialUsers();

  return (
      <div>
        <h1>Usuarios</h1>
        <UserTable initialUsers={initialUsers} />
      </div>
  );
}