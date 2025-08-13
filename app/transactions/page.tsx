import { db } from "@/app/_lib/prisma";
import AddTransactionButton from "../_components/add-transaction-button";
import { DataTable } from "../_components/ui/data-table";
import { transactionColumns } from "./_columns";

const TransactionsPage = async () => {
  const transactions = await db.transaction.findMany({});
  return (
    <div className="space-y-6 p-6">
      {/* TITULO E BOTAO */}
      <div className="flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold">Transações</h1>
        <AddTransactionButton />
      </div>

      {/* TABELA */}
      <DataTable columns={transactionColumns} data={transactions} />
    </div>
  );
};

export default TransactionsPage;

//https://alunos.fullstackclub.com.br/area/produto/item/4413629
//48:24
