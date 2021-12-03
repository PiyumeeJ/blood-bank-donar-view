import React, {useState, useEffect} from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  function historyData(date, location) {
    return {date, location}
  }
  
  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

  // const historyRows = [
  //   historyData('08 October 2021', 'Viharamahadewi Park, Colombo'),
  //   historyData('21 October 2021', 'St.Luvis Church, Thangalla'),
  //   historyData('08 September 2021', 'Raja Hotel, Wellawatta'),
  //   historyData('08 October 2021', 'Sujatha School, Matara')
  // ];

function History() {

    const classes = useStyles();

    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {

      let axiosConfig = {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      };

           axios
            .get("http://localhost:8080/donor/history", axiosConfig)
            .then((response) => {
                console.log("made a call ");
              console.log(response.data);
              setHistoryData(response.data);
            });
            console.log("sample add inner");
      }, []);

    return (
      <>
      
      <h3>Complete History Of Your Blood Donations</h3><br/>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Blood Donated Date</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {historyData.map((row) => (
                <StyledTableRow key={row.date}>
                <StyledTableCell component="th" scope="row">
                    {row.date}
                </StyledTableCell>
                <StyledTableCell>{row.location}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </>
    )
}

export default History
