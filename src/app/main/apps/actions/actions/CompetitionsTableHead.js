import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tooltip from '@mui/material/Tooltip';
import TableHead from '@mui/material/TableHead';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

function ActionsTableHead(props) {
	const { t } = useTranslation('actionsApp');
	const user = useSelector(({ auth }) => auth.user);
	// const { selectedProductIds } = props;
	const columns = [
		{
			id: 'name',
			align: 'left',
			disablePadding: false,
			label: t('TABLE_COLUMN_TITLE'),
			sort: true
		},
		{
			id: 'company_name',
			align: 'left',
			disablePadding: false,
			label: t('TABLE_COLUMN_COMPANY_NAME'),
			sort: true
		},
		{
			id: 'categories',
			align: 'left',
			disablePadding: false,
			label: t('TABLE_COLUMN_START_DATE'),
			sort: true
		},
		{
			id: 'priceTaxIncl',
			align: 'right',
			disablePadding: false,
			label: t('TABLE_COLUMN_END_DATE'),
			sort: true
		},
		{
			id: 'quantity',
			align: 'right',
			disablePadding: false,
			label: t('TABLE_COLUMN_NUM_OF_PARTICIPATION'),
			sort: true
		},
		{
			id: 'active',
			align: 'right',
			disablePadding: false,
			label: t('TABLE_COLUMN_IS_PAID'),
			sort: true
		},
		{
			id: 'active',
			align: 'right',
			disablePadding: false,
			label: t('TABLE_COLUMN_ACTIVITY'),
			sort: true
		}
	];

	const createSortHandler = property => event => {
		props.onRequestSort(event, property);
	};

	return (
		<TableHead>
			<TableRow className="h-48 sm:h-64">
				<TableCell padding="none" className="w-40 md:w-64 text-center z-99"></TableCell>
				{columns.map(column => {
					return (
						<TableCell
							className="p-4 md:p-16"
							style={
								user.role === 'admin' && column.id === 'company_name'
									? null
									: user.role === 'admin' && column.id !== 'company_name'
									? null
									: user.role !== 'admin' && column.id !== 'company_name'
									? null
									: { display: 'none' }
							}
							key={column.id}
							align={column.align}
							padding={column.disablePadding ? 'none' : 'normal'}
							sortDirection={props.order.id === column.id ? props.order.direction : false}
						>
							{column.sort && (
								<Tooltip
									title={t('SORT')}
									placement={column.align === 'right' ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={props.order.id === column.id}
										direction={props.order.direction}
										onClick={createSortHandler(column.id)}
										className="font-semibold"
									>
										{column.label}
									</TableSortLabel>
								</Tooltip>
							)}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default ActionsTableHead;
