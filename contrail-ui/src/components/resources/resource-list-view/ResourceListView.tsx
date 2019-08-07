import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import clsx from "clsx";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import useStyles from "./resourceListStyles";
import * as types from "./resourceListView.types";

const headRows: types.IHeadRow[] = [
    { id: "name", numeric: false, label: "Name" },
    { id: "owner", numeric: false, label: "Owner" },
    { id: "dateCreated", numeric: false, label: "Date Created" },
    { id: "size", numeric: true, label: "File Size" },
];

function EnhancedTableHead(props: types.IEnhancedTableProps) {
    const classes = useStyles();
    const { onSelectAllClick, numSelected, rowCount } = props;

    const renderHeadRows = headRows.map((row) => (
        <TableCell
            key={row.id}
            className={classes.column}
            align={row.numeric ? "right" : "left"}
            padding="default"
        >
            {row.label}
        </TableCell>
    ));

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        color="default"
                        onChange={onSelectAllClick}
                        inputProps={{ "aria-label": "Select all desserts" }}
                    />
                </TableCell>
                {renderHeadRows}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    rowCount: PropTypes.number.isRequired,
};

export default function EnhancedTable(props: types.IResourceListProps) {
    const classes = useStyles();
    const [selected, setSelected] = React.useState<string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const isSelected = (name: string) => selected.includes(name);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.display.length - page * rowsPerPage);
    const rowHeight = 49;

    const renderEmptyRows = emptyRows > 0 && (
        <TableRow style={{ height: rowHeight * emptyRows }}>
            <TableCell colSpan={6} />
        </TableRow>
    );

    const renderResourceRows =
        props.display.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
                const isItemSelected = isSelected(row.generation);

                function handleClickWrapper(event: React.MouseEvent<unknown>) {
                    handleClick(event, row.generation);
                }

                return (
                    <TableRow
                        hover={true}
                        onClick={handleClickWrapper}
                        role="checkbox"
                        tabIndex={-1}
                        key={row.generation}
                        selected={isItemSelected}
                    >
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={isItemSelected}
                                color="default"
                            />
                        </TableCell>
                        <TableCell
                            key="name"
                            align="left"
                            className={clsx(classes.name, classes.column)}
                        >
                            {row.name}
                        </TableCell>
                        <TableCell
                            key="owner"
                            align="left"
                            className={classes.column}
                        >
                            {row.owner.displayName}
                        </TableCell>
                        <TableCell
                            key="timeCreated"
                            align="left"
                            className={classes.column}
                        >
                            {moment(row.timeCreated).format("MMMM Do YYYY")}
                        </TableCell>
                        <TableCell
                            key="size"
                            align="right"
                            className={classes.column}
                        >
                            {Math.round(row.size / 1000) + " KB"}
                        </TableCell>
                    </TableRow>
                );
            });

    function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            const newSelecteds = props.display.map((n) => n.generation);
            setSelected(newSelecteds);
        } else {
            setSelected([]);
        }
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
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    console.log(props.display);
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
                            rowCount={props.display.length}
                        />
                        <TableBody>
                            {renderResourceRows}
                            {renderEmptyRows}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.display.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}
