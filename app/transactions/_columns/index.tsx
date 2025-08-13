"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleIcon, TrashIcon } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from "@/app/_constants/transactions";
import EditTransactionButton from "../_components/edit-transaction-button";

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "nome",
  },
  {
    accessorKey: "type",
    header: "tipo",
    cell: ({ row: { original: transaction } }) => {
      if (transaction.type === TransactionType.DEPOSIT) {
        return (
          <Badge className="bg-muted font-bold text-primary hover:bg-muted">
            <CircleIcon className="mr-2 fill-primary" size={10} />
            Depósito
          </Badge>
        );
      }

      if (transaction.type === TransactionType.EXPENSE) {
        return (
          <Badge className="font bold bg-danger bg-opacity-10 text-danger hover:bg-muted">
            <CircleIcon className="mr-2 fill-danger" size={10} />
            Despesa
          </Badge>
        );
      }
    },
  },
  {
    accessorKey: "category",
    header: "Categoria",
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category] || "N/A",
  },
  {
    accessorKey: "paymentMethod",
    header: "Método de Pagamento",
    cell: ({ row: { original: transaction } }) =>
      transaction.paymentMethod
        ? TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod]
        : "N/A",
  },
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
  },
  {
    accessorKey: "amount",
    header: "Valor",
    cell: ({ row: { original: transaction } }) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(Number(transaction.amount)),
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row: { original: transaction } }) => (
      <div className="space-x-1">
        <EditTransactionButton transaction={transaction} />
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <TrashIcon />
        </Button>
      </div>
    ),
  },
];
