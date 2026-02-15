"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { UserForm } from "./user-table";
import { UserEditFormDialog } from "./user-edit-form-dialog";
import { UserToggleStatusAlert } from "./user-toggle-status-alert";
import { UserDeleteAlert } from "./user-delete-alert";

type Props = {
  user: UserForm;
};

export function UserActionsDropdown({ user }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm">
          <MoreHorizontal className="size-4" />
          <span className="sr-only">Ações</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <UserEditFormDialog user={user} dropdownClose={() => setOpen(false)} />
        <UserToggleStatusAlert
          onDropdownClose={() => setOpen(false)}
          user={user}
        />
        <UserDeleteAlert onDropdownClose={() => setOpen(false)} user={user} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
