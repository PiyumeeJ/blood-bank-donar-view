import React, {useState, useEffect} from 'react'
import {withStyles, makeStyles } from '@material-ui/core/styles';
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
      minWidth: 700,
    },
  });
  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  function bloodCampData(date, details, startTime, endTime, location) {
    return {date, details, startTime, endTime, location}
  }

  const detailsRows = [
    bloodCampData('09 September 2021', 'Blood donation camp was hosted by CBC Club', '10.00 AM', '2.00 PM', 'Priyadarshanarama Temple, Dehiwala'),
    bloodCampData('01 August 2021', '4th Aniversary blood danation camp organized by Church', '8.00 AM', '12.00 AM', 'St. Mary Church, Dehiwala'),
    bloodCampData('08 October 2021', 'Lohitha Puja blood donation camp organized by Association of public administration', '8.00 AM', '12.00 AM', 'Apeksha Hospital, Maharagama'),
    bloodCampData('21 October 2021', 'Kandy blood donation camp organized by Kandy Fashion', '8.00 AM', '3.00 PM', 'Kandy Showroom, Kadawatha'),
    bloodCampData('08 September 2021', 'blood donation camp organized by Rahula College', '9.00 AM', '2.00 PM', 'Rahula College, Katugasthota')
  ];
  
  // const rows = [
  //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  //   createData('Eclair', 262, 16.0, 24, 6.0),
  //   createData('Cupcake', 305, 3.7, 67, 4.3),
  //   createData('Gingerbread', 356, 16.0, 49, 3.9),
  // ];

function CampDetails() {

    const classes = useStyles();

    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {

      let axiosConfig = {
        headers: {
          'x-auth-token': localStorage.getItem('token')
        }
      };
           axios
            .get("http://localhost:8080/donor/camps", axiosConfig)
            .then((response) => {
                console.log("made a call ");
              console.log(response.data);
              setHistoryData(response.data);
            });
            console.log("sample add inner");
            console.log("sample add");
      }, []);


    return (
        // <TableContainer component={Paper}>
        // <Table className={classes.table} aria-label="simple table">
        //     <TableHead>
        //     <TableRow>
        //         <StyledTableCell>Dessert (100g serving)</StyledTableCell>
        //         <StyledTableCell align="right">Calories</StyledTableCell>
        //         <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
        //         <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
        //         <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
        //     </TableRow>
        //     </TableHead>
        //     <TableBody>
        //     {rows.map((row) => (
        //         <StyledTableRow key={row.name}>
        //         <StyledTableCell component="th" scope="row">
        //             {row.name}
        //         </StyledTableCell>
        //         <StyledTableCell align="right">{row.calories}</StyledTableCell>
        //         <StyledTableCell align="right">{row.fat}</StyledTableCell>
        //         <StyledTableCell align="right">{row.carbs}</StyledTableCell>
        //         <StyledTableCell align="right">{row.protein}</StyledTableCell>
        //         </StyledTableRow>
        //     ))}
        //     </TableBody>
        // </Table>
        // </TableContainer>
        <>
        <h3>Organized blood donataion camp details</h3><br/>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Blood Donation Camp Details</StyledTableCell>
                <StyledTableCell>Start Time</StyledTableCell>
                <StyledTableCell>End Time</StyledTableCell>
                <StyledTableCell>Location</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {historyData.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="left">{row.date}</StyledTableCell>
                <StyledTableCell align="left" component="th" scope="row">
                    {row.campDetail}
                </StyledTableCell>
                <StyledTableCell align="left">{row.startTime}</StyledTableCell>
                <StyledTableCell align="left">{row.endTime}</StyledTableCell>
                <StyledTableCell align="left">{row.campLocation}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        </>
    )
}

export default CampDetails
