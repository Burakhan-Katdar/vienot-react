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
import PartnersTableHead from './PartnersTableHead';
import Api from 'app/fuse-configs/Api';
import { message, notification } from 'antd';
import { useTranslation } from 'react-i18next';

function PartnersTable(props) {
	const dispatch = useDispatch();
	const { t } = useTranslation('partnersApp');
	const products = useSelector(selectProducts);

	const [loading, setLoading] = useState(true);
	const [partners, setPartners] = useState([]);
	const [data, setData] = useState(products);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [open, setOpen] = useState(false);
	const [selectedPartner, setSelectedPartner] = useState({});

	const handleAccept = state => {
		Api.updateCompanyState(selectedPartner.user_id, state)
			.then(response => {
				message.success('Successfull!');
				setOpen(false);
				getCompanies();
			})
			.catch(err => console.log('err: ', err));
	};

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		dispatch(getProducts()).then(() => setLoading(false));
	}, [dispatch]);

	const getCompanies = () => {
		Api.getCompanies().then(response => {
			setPartners(response.data.data);
		});
	};

	useEffect(() => {
		getCompanies();
		setData(products);
	}, [products]);

	function handleClick(item) {
		if (item.competition_state === 5) {
			props.navigate(
				`/apps/partners/${item.competition_id}/${item.competition_name
					.replace(/([a-z])([A-Z])/g, '$1-$2')
					.replace(/[\s_]+/g, '-')
					.toLowerCase()}#finalize`
			);
		} else if (item.competition_state === 3) {
			Api.changeCompetitionState(item.competition_id, 4).then(() => {
				notification.success({
					message: t('LISTED'),
					description: t('SUCCESS')
				});
				props.navigate(
					`/apps/partners/${item.competition_id}/${item.competition_name
						.replace(/([a-z])([A-Z])/g, '$1-$2')
						.replace(/[\s_]+/g, '-')
						.toLowerCase()}`
				);
			});
		} else if (
			item.competition_state === 4 &&
			new Date(item.competition_end_date.replace(' ', 'T')).getTime() < new Date().getTime()
		) {
			Api.changeCompetitionState(item.competition_id, 5).then(() => {
				notification.success({
					message: t('AUTO_FINISH_ACTION_TITLE'),
					description: t('AUTO_FINISH_ACTION_DESC')
				});
				props.navigate(
					`/apps/partners/${item.competition_id}/${item.competition_name
						.replace(/([a-z])([A-Z])/g, '$1-$2')
						.replace(/[\s_]+/g, '-')
						.toLowerCase()}#finalize`
				);
			});
		} else {
			props.navigate(
				`/apps/partners/${item.competition_id}/${item.competition_name
					.replace(/([a-z])([A-Z])/g, '$1-$2')
					.replace(/[\s_]+/g, '-')
					.toLowerCase()}`
			);
		}
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

	if (partners.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					{t('NO_PARTNERS')}
				</Typography>
			</motion.div>
		);
	}

	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<PartnersTableHead rowCount={data.length} />

					<TableBody>
						{partners.map((partner, key) => {
							return (
								<TableRow
									className="h-72 cursor-pointer"
									hover
									role="checkbox"
									tabIndex={-1}
									key={partner.id}
									onClick={event => {
										setOpen(true);
										setSelectedPartner(partner);
										// handleClick(partner)
									}}
								>
									<TableCell className="w-40 md:w-64 text-center" padding="none">
										{key + 1}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{partner.company_name}
									</TableCell>

									<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
										{partner.email}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
										{partner.company_gsm_phone_number}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
										{partner.company_twitter_username}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
										{partner.status === 1 ? (
											<Button className="text-green">Onaylı</Button>
										) : partner.status === 2 ? (
											<Button className="text-red">Reddedildi</Button>
										) : (
											<Button className="text-blue">Onay Bekliyor</Button>
										)}
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
				count={partners.length}
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

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{t('INCELE')}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<Typography gutterBottom>Ad Soyad: {selectedPartner.user_name}</Typography>
						<Typography gutterBottom>{selectedPartner.social_media_adresses}</Typography>
						<Typography gutterBottom>Adres: {selectedPartner.company_address}</Typography>
						<Typography gutterBottom>Website: {selectedPartner.company_website}</Typography>
						<Typography gutterBottom>
							Tarih:{' '}
							{selectedPartner.created_at !== undefined
								? selectedPartner.created_at.replace('T', ' ').split('.')[0]
								: null}
						</Typography>
						<Typography gutterBottom>
							Twitter:{' '}
							<a target="_blank" href={'https://twitter.com/' + selectedPartner.company_twitter_username}>
								Tıkla
							</a>
						</Typography>
						<Typography gutterBottom>
							Durum: {selectedPartner.status === 1 ? 'Onaylı' : 'Onaylı Değil'}
						</Typography>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button color="error" onClick={() => handleAccept(2)} autoFocus>
						Engelle
					</Button>
					<Button color="success" onClick={() => handleAccept(1)} autoFocus>
						Onayla
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default withRouter(PartnersTable);
