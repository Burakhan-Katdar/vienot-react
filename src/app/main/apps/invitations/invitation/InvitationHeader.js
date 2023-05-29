import Button from '@mui/material/Button';
import Icon from '@mui/material/Icon';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import _ from '@lodash';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';
import Api from 'app/fuse-configs/Api';

function InvitationHeader(props) {
	const { code } = props;
	const { t } = useTranslation('invitationsApp');
	const competitionMethods = useFormContext();
	const { getValues } = competitionMethods;
	const theme = useTheme();
	const navigate = useNavigate();
	const user = useSelector(({ auth }) => auth.user);
	const routeParams = useParams();

	function handleSaveAction() {
		if (routeParams.invitationId === 'new') {
			Api.addInvitation(
				getValues().company_name,
				getValues().code,
				getValues().right,
				getValues().message_en,
				getValues().message_tr
			)
				.then(response => {
					message.success(t('INVITATION_SUCCESS_SEND_TO_REVIEW'));
					navigate('/apps/invitations');
				})
				.catch(err => {
					message.error(t('ERROR_ON_SERVER'));
				});
		} else {
			Api.updateInvitation(routeParams.invitationId, getValues().message_en, getValues().message_tr)
				.then(response => {
					message.success(t('INVITATION_SUCCESS_SEND_TO_REVIEW'));
					navigate('/apps/invitations');
				})
				.catch(err => {
					message.error(t('ERROR_ON_SERVER'));
				});
		}
	}

	return (
		<div className="flex flex-1 w-full items-center justify-between">
			<div className="flex flex-col items-start max-w-full min-w-0">
				<motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}>
					<Typography
						className="flex items-center sm:mb-12"
						component={Link}
						role="button"
						to="/apps/invitations"
						color="inherit"
					>
						<Icon className="text-20">{theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}</Icon>
						<span className="hidden sm:flex mx-4 font-medium">{t('INVITATIONS')}</span>
					</Typography>
				</motion.div>

				<div className="flex items-center max-w-full">
					<motion.div
						className="hidden sm:flex"
						initial={{ scale: 0 }}
						animate={{ scale: 1, transition: { delay: 0.3 } }}
					>
						{/* {images.length > 0 && featuredImageId ? (
							<img
								className="w-32 sm:w-48 rounded"
								src={_.find(images, { id: featuredImageId }).url}
								alt={name}
							/>
							) : (
							<img
								className="w-32 sm:w-48 rounded"
								src="assets/images/ecommerce/product-image-placeholder.png"
								alt={name}
							/>
							)} */}
					</motion.div>
					<div className="flex flex-col min-w-0 mx-8 sm:mc-16">
						<motion.div initial={{ x: -20 }} animate={{ x: 0, transition: { delay: 0.3 } }}>
							<Typography className="text-16 sm:text-20 truncate font-semibold">
								{code || t('NEW_INVITATION')}
							</Typography>
							<Typography variant="caption" className="font-medium">
								{t('INVITATION_DETAILS')}
							</Typography>
						</motion.div>
					</div>
				</div>
			</div>
			<motion.div
				className="flex"
				initial={{ opacity: 0, x: 20 }}
				animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
			>
				<Button
					className="whitespace-nowrap mx-4"
					variant="contained"
					color="secondary"
					startIcon={<Icon className="hidden sm:flex">save</Icon>}
					onClick={handleSaveAction}
				>
					{t('SAVE')}
				</Button>
			</motion.div>
		</div>
	);
}

export default InvitationHeader;
