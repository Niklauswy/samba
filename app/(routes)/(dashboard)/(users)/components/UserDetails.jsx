import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const UserDetails = ({ user, isOpen, onClose }) => {
  const [password, setPassword] = useState("");

  if (!user) return null;

  const handlePasswordChange = () => {
    // Handle password change logic here
    console.log("Password changed to:", password);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>Modify the user details below.</DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <Input type="text" value={user.username} className="mt-1 block w-full bg-gray-100" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Input type="text" value={user.name} className="mt-1 block w-full bg-gray-100" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Group</label>
              <Input type="text" value={user.group} className="mt-1 block w-full bg-gray-100" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Organizational Unit (OU)</label>
              <Input type="text" value={user.ou} className="mt-1 block w-full bg-gray-100" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Last Login</label>
              <Input type="text" value={user.lastLogin} className="mt-1 block w-full bg-gray-100" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Logins</label>
              <Input type="text" value={user.totalLogs} className="mt-1 block w-full bg-gray-100" readOnly />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full"
              />
            </div>
            <div className="mt-4">
              <Button onClick={handlePasswordChange}>Save Changes</Button>
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetails;