import React, { useState, useEffect } from 'react';
import { orange } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Controller, useFormContext } from 'react-hook-form';
import DefaultURLs from '../../../../../../@fuse/utils/DefaultURLs';
import { Upload, message, Button as AntdButton } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Root = styled('div')(({ theme }) => ({
	'& .productImageFeaturedStar': {
		position: 'absolute',
		top: 0,
		right: 0,
		color: orange[400],
		opacity: 0
	},

	'& .productImageUpload': {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut
	},

	'& .productImageItem': {
		transitionProperty: 'box-shadow',
		transitionDuration: theme.transitions.duration.short,
		transitionTimingFunction: theme.transitions.easing.easeInOut,
		'&:hover': {
			'& .productImageFeaturedStar': {
				opacity: 0.8
			}
		},
		'&.featured': {
			pointerEvents: 'none',
			boxShadow: theme.shadows[3],
			'& .productImageFeaturedStar': {
				opacity: 1
			},
			'&:hover .productImageFeaturedStar': {
				opacity: 1
			}
		}
	}
}));
const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary
}));

function DetailsTab(props) {
	const { t } = useTranslation('invitationsApp');
	const {} = props;
	const user = useSelector(({ auth }) => auth.user);
	const methods = useFormContext();
	const { control } = methods;
	return (
		<Root>
			<Grid container>
				<Grid item xs={6}>
					<Grid container>
						<Item></Item>
					</Grid>
				</Grid>
			</Grid>
		</Root>
	);
}

export default DetailsTab;
