import React, { useState } from 'react';
import _ from '@lodash';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import withRouter from '@fuse/core/withRouter';
import DefaultURLs from '../../../../../@fuse/utils/DefaultURLs';
import { Popover, Button, Image } from 'antd';
import { useTranslation } from 'react-i18next';

const StyledListItem = styled(ListItem)(({ theme, unread, selected }) => ({
	...(unread && {
		background: 'rgba(0,0,0,0.03)'
	}),

	...(selected && {
		'&::after': {
			content: '""',
			position: 'absolute',
			top: 0,
			left: 0,
			display: 'block',
			height: '100%',
			width: 3,
			backgroundColor: theme.palette.primary.main
		}
	})
}));

const ResultListItem = props => {
	const [checked, setChecked] = useState(false);
	const { t } = useTranslation("competitionFinalizeApp");
	const mediaContent = () => {
		return (
			<Image
				width={600}
				src={DefaultURLs.uploadUserPhotoServerURL + props.result.result_media}
				preview={false}
			/>
		)
	}
	return (
		<StyledListItem
			dense
			// button
			// onClick={() => {
			//   console.log("contente tıklandı: ", props.result.id);
			//   setChecked(checked ? false : true);
			//   props.checkedResultsReload(true, props.result.id);
			//   // props.navigate(`${props.mail.id}`)
			// }}
			selected={checked}
			// unread={!props.mail.read ? 1 : 0}
			className="items-start py-20 px-0 md:px-8 relative"
		>
			<div className="flex flex-col sm:flex-row items-center justify-start">
				<Checkbox
					tabIndex={-1}
					disableRipple
					checked={checked}
					onChange={() => {
						if (checked === true) {
							props.checkedResultsReload(true, props.result.id, 'delete');
						} else {
							props.checkedResultsReload(true, props.result.id, 'add');
						}
						setChecked(checked ? false : true);
					}}
					onClick={ev => ev.stopPropagation()}
				/>

				<div className="px-8 order-first sm:order-none">
					{props.result.twitter_photo_url ? (
						<Avatar alt={props.result.twitter_username} src={props.result.twitter_photo_url} />
					) : (
						<Avatar
							sx={{
								backgroundColor: theme => theme.palette.primary[500]
							}}
						>
							{props.result.twitter_username}
						</Avatar>
					)}
				</div>
			</div>

			<div className="flex flex-1 flex-col relative overflow-hidden px-8">
				<Typography className="font-medium">{props.result.twitter_username}</Typography>

				<div className="flex flex-col py-4">
					<Typography color="textSecondary" className="truncate">
						{props.result.result_content}
					</Typography>
					<Typography className="truncate text-14 pb-2">
						{props.result.result_media !== null &&
							<Popover content={mediaContent} trigger="click">
								<Button>{t('SEE_MEDIA')}</Button>
							</Popover>
						}
						<Button
							onClick={() => window.open('https://twitter.com/' + props.result.twitter_username + '/status/' + props.result.tweet_id)}>
							{t('SEE_TWEET')}
						</Button>
					</Typography>
				</div>

				{/* <div className="flex -mx-2">
          {!_.isEmpty(labels) &&
            props.mail.labels.map((label) => (
              <MailChip
                className="mx-2 mt-4"
                title={labels[label].title}
                color={labels[label].color}
                key={label}
              />
            ))}
        </div> */}
			</div>

			<div className="px-8">
				<Typography className="text-12" color="textSecondary">
					{props.result.created_at.split('T')[0] + ' ' + props.result.created_at.split('T')[1].split('.')[0]}
				</Typography>
			</div>
		</StyledListItem>
	);
};

export default withRouter(ResultListItem);
