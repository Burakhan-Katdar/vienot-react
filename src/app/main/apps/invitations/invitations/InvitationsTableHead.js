import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import { useTranslation } from 'react-i18next';

function InvitationsTableHead(props) {
	const { t } = useTranslation('invitationsApp');
	// const { selectedProductIds } = props;
	const columns = [
		{
			id: 'code',
			align: 'left',
			disablePadding: false,
			label: t('TABLE_COLUMN_CODE'),
			sort: true
		},
		{
			id: 'name',
			align: 'left',
			disablePadding: false,
			label: t('TABLE_COLUMN_NAME'),
			sort: true
		},
		{
			id: 'right',
			align: 'right',
			disablePadding: false,
			label: t('TABLE_COLUMN_RIGHT'),
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

export default InvitationsTableHead;
