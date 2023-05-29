import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { getProducts, selectProducts } from '../store/competitionsSlice';
import InvitationsTableHead from './InvitationsTableHead';
import Api from 'app/fuse-configs/Api';
import { notification } from 'antd';
import { useTranslation } from 'react-i18next';

function InvitationsTable(props) {
	const dispatch = useDispatch();
	const { t } = useTranslation('invitaionsApp');
	const products = useSelector(selectProducts);

	const [loading, setLoading] = useState(true);
	const [invitations, setInvitations] = useState([]);
	const [data, setData] = useState(products);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	useEffect(() => {
		dispatch(getProducts()).then(() => setLoading(false));
	}, [dispatch]);

	const getCompanies = () => {
		Api.getInvitations().then(response => {
			setInvitations(response.data.data);
		});
	};

	useEffect(() => {
		getCompanies();
		setData(products);
	}, [products]);

	function handleClick(item) {
		props.navigate(`/apps/invitations/${item.invitation_id}/${item.code}`);
	}

	function handleChangePage(event, value) {
		setPage(value);
	}

	function handleChangeRowsPerPage(event) {
		setRowsPerPage(event.target.value);
	}

	if (loading) {
		return <FuseLoading />;
	}

	if (invitations.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					{t('NO_INVITATONS')}
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<InvitationsTableHead rowCount={data.length} />

					<TableBody>
						{invitations.map((invitation, key) => {
							return (
								<TableRow
									className="h-72 cursor-pointer"
									hover
									role="checkbox"
									tabIndex={-1}
									key={invitation.id}
									onClick={event => handleClick(invitation)}
								>
									<TableCell className="w-40 md:w-64 text-center" padding="none">
										{key + 1}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{invitation.code}
									</TableCell>

									<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
										{invitation.name}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
										{invitation.right}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</FuseScrollbars>

			<TablePagination
				className="shrink-0 border-t-1"
				component="div"
				count={invitations.length}
				rowsPerPage={rowsPerPage}
				page={page}
				backIconButtonProps={{
					'aria-label': 'Previous Page'
				}}
				nextIconButtonProps={{
					'aria-label': 'Next Page'
				}}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</div>
	);
}

export default withRouter(InvitationsTable);
