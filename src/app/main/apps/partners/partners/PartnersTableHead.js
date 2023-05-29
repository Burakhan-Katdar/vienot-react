import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { useTranslation } from 'react-i18next';

function PartnersTableHead(props) {
	const { t } = useTranslation('partnersApp');
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
			id: 'email',
			align: 'left',
			disablePadding: false,
			label: t('TABLE_COLUMN_EMAIL'),
			sort: true
		},
		{
			id: 'company_gsm_phone_number',
			align: 'right',
			disablePadding: false,
			label: t('TABLE_COLUMN_GSM'),
			sort: true
		},
		{
			id: 'company_twitter_username',
			align: 'right',
			disablePadding: false,
			label: t('TABLE_COLUMN_TWITTER'),
			sort: true
		},
		{
			id: 'status',
			align: 'right',
			disablePadding: false,
			label: t('TABLE_COLUMN_STATUS'),
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
