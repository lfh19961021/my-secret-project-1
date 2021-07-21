import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';

import _ from 'lodash'
import { useStore } from './JSONEditor';

export default function BasicTable() {
    const json = useStore(state => state.json)
    const [headers, setHeaders] = React.useState([])
    const [rows, setRows] = React.useState([])
    const [selectedValue, setSelectedValue] = React.useState(headers[0]);
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    React.useEffect(() => {
        setHeaders(_.keys(json))
        setRows(_.valuesIn(json))
    }, [json])


    React.useEffect(() => {
        console.log('headers', headers);
        setSelectedValue(headers[0])
    }, [headers])
    React.useEffect(() => {
        console.log('rows', rows);
    }, [rows])

    return (
        <TableContainer component={Paper}>
            <Table aria-label="pricing table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {rows.map((row) => (
                            <TableCell align="center">
                                <Typography variant="h5" gutterBottom component="span">
                                    {row.label}
                                </Typography>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" gutterBottom component="span">
                                General
                            </Typography>
                        </TableCell>
                        {rows.map((row) => (
                            <TableCell align="center">{row.general ? <CheckIcon /> : <CloseIcon />}</TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" gutterBottom component="span">
                                Specialist
                            </Typography>
                        </TableCell>
                        {rows.map((row) => (
                            <TableCell align="center">{row.specialist ? <CheckIcon /> : <CloseIcon />}</TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" gutterBottom component="span">
                                Physiotherapy
                            </Typography>
                        </TableCell>
                        {rows.map((row) => (
                            <TableCell align="center">{row.physiotherapy ? <CheckIcon /> : <CloseIcon />}</TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" gutterBottom component="span">
                                Psychotherapy
                            </Typography>
                        </TableCell>
                        {rows.map((row) => (
                            <TableCell align="center">{row.psychotherapy ? <CheckIcon /> : <CloseIcon />}</TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            <Typography variant="subtitle1" gutterBottom component="span">
                                Consultation
                            </Typography>
                        </TableCell>
                        {rows.map((row) => (
                            <TableCell align="center">{row.consultation ? <CheckIcon /> : <CloseIcon />}</TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableCell component="th" scope="row" />
                        {rows.map((row, i) => (
                            <TableCell align="center">
                                <Grid container
                                    justifyContent="center"
                                    alignItems="center">
                                    <Grid item md={12} lg={2}>
                                        <Radio
                                            checked={selectedValue === headers[i]}
                                            onChange={handleChange}
                                            value={headers[i]}
                                            name="radio-buttons"
                                            inputProps={{ 'aria-label': headers[i] }}
                                            label={row.label}
                                        />
                                    </Grid>
                                    <Grid item sm={12} md={6} lg={6}>
                                        <Typography variant="h5" gutterBottom component="span">
                                            {`${row.unit}`} {`$${row.monthlyPricing}`}
                                        </Typography>
                                    </Grid>
                                    <Grid item sm={12} md={10} lg={4}>
                                        <Typography variant="subtitle2" gutterBottom component="span">
                                            / Month
                                        </Typography>
                                    </Grid>
                                </Grid>

                            </TableCell>
                        ))}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer >
    );
}