"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  DownloadIcon,
  Loader2,
  Mail,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { useState, useTransition } from "react";
import { DeleteInvoice, MarkAsPaidAction } from "../actions";
// import DeleteInvoiceBtn from "./DeleteInvoiceBtn";

interface iAppProps {
  id: string;
  status: string;
}

const InvoiceMenuActions = ({ id, status }: iAppProps) => {
  const [isDialogBoxOpen, setIsDialogBoxOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSendReminder = () => {
    toast.promise(
      fetch(`/api/email/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        loading: "Sending reminder email...",
        success: "Reminder email sent successfully",
        error: "Failed to send reminder email",
      }
    );
  };

  const handleDeleteInvoice = async () => {
    startTransition(async () => {
      try {
        await DeleteInvoice(id);
        toast.success("Invoice Deleted");
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete");
      } finally {
        setIsDialogBoxOpen(false);
      }
    });
  };

  const handleMarkInvoicePaid = async () => {
    startTransition(async () => {
      try {
        await MarkAsPaidAction(id);
        toast.success("Invoice Paid");
      } catch (error) {
        console.log(error);
        // toast.error("Failed to mark");
      } finally {
        setIsDialogBoxOpen(false);
      }
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary">
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col ">
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/invoices/${id}`}>
            <Pencil className="size-4 mr-2" /> Edit Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/api/invoice/${id}`} target="_blank">
            <DownloadIcon className="size-4 mr-2" /> Download Invoice
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleSendReminder}>
          <Mail className="size-4 mr-2" /> Reminder Email
        </DropdownMenuItem>

        {/* Delete invoice button here  */}
        <DropdownMenuItem asChild>
          <Dialog open={isDialogBoxOpen} onOpenChange={setIsDialogBoxOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Trash className="size-4 mr-2" /> Delete Invoice
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Invoice</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this invoice? This action
                  cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-between">
                <Button
                  onClick={() => setIsDialogBoxOpen(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button onClick={handleDeleteInvoice} variant="destructive">
                  {isPending ? (
                    <>
                      {" "}
                      <Loader2 className="size-4 mr-2 animate-spin" /> Please
                      wait...{" "}
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </DropdownMenuItem>

        {/* Paid/Pending Button */}
        {status !== "PAID" && (
          <DropdownMenuItem asChild>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <CheckCircle className="size-4 mr-2" /> Mark as Paid
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Mark as paid</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to mark this invoice as paid? This
                    action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-between">
                  <Button
                    onClick={() => setIsDialogBoxOpen(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleMarkInvoicePaid}>
                    {isPending ? (
                      <>
                        {" "}
                        <Loader2 className="size-4 mr-2 animate-spin" /> Please
                        wait...{" "}
                      </>
                    ) : (
                      "Mark as paid"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InvoiceMenuActions;
