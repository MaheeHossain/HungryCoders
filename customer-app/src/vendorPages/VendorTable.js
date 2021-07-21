import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
    },
  }));

const columns = [
    { id: 'name', label: 'Order No', minWidth: 150 },
    { id: 'code', label: 'Customer Name', minWidth: 100 },
    {
        id: 'population',
        label: 'Items',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Time Remaining',
        minWidth: 150,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Actions',
        minWidth: 150,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];

const VendorTable = ({orderList, status, setTabPage, index, refreshTable}) => {
    
    const classes = useStyles();
    
    const changeOrderStatus = (orderId) => {
        // Change the status
        axios.get("/order/setStatus/" + orderId + "/" + status)
        .then(response => {
            console.log(response);
            if (response.status === 200) {
                // Refresh
                setTabPage(index)
                refreshTable();
            }
        }).catch(error => console.log(error))
    }
    
    return (
        <Paper className={classes.root}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {orderList && orderList.map((order) => {
                  return (
                    <TableRow>
                      <TableCell>
                        {order._id}
                      </TableCell>
                      <TableCell>
                        {order.name}
                      </TableCell>
                      <TableCell>
                        <div>
                        {order.orders.map((item) => {
                          return (
                            <p>{item.count} x {item.name}</p>
                          )
                        })}
                        </div>
                      </TableCell>
                      <TableCell>
                        {order.orderTime}
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => changeOrderStatus(order._id)}>
                            {status.toUpperCase()}
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={orderList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          /> */}
        </Paper>
    )
} 

  
  

export default VendorTable;