import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import { createStyles, lighten, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import PropTypes from "prop-types";
import React from "react";

interface Data {
    name: string;
    owner: string;
    dateCreated: String,
    fileSize: number;
}

function createData(
    name: string,
    owner: string,
    dateCreated: String,
    fileSize: number,
): Data {
    return { name, owner, dateCreated, fileSize };
}

const rows = [
    createData("Test.txt", "Oliver Song", "Sunday", 16),
    createData("Test.txt", "Oliver Song", "Sunday", 16),
    createData("Test.txt", "Oliver Song", "Sunday", 16),
    createData("Test.txt", "Oliver Song", "Sunday", 16),
    createData("Test.txt", "Oliver Song", "Sunday", 16),
    createData("Test.txt", "Oliver Song", "Sunday", 16),
    createData("Test.txt", "Oliver Song", "Sunday", 16),
    createData("Test.txt", "Oliver Song", "Sunday", 16),
];

interface IHeadRow {
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headRows: IHeadRow[] = [
    { id: "name", numeric: false, label: "Name" },
    { id: "owner", numeric: false, label: "Owner" },
    { id: "dateCreated", numeric: false, label: "Date Created" },
    { id: "fileSize", numeric: true, label: "File Size" },
];

interface IEnhancedTableProps {
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    rowCount: number;
}

function EnhancedTableHead(props: IEnhancedTableProps) {
    const { onSelectAllClick, numSelected, rowCount } = props;

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "Select all desserts" }}
                    />
                </TableCell>
                {headRows.map(row => (
                    <TableCell
                        key={row.id}
                        align={row.numeric ? "right" : "left"}
                        padding="default"
                    >
                        {row.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        paper: {
            width: "100%",
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        tableWrapper: {
            overflowX: "auto",
        },
    }),
);

export default function EnhancedTable() {
    const classes = useStyles();
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    }

    function handleClick(event: React.MouseEvent<unknown>, name: string) {
        const selectedIndex = selected.indexOf(name);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    }

    function handleChangePage(event: unknown, newPage: number) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(+event.target.value);
    }

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <div className={classes.tableWrapper}>
                    <Table
                        className={classes.table}
                        size="medium"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            onSelectAllClick={handleSelectAllClick}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover={true}
                                            onClick={event => handleClick(event, row.name)}
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                />
                                            </TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">{row.owner}</TableCell>
                                            <TableCell align="left">{row.dateCreated}</TableCell>
                                            <TableCell align="right">{row.fileSize}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}