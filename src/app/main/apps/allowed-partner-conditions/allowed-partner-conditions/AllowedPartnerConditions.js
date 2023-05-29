import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { styled } from '@mui/material/styles';
import reducer from '../store';
import AllowedPartnerConditionsHeader from './AllowedPartnerConditionsHeader';
import AllowedPartnerConditionsTable from './AllowedPartnerConditionsTable';

const Root = styled(FusePageCarded)(({ theme }) => ({
	'& .FusePageCarded-header': {
		minHeight: 72,
		height: 72,
		alignItems: 'center',
		[theme.breakpoints.up('sm')]: {
			minHeight: 136,
			height: 136
		}
	},
	'& .FusePageCarded-content': {
		display: 'flex'
	},
	'& .FusePageCarded-contentCard': {
		overflow: 'hidden'
	}
}));

function AllowedPartnerConditions() {
	return <Root header={<AllowedPartnerConditionsHeader />} content={<AllowedPartnerConditionsTable />} innerScroll />;
}

export default withReducer('eCommerceApp', reducer)(AllowedPartnerConditions);
