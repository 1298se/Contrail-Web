import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { filterTrashResources, mapIdsToResources } from "../../../firebase/controllers/filesController";
import { setSelectedResources } from "../../../store/actions/resourceActions";
import { IResourceSetSelected } from "../../../store/actions/resourceActions.types";
import { IAppReduxState } from "../../../store/store.types";
import { IResourceModel } from "../../../types/resource.types";
import { ResourcePages } from "../resourceFrame.types";
import useStyles from "./resourceListStyles";
import * as types from "./resourceListView.types";

const headRows: types.IHeadRow[] = [
    { id: "name", numeric: false, label: "Name" },
    { id: "owner", numeric: false, label: "Owner" },
    { id: "dateCreated", numeric: false, label: "Date Created" },
    { id: "size", numeric: true, label: "File Size" },
];

function EnhancedTableHead(props: types.IEnhancedTableProps) {
    const { onSelectAllClick, numSelected, rowCount } = props;

    const renderHeadRows = headRows.map((row) => (
        <TableCell
            key={row.id}
            align={row.numeric ? "right" : "left"}
            padding="default"
        >
            <Typography variant="caption" noWrap={true}>
                {row.label}
            </Typography>
        </TableCell>
    ));

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount === 0 ? false : numSelected === rowCount}
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

function EnhancedTable(props: types.ResourceListProps) {
    const classes = useStyles();
    const selected = props.selectedResources;

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const isSelected = (generation: string) => selected.some((res) => res.generation === generation);

    const displayResources = mapIdsToResources((() => {
        switch (props.page) {
            case ResourcePages.FILES:
                return filterTrashResources(props.userResources.root.map((res) => res.generation));
            case ResourcePages.FAVOURITES:
                return filterTrashResources(props.userResources.favourites);
            case ResourcePages.SHARED:
                return filterTrashResources(
                    props.userResources.sharedBy.concat(props.userResources.sharedTo));
            case ResourcePages.TRASH:
                return props.userResources.trash;
            default:
                return [];
        }
    })());

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, displayResources.length - page * rowsPerPage);
    const rowHeight = 50.67;

    const isFavourited = (generation: string): boolean =>
        props.userResources.favourites.includes(generation);

    React.useEffect(() => {
        return (() => {
            props.setSelected([]);
        });
    }, []);

    const renderEmptyRows = emptyRows > 0 && (
        <TableRow style={{ height: rowHeight * emptyRows }}>
            <TableCell colSpan={6} />
        </TableRow>
    );

    const renderResourceRows =
        displayResources.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((res) => {
                const isItemSelected = isSelected(res.generation);

                function handleClickWrapper(event: React.MouseEvent<unknown>) {
                    handleClick(event, res);
                }

                return (
                    <TableRow
                        hover={true}
                        onClick={handleClickWrapper}
                        role="checkbox"
                        tabIndex={-1}
                        key={res.generation}
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
                            className={classes.name}
                        >
                            <Grid
                                container={true}
                                direction="row"
                                alignItems="center"
                                wrap="nowrap"
                            >
                                <Grid item={true} zeroMinWidth={true}>
                                    <Typography noWrap={true}>
                                        {res.name}
                                    </Typography>
                                </Grid>
                                <Grid item={true}>
                                    {isFavourited(res.generation) ? <FavoriteIcon className={classes.icon} /> : null}
                                </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell
                            key="owner"
                            align="left"
                        >
                            <Typography noWrap={true}>
                                {res.owner.displayName}
                            </Typography>
                        </TableCell>
                        <TableCell
                            key="timeCreated"
                            align="left"
                        >
                            <Typography noWrap={true}>
                                {moment(res.timeCreated).format("MMMM Do YYYY")}
                            </Typography>
                        </TableCell>
                        <TableCell
                            key="size"
                            align="right"
                        >
                            <Typography noWrap={true}>
                                {Math.round(res.size / 1000) + " KB"}
                            </Typography>
                        </TableCell>
                    </TableRow>
                );
            });

    function handleSelectAllClick(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            const newSelecteds: IResourceModel[] = displayResources;
            props.setSelected(newSelecteds);
        } else {
            props.setSelected([]);
        }
    }

    function handleClick(event: React.MouseEvent<unknown>, resource: IResourceModel) {
        const selectedIndex = selected.map((res) => res.generation).indexOf(resource.generation);
        let newSelected: IResourceModel[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, resource);
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
        props.setSelected(newSelected);
    }

    function handleChangePage(event: unknown, newPage: number) {
        setPage(newPage);
    }

    function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

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
                            rowCount={displayResources.length}
                        />
                        <TableBody>
                            {renderResourceRows}
                            {renderEmptyRows}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    colSpan={6}
                                    count={displayResources.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onChangePage={handleChangePage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </Paper>
        </div>
    );
}

const mapStateToProps = (state: IAppReduxState): types.IResourceListStateProps => {
    return {
        selectedResources: state.resourceState.selectedResources,
        userResources: state.resourceState.userResources,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<IResourceSetSelected>): types.IResourceListDispatchProps => {
    return {
        setSelected: (resources: IResourceModel[]) => dispatch(setSelectedResources(resources)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);
