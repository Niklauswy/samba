import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import UserRow from "./UserRow"

const UserTable = ({ users }) => (
  <Card x-chunk="dashboard-06-chunk-0">
    <CardHeader>
      <CardTitle>Usuarios</CardTitle>
      <CardDescription>Usuarios en el activde directory</CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell"><span className="sr-only">Image</span></TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Carrera</TableHead>
            <TableHead className="hidden md:table-cell">Total logs</TableHead>
            <TableHead className="hidden md:table-cell">Matricula</TableHead>
            <TableHead>Ultimo inicio<span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => <UserRow key={user.id} user={user} />)}
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter>
      <div className="text-xs text-muted-foreground">
        Showing <strong>{users.length}</strong> users
      </div>
    </CardFooter>
  </Card>
)

export default UserTable