import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { useTranslation } from 'react-i18next';

function PartnersTableHead(props) {
	const { t } = useTranslation('allowedPartnerConditionsApp');
	// const { selectedProductIds } = props;
	const columns = [
		{
			id: 'company_name',
			align: 'left',
			disablePadding: false,
			label: t('TABLE_COLUMN_COMPANY_NAME'),
			sort: true
		},
		{
			id: 'status',
			align: 'left',
			disablePadding: false,
			label: t('TABLE_COLUMN_CONDITIONS'),
			sort: true
		},
		{
			id: 'status',
			align: 'left',
			disablePadding: false,
			label: t('TABLE_COLUMN_CONDITION_LIMIT'),
			sort: true
		}
	];

	return (
		<TableHead>
			<TableRow className="h-48 sm:h-64">
				<TableCell padding="none" className="w-40 md:w-64 text-center z-99"></TableCell>
				{columns.map(column => {
					return (
						<TableCell
							className="p-4 md:p-16"
							key={column.id}
							align={column.align}
							padding={column.disablePadding ? 'none' : 'normal'}
						>
							{column.label}
						</TableCell>
					);
				}, this)}
			</TableRow>
		</TableHead>
	);
}

export default PartnersTableHead;
