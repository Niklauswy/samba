import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import UserRow from "./UserRow";
import UserDialog from "./UserDetails";

const UserTable = ({ users }) => {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (sortKey) {
      const order = sortOrder === 'asc' ? 1 : -1;
      if (a[sortKey] < b[sortKey]) return -1 * order;
      if (a[sortKey] > b[sortKey]) return 1 * order;
      return 0;
    }
    return 0;
  });

  const getSortIndicator = (key) => {
    if (sortKey === key) {
      return sortOrder === 'asc' ? '↑' : '↓';
    }
    return '↕';
  };

  const openDialog = (user) => {
    setSelectedUser(user);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setSelectedUser(null);
    setIsDialogOpen(false);
  };

  return (
    <>
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
                <TableHead>Usuario</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Carrera</TableHead>
                <TableHead className="hidden md:table-cell" onClick={() => handleSort('totalLogs')}>
                  Total logs {getSortIndicator('totalLogs')}
                </TableHead>
                <TableHead className="hidden md:table-cell">Grupo</TableHead>
                <TableHead onClick={() => handleSort('lastLogin')}>
                  Ultimo inicio {getSortIndicator('lastLogin')}<span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map(user => <UserRow key={user.id} user={user} onEdit={() => openDialog(user)} />)}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>{users.length}</strong> users
          </div>
        </CardFooter>
      </Card>
      <UserDialog user={selectedUser} isOpen={isDialogOpen} onClose={closeDialog} />
    </>
  );
};

export default UserTable;