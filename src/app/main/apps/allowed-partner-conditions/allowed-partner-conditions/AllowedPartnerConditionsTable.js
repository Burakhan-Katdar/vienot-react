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
import { Tree, Popover, Button as ButtonAntd, InputNumber } from 'antd';

function AllowedPartnerConditionsTable(props) {
	const dispatch = useDispatch();
	const { t } = useTranslation('partnersApp');
	const products = useSelector(selectProducts);

	const [loading, setLoading] = useState(true);
	const [partners, setPartners] = useState([]);
	const [data, setData] = useState(products);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [treeData, setTreeData] = useState();
	const [checkedKeys, setCheckedKeys] = useState();
	const [selectedKeys, setSelectedKeys] = useState([]);
	const [choosenCompany, setChoosenCompany] = useState();
	const [conditionLimitForCompany, setConditionLimitForCompany] = useState(0);

	useEffect(() => {
		dispatch(getProducts()).then(() => setLoading(false));
	}, [dispatch]);

	const getApprovedCompanies = () => {
		Api.getApprovedCompanies().then(response => {
			setPartners(response.data.data);
		})
	};

	const getConditionsForCompany = (company_id) => {
		Api.getAllowedConditionsForCompany(company_id).then(response => {
			let treeData = [];
			response.data.data.social_medias.map(social_media => {
				let socialMediaObject = {
					title: social_media.social_media_name,
					key: 'social_media_' + social_media.id,
					children: []
				};
				treeData.push(socialMediaObject);
			});
			response.data.data.conditions.map(condition => {
				let conditionObject = {
					title: condition.condition_name,
					key: 'condition_' + condition.id
				};
				treeData
					.find(item => parseInt(item.key.replace('social_media_', '')) === parseInt(condition.social_media_id))
					.children.push(conditionObject);
			});
			setTreeData(treeData);
			let checkedData = [];
			response.data.data.allowed_company_conditions.map(item => {
				checkedData.push('condition_' + item.condition_id);
			});
			setCheckedKeys(checkedData);
		}).catch(err => console.log(err))
	}

	const getConditionLimitForCompany = (company_id) => {
		Api.getConditionLimitForCompany(company_id).then(response => {
			setConditionLimitForCompany(response.data.data);
		}).catch(err => console.log(err.response.request))
	}

	useEffect(() => {
		getApprovedCompanies();
		setData(products);
	}, [products]);

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

	const onCheck = checkedKeysValue => {
		setCheckedKeys(checkedKeysValue);
	};

	const onSelect = (selectedKeysValue, info) => {
		setSelectedKeys(selectedKeysValue);
	};

	const contentAssignCondition = () => {
		return (
			<>
				<Tree
					checkable
					onCheck={onCheck}
					checkedKeys={checkedKeys}
					onSelect={onSelect}
					selectedKeys={selectedKeys}
					treeData={treeData}
				/>
				<ButtonAntd
					type="primary"
					onClick={() => {
						Api.updateAllowedConditionsForCompany(choosenCompany, checkedKeys)
							.then(() => {
								notification.success({ message: 'Başarılı', description: 'Başarıyla atama yapıldı!' });
							})
							.catch(err => console.log(JSON.parse(err.response.request.response).message));
					}}
				>
					Kaydet
				</ButtonAntd>
			</>
		);
	};

	const contentChangeConditionLimit = () => {
		return (
			<>
				{conditionLimitForCompany && <InputNumber min={0} value={conditionLimitForCompany} onChange={(data) => setConditionLimitForCompany(data)} />}
				<ButtonAntd
					type="primary"
					onClick={() => {
						Api.updateConditionLimitForCompany(choosenCompany, conditionLimitForCompany)
							.then(() => {
								notification.success({ message: 'Başarılı', description: 'Başarıyla değişiklik yapıldı!' });
							})
							.catch(err => console.log(JSON.parse(err.response.request.response).message));
					}}
				>
					Kaydet
				</ButtonAntd>
			</>
		);
	};

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
										// setOpen(true);
										// setSelectedPartner(partner);
										// handleClick(partner)
									}}
								>
									<TableCell className="w-40 md:w-64 text-center" padding="none">
										{key + 1}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										{partner.company_name}
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										<Popover placement="bottom" content={contentAssignCondition} trigger="click" title="Şart İzni Tanımlama">
											<ButtonAntd
												type="primary"
												onClick={() => {
													setChoosenCompany(partner.id);
													getConditionsForCompany(partner.id);
												}}
											>
												Atama Yap
											</ButtonAntd>
										</Popover>
									</TableCell>

									<TableCell className="p-4 md:p-16" component="th" scope="row">
										<Popover placement="bottom" content={contentChangeConditionLimit} trigger="click" title="Şart Limiti Değiştirme">
											<ButtonAntd
												type="primary"
												onClick={() => {
													setChoosenCompany(partner.id);
													getConditionLimitForCompany(partner.id);
												}}
											>
												Şart Limiti
											</ButtonAntd>
										</Popover>
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
		</div>
	);
}

export default withRouter(AllowedPartnerConditionsTable);
