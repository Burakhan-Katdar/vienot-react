import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useFormContext, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';
import Api from 'app/fuse-configs/Api';

function BasicInfoTab(props) {
	const { t } = useTranslation('invitationsApp');
	const methods = useFormContext();
	const { control, formState } = methods;
	const routeParams = useParams();
	const [partners, setPartners] = useState([]);
	useEffect(() => {
		Api.getCompanies().then(response => {
			setPartners(response.data.data);
		});
	}, []);
	return (
		<div>
			<Controller
				name="company_name"
				control={control}
				render={({ field }) =>
					routeParams.invitationId === 'new' ? (
						<TextField
							{...field}
							className="mt-8 mb-16"
							label={t('PARTNER_INPUT')}
							select
							disabled={routeParams.invitationId === 'new' ? false : true}
							variant="outlined"
							fullWidth
						>
							{partners.map(partner => (
								<MenuItem value={partner.user_id}>{partner.company_name}</MenuItem>
							))}
						</TextField>
					) : (
						<TextField
							{...field}
							className="mt-8 mb-16"
							id="competition_is_paid"
							label={t('PARTNER_INPUT')}
							disabled={routeParams.invitationId === 'new' ? false : true}
							variant="outlined"
							fullWidth
						/>
					)
				}
			/>

			<Controller
				name="code"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						InputLabelProps={{
							shrink: true
						}}
						required
						label={t('CODE_INPUT')}
						autoFocus
						id="code"
						variant="outlined"
						fullWidth
						disabled={routeParams.invitationId === 'new' ? false : true}
					/>
				)}
			/>

			<Controller
				name="right"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						InputLabelProps={{
							shrink: true
						}}
						required
						label={t('RIGHT_INPUT')}
						autoFocus
						id="right"
						variant="outlined"
						fullWidth
						disabled={routeParams.invitationId === 'new' ? false : true}
					/>
				)}
			/>

			<Controller
				name="message_tr"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						InputLabelProps={{
							shrink: true
						}}
						id="message_tr"
						label={t('TR_INPUT')}
						type="text"
						multiline
						rows={5}
						variant="outlined"
						fullWidth
					/>
				)}
			/>

			<Controller
				name="message_en"
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						className="mt-8 mb-16"
						InputLabelProps={{
							shrink: true
						}}
						id="message_en"
						label={t('EN_INPUT')}
						type="text"
						multiline
						rows={5}
						variant="outlined"
						fullWidth
					/>
				)}
			/>
		</div>
	);
}

export default BasicInfoTab;
