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
import clsx from 'clsx';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Picker from 'emoji-picker-react';
import { useDispatch, useSelector } from 'react-redux';
import withRouter from '@fuse/core/withRouter';
import FuseLoading from '@fuse/core/FuseLoading';
import { getProducts, selectProducts } from '../store/competitionsSlice';
import CompetitionsTableHead from './CompetitionsTableHead';
import Api from 'app/fuse-configs/Api';
import { Upload, message, Button as AntdButton, notification } from 'antd';
import { useTranslation } from 'react-i18next';
import { UploadOutlined } from '@ant-design/icons';
import DefaultURLs from '../../../../../@fuse/utils/DefaultURLs';
import LoadingButton from '@mui/lab/LoadingButton';

function ActionsTable(props) {
	const dispatch = useDispatch();
	const { t } = useTranslation('actionsApp');
	const products = useSelector(selectProducts);
	const user = useSelector(({ auth }) => auth.user);

	const [loading, setLoading] = useState(true);
	const [loadingLiveTweet, setLoadingLiveTweet] = useState(false);
	const [actions, setActions] = useState([]);
	const [selected, setSelected] = useState([]);
	const [data, setData] = useState(products);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [order, setOrder] = useState({
		direction: 'asc',
		id: null
	});
	const [open, setOpen] = useState(false);
	const [selectedAction, setSelectedAction] = useState({});
	const [tweet, setTweet] = useState('');
	const [mediaID, setMediaID] = useState();
	const [cursorPoint, setCursorPoint] = useState();

	const onEmojiClick = (event, emojiObject) => {
		let textBeforeCursorPosition = tweet.substring(0, cursorPoint);
		let textAfterCursorPosition = tweet.substring(cursorPoint, tweet.length);
		setTweet(textBeforeCursorPosition + emojiObject.emoji + textAfterCursorPosition);
	};

	const handleSendLiveTweet = () => {
		setLoadingLiveTweet(true);
		Api.sendLiveTweetByCompany(selectedAction.competition_id, tweet, mediaID)
			.then(response => {
				setLoadingLiveTweet(false);
				if (response.data.code === 1) {
					message.success(`${t('TWEET_UPLOAD_SUCCESS')}`);
					setOpen(false);
					Api.getCompetitionsForCompany().then(response => setActions(response.data.data));
				} else {
					setOpen(false);
					message.error(`${t('TWEET_UPLOAD_ERROR')}`);
				}
			})
			.catch(err => {
				setLoadingLiveTweet(false);
				console.log('err: ', JSON.parse(err.response.request.response));
			});
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChangeTweet = event => {
		setCursorPoint(event.target.selectionStart);
		setTweet(event.target.value);
	};

	useEffect(() => {
		dispatch(getProducts()).then(() => setLoading(false));
	}, [dispatch]);

	useEffect(() => {
		Api.getCompetitionsForCompany()
			.then(response => setActions(response.data.data))
			.catch(err => console.log('err: ', JSON.parse(err.response.request.response)));
		setData(products);
	}, [products]);

	function handleRequestSort(event, property) {
		const id = property;
		let direction = 'desc';

		if (order.id === property && order.direction === 'desc') {
			direction = 'asc';
		}

		setOrder({
			direction,
			id
		});
	}

	function handleClick(item, copyClicked) {
		if (copyClicked) {
			let slugEnd = DefaultURLs.mainSiteBasePointURL + item.random_slug;
			navigator.clipboard.writeText(slugEnd);
			message.success(t('COPIED'));
		} else {
			if (user.role === 'admin') {
				props.navigate(
					`/apps/actions/${item.competition_id}/${item.competition_name
						.replace(/([a-z])([A-Z])/g, '$1-$2')
						.replace(/[\s_]+/g, '-')
						.toLowerCase()}`
				);
			} else {
				if (item.competition_state === 5) {
					props.navigate(
						`/apps/actions/${item.competition_id}/${item.competition_name
							.replace(/([a-z])([A-Z])/g, '$1-$2')
							.replace(/[\s_]+/g, '-')
							.toLowerCase()}#finalize`
					);
				} else if (item.competition_state === 3) {
					if (item.isLiveTweet === 1) {
						setSelectedAction(item);
						setOpen(true);
						if (tweet === '') {
							setTweet(tweet + 'vienot.app/' + item.random_slug);
						}
					} else {
						if (confirm(t('ACTION_LIST_CONFIRM_ALERT'))) {
							// Save it!
							Api.changeCompetitionState(item.competition_id, 4).then(() => {
								notification.success({
									message: t('LISTED'),
									description: t('SUCCESS')
								});
								Api.getCompetitionsForCompany().then(response => setActions(response.data.data));
							});
						} else {
							// Do nothing!
							props.navigate(
								`/apps/actions/${item.competition_id}/${item.competition_name
									.replace(/([a-z])([A-Z])/g, '$1-$2')
									.replace(/[\s_]+/g, '-')
									.toLowerCase()}`
							);
						}
					}
				} else if (
					item.competition_state === 4 &&
					new Date(item.competition_end_date.replace(' ', 'T'))
						.addHours(-1 * (new Date().getTimezoneOffset() / 60))
						.getTime() < new Date().getTime()
				) {
					Api.changeCompetitionState(item.competition_id, 5).then(() => {
						notification.success({
							message: t('AUTO_FINISH_ACTION_TITLE'),
							description: t('AUTO_FINISH_ACTION_DESC')
						});
						props.navigate(
							`/apps/actions/${item.competition_id}/${item.competition_name
								.replace(/([a-z])([A-Z])/g, '$1-$2')
								.replace(/[\s_]+/g, '-')
								.toLowerCase()}#finalize`
						);
					});
				} else {
					props.navigate(
						`/apps/actions/${item.competition_id}/${item.competition_name
							.replace(/([a-z])([A-Z])/g, '$1-$2')
							.replace(/[\s_]+/g, '-')
							.toLowerCase()}`
					);
				}
			}
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

	if (actions.length === 0) {
		return (
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { delay: 0.1 } }}
				className="flex flex-1 items-center justify-center h-full"
			>
				<Typography color="textSecondary" variant="h5">
					{t('NO_ACTIONS')}
				</Typography>
			</motion.div>
		);
	}

	Date.prototype.addHours = function (h) {
		this.setTime(this.getTime() + h * 60 * 60 * 1000);
		return this;
	};
	const endDatePreparer = (competition_end_date, competition_state) => {
		return competition_state === 4
			? new Date(competition_end_date.replace(' ', 'T'))
				.addHours(-2 * (new Date().getTimezoneOffset() / 60))
				.getTime() < new Date().getTime()
				? competition_state === 5
					? new Date(competition_end_date.replace(' ', 'T'))
						.addHours(-2 * (new Date().getTimezoneOffset() / 60))
						.toISOString()
						.split('T')[0] +
					' ' +
					new Date(competition_end_date.replace(' ', 'T'))
						.addHours(-2 * (new Date().getTimezoneOffset() / 60))
						.toISOString()
						.split('T')[1]
						.split(':')[0] +
					':' +
					new Date(competition_end_date.replace(' ', 'T'))
						.addHours(-2 * (new Date().getTimezoneOffset() / 60))
						.toISOString()
						.split('T')[1]
						.split(':')[1]
					: t('PLEASE_FINISH')
				: new Date(competition_end_date.replace(' ', 'T'))
					.addHours(-2 * (new Date().getTimezoneOffset() / 60))
					.toISOString()
					.split('T')[0] +
				' ' +
				new Date(competition_end_date.replace(' ', 'T'))
					.addHours(-2 * (new Date().getTimezoneOffset() / 60))
					.toISOString()
					.split('T')[1]
					.split(':')[0] +
				':' +
				new Date(competition_end_date.replace(' ', 'T'))
					.addHours(-2 * (new Date().getTimezoneOffset() / 60))
					.toISOString()
					.split('T')[1]
					.split(':')[1]
			: new Date(competition_end_date.replace(' ', 'T'))
				.addHours(-2 * (new Date().getTimezoneOffset() / 60))
				.toISOString()
				.split('T')[0] +
			' ' +
			new Date(competition_end_date.replace(' ', 'T'))
				.addHours(-2 * (new Date().getTimezoneOffset() / 60))
				.toISOString()
				.split('T')[1]
				.split(':')[0] +
			':' +
			new Date(competition_end_date.replace(' ', 'T'))
				.addHours(-2 * (new Date().getTimezoneOffset() / 60))
				.toISOString()
				.split('T')[1]
				.split(':')[1];
	};
	return (
		<div className="w-full flex flex-col">
			<FuseScrollbars className="grow overflow-x-auto">
				<Table stickyHeader className="min-w-xl" aria-labelledby="tableTitle">
					<CompetitionsTableHead order={order} onRequestSort={handleRequestSort} rowCount={data.length} />

					<TableBody>
						{actions.map((action, key) => {
							const isSelected = selected.indexOf(action.competition_id) !== -1;
							let copyClicked = 0;
							return (
								<TableRow
									className="h-72 cursor-pointer"
									hover
									role="checkbox"
									aria-checked={isSelected}
									tabIndex={-1}
									key={action.id}
									selected={isSelected}
									onClick={event => {
										handleClick(action, copyClicked);
										copyClicked = 0;
									}}
								>
									<TableCell className="w-40 md:w-64 text-center" padding="none">
										<Icon
											onClick={() => {
												copyClicked = 1;
											}}
											fontSize="small"
										>
											content_copy
										</Icon>
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{action.competition_name}
									</TableCell>

									{user.role === 'admin' && (
										<TableCell className="p-4 md:p-16" component="th" scope="row">
											{action.company_name}
										</TableCell>
									)}

									<TableCell className="p-4 md:p-16 truncate" component="th" scope="row">
										{new Date(action.competition_start_date.replace(' ', 'T'))
											.addHours(-2 * (new Date().getTimezoneOffset() / 60))
											.toISOString()
											.split('T')[0] +
											' ' +
											new Date(action.competition_start_date.replace(' ', 'T'))
												.addHours(-2 * (new Date().getTimezoneOffset() / 60))
												.toISOString()
												.split('T')[1]
												.split(':')[0] +
											':' +
											new Date(action.competition_start_date.replace(' ', 'T'))
												.addHours(-2 * (new Date().getTimezoneOffset() / 60))
												.toISOString()
												.split('T')[1]
												.split(':')[1]}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
										{endDatePreparer(action.competition_end_date, action.competition_state)}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
										{action.currentAttending}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
										{action.competition_is_paid ? (
											<Icon className="text-green text-20">check_circle</Icon>
										) : (
											<Icon className="text-red text-20">remove_circle</Icon>
										)}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row" align="right">
										{/* 
											taslak eklenecek -> 0 -> ilerisi için bu
											hourglass_empty inceleme bekliyor -> 1
											cancel iptal edildi -> 2
											lsitele -> 3
											play_circle_outline devam ediyor. -> 4
											add_task sonuclandır -> 5
											done_all tamamlandı -> 7
											*/}
										{action.competition_state === 1 ? (
											// <Icon className="text-green text-20">
											//   hourglass_empty
											// </Icon>
											<Button className="text-orange">{t('IN_REVIEW')}</Button>
										) : action.competition_state === 2 ? (
											// <Icon className="text-green text-20">cancel</Icon>
											<Button className="text-red">{t('CANCEL')}</Button>
										) : action.competition_state === 3 ? (
											<Button className="text-green">{t('LIST')}</Button>
										) : action.competition_state === 4 ? (
											// <Icon className="text-green text-20">
											//   play_circle_outline
											// </Icon>
											new Date(action.competition_end_date.replace(' ', 'T'))
												.addHours(-2 * (new Date().getTimezoneOffset() / 60))
												.getTime() < new Date().getTime() ? (
												<Button className="text-red">{t('PLEASE_FINISH')}</Button>
											) : (
												<Button className="text-blue">{t('CONTINUES')}</Button>
											)
										) : action.competition_state === 5 ? (
											<>
												{/* <Icon className="text-green text-20">add_task</Icon> */}
												<Button className="text-red">{t('FINALIZE')}</Button>
											</>
										) : (
											// {/* <Icon className="text-green text-20">done_all</Icon> */}
											<Button className="text-green">{t('DONE')}</Button>
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
				count={actions.length}
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

			<Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm" className="text-center">
				<DialogTitle>{t('INCELE')}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						<Grid container direction={'column'}>
							<Grid container item xs={6}>
								<Grid item xs={6}>
									<TextField
										id="filled-multiline-flexible"
										label="Tweet"
										fullWidth
										variant="filled"
										multiline={true}
										rows={6}
										value={tweet}
										onChange={handleChangeTweet}
										inputProps={{
											maxlength: 274
										}}
									/>
									<Typography color="textSecondary" variant="h6">
										{tweet.length}/274
									</Typography>
								</Grid>
								<Grid item xs={6} style={{ width: 0 }}>
									<Upload
										name="tweet_photo"
										action={
											DefaultURLs.apiBasePointURL +
											'competitions/add-competition-photo?user_id=' +
											user.uuid
										}

										onChange={info => {
											// console.log('yükleme bşaladı: ', info);
											if (info.file.status !== 'uploading') {
												// console.log(info.file, info.fileList);
											}
											if (info.file.status === 'done') {
												// console.log('sonuçç: ', info.file);
												if (info.file.response.code === 0) {
													message.error(`${t('FILE_UPLOAD_ERROR')}`);
												} else {
													setMediaID(info.file.response.data);
												}
											} else if (info.file.status === 'error') {
												// console.log('err: ', info.file);
												message.error(`${info.file.name} ${t('FILE_UPLOAD_ERROR')}`);
											}
										}}
									>
										<AntdButton
											// disabled={
											// 	competition_state !== undefined || user.data.displayName === 'John Doe'
											// }
											icon={<UploadOutlined />}
										>
											{t('UPLOAD_TWEET_PHOTO')}
										</AntdButton>
									</Upload>
								</Grid>

								{/* <Grid item xs={4} style={{ marginTop: 10 }}>
									
								</Grid> */}
								{/* <Grid item xs={12} style={{ marginTop: 10 }}>
									<div className={'h-128 flex justify-center'}>
										<img
											className="h-128"
											src={DefaultURLs.uploadServerURL + null}
											alt="tweet_photo"
										/>
									</div>
								</Grid> */}
							</Grid>

							<Grid item xs={6} >
								<Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%' }} />
							</Grid>
						</Grid>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<LoadingButton loading={loadingLiveTweet} color="success" onClick={handleSendLiveTweet} autoFocus>
						Tweet At
					</LoadingButton>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default withRouter(ActionsTable);
