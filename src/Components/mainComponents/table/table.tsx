import "./table.css";
import Paper from '@mui/material/Paper';
import Tables from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import React, { useEffect, useState } from "react";
import axios from "axios";
import globals from "../../utils/Globals";
import PaymentData from "../../model/PaymentD";


interface Column {
    id: 'title' | 'amount' | 'categories' | 'purchase_date' | 'receipt';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
  }
  
  const columns: Column[] = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'amount', label: 'Amount', minWidth: 100 },
    {
      id: 'categories',
      label: 'Categories',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'purchase_date',
      label: 'Purchase date',
      minWidth: 170,
      align: 'right',
    },
    {
      id: 'receipt',
      label: 'Receipt',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toFixed(2),
    },
  ];

function Table({type}: any): JSX.Element {
    let data;

    useEffect(()=>{
        axios.get(globals.urls.customer+"getCustomerPayments").then((response)=>{
            setCustomerPayments(response.data);
        }).catch(error=>{console.log(error)});

        axios.get(globals.urls.customer+"getOnlyPayment").then((response)=>{
            setCustomerOnlyPayment(response.data);
        }).catch(error=>{console.log(error)});

        axios.get(globals.urls.customer+"getOnlyIncomes").then((response)=>{
            setCustomerIncomes(response.data);
        }).catch(error=>{console.log(error)});

        },[]);

    const [customerPayments, setCustomerPayments] = useState([new PaymentData()]);
    const [customerIncomes, setCustomerIncomes] = useState([new PaymentData()]);
    const [customerOnlyPayments, setCustomerOnlyPayment] = useState([new PaymentData()]);

    let rows = [{title: "", amount: 0, categories: "", purchase_date: "", receipt:"", id:0}];
    

    switch (type) {
        case "allPayments":
            if (customerPayments.length!==0){
                for (let j = 0; j<customerPayments.length; j++){
                    rows[j] = {title: customerPayments[j].title, amount: customerPayments[j].amount, categories: customerPayments[j].categories,
                        purchase_date: customerPayments[j].purchase_date, receipt: customerPayments[j].receipt, id: customerPayments[j].id}
                }
            };
            break;
        case "onlyIncomes":
            if (customerIncomes.length!==0){
                for (let j = 0; j<customerIncomes.length; j++){
                    rows[j] = {title: customerIncomes[j].title, amount: customerIncomes[j].amount, categories: customerIncomes[j].categories,
                        purchase_date: customerIncomes[j].purchase_date, receipt: customerIncomes[j].receipt, id: customerIncomes[j].id}
                }
            };
            break;
        case "onlyPayments":
            if (customerOnlyPayments.length!==0){
                for (let j = 0; j<customerOnlyPayments.length; j++){
                    rows[j] = {title: customerOnlyPayments[j].title, amount: customerOnlyPayments[j].amount, categories: customerOnlyPayments[j].categories,
                        purchase_date: customerOnlyPayments[j].purchase_date, receipt: customerOnlyPayments[j].receipt, id: customerOnlyPayments[j].id}
                }
            };
            break;
    }

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    return (
        <div className="table">
            <Paper sx={{ width: '100%' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Tables stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        <TableCell align="center" colSpan={2}>
                            Main
                        </TableCell>
                        <TableCell align="center" colSpan={3}>
                            Details
                        </TableCell>
                        </TableRow>
                        <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ top: 57, minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                {columns.map((column) => {
                                const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                );
                                })}
                            </TableRow>
                            );
                        })}
                    </TableBody>
                    </Tables>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </Paper>
        </div>
    );
}

export default Table;
