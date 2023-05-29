import Checkbox from '@mui/material/Checkbox';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Api from 'app/fuse-configs/Api';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router';

function CompetitionFinalizesToolbar(props) {
	const {
		folders,
		checkedResults,
		checkedResultsClear,
		reloadCompetitionResults,
		totalResultCount,
		inPageResultCount,
		winnerCount,
		winnerBackupCount,
		reloadWinnerCount,
		reloadWinnerBackupCount
	} = props;
	const { t } = useTranslation('competitionFinalizeApp');
	const routeParams = useParams();

	const integrateResultToFolder = (folder_id, competition_results) => {
		Api.integrateResultToFolder(folder_id, competition_results)
			.then(response => {
				checkedResultsClear(true, competition_results);
			})
			.catch(err => console.log(err));
	};

	const chooseWinner = (competition_result, winner_place, winner_type) => {
		Api.chooseWinner(competition_result[0], winner_place, winner_type)
			.then(response => {
				if (winner_type === 'winner') {
					Api.sendWinnersNotification(routeParams.competitionId, [response.data.data])
					let filtered = winnerCount.filter(value => {
						return value !== winner_place;
					});
					reloadWinnerCount(true, filtered);
				} else {
					Api.sendAltWinnersNotification(routeParams.competitionId, [response.data.data])
					let filtered = winnerBackupCount.filter(value => {
						return value !== winner_place;
					});
					reloadWinnerBackupCount(true, filtered);
				}
				checkedResultsClear(true, competition_result);
			})
			.catch(err => console.log(err));
	};

	const [menu, setMenu] = useState({
		selectMenu: null,
		foldersMenu: null,
		labelsMenu: null
	});

	function handleMenuOpen(event, _menu) {
		setMenu({
			..._menu,
			[_menu]: event.currentTarget
		});
	}

	function handleMenuClose(event, _menu) {
		setMenu({
			..._menu,
			[_menu]: null
		});
	}

	// function handleCheckChange(event) {
	//   return event.target.checked
	//     ? dispatch(selectAllMails())
	//     : dispatch(deselectAllMails());
	// }

	return (
		<div className="flex flex-1 items-center sm:px-8">
			<Checkbox
				// onChange={handleCheckChange}
				disabled={true}
				checked={checkedResults.length > 0}
				indeterminate={checkedResults.length > 0}
			/>

			{checkedResults.length > 0 && (
				<>
					<div className="border-r-1 h-48 w-1 mx-12 my-0" />

					<IconButton
						onClick={ev => integrateResultToFolder(5, checkedResults)}
						aria-label="Delete"
						size="large"
						disabled={winnerCount.length === 0 && winnerBackupCount.length === 0 ? true : false}
					>
						<Icon>delete</Icon>
					</IconButton>

					<IconButton
						aria-label="More"
						aria-owns={menu.folders ? 'folders-menu' : null}
						aria-haspopup="true"
						onClick={ev => handleMenuOpen(ev, 'folders')}
						size="large"
						disabled={winnerCount.length === 0 && winnerBackupCount.length === 0 ? true : false}
					>
						<Icon>folder</Icon>
					</IconButton>

					<Menu
						id="folders-menu"
						anchorEl={menu.folders}
						open={Boolean(menu.folders)}
						onClose={ev => handleMenuClose(ev, 'folders')}
					>
						{folders.length > 0 &&
							folders.map(folder => (
								<MenuItem
									onClick={ev => {
										integrateResultToFolder(folder.id, checkedResults);
										// dispatch(setFolderOnSelectedMails(folder.id));
										handleMenuClose(ev, 'folders');
									}}
									key={folder.id}
								>
									{t(folder.translate)}
								</MenuItem>
							))}
					</Menu>

					{routeParams.folderHandle === 'final-round' && (
						<>
							<IconButton
								aria-label="More"
								aria-owns={menu.folders_winners ? 'folders-menu-2' : null}
								aria-haspopup="true"
								onClick={ev => handleMenuOpen(ev, 'folders_winners')}
								size="large"
							>
								<Icon>emoji_events</Icon>
							</IconButton>

							<Menu
								id="folders-menu-2"
								anchorEl={menu.folders_winners}
								open={Boolean(menu.folders_winners)}
								onClose={ev => handleMenuClose(ev, 'folders_winners')}
							>
								{winnerCount.map((winnerItem, key) => (
									<MenuItem
										onClick={ev => {
											chooseWinner(checkedResults, winnerItem, 'winner');
											handleMenuClose(ev, 'folders_winners');
										}}
										key={key}
									>
										{winnerItem}. {t('CHOOSE_WINNER')}
									</MenuItem>
								))}
								{winnerBackupCount.map((winnerBackupItem, key) => (
									<MenuItem
										onClick={ev => {
											chooseWinner(checkedResults, winnerBackupItem, 'backup');
											handleMenuClose(ev, 'folders_winners');
										}}
										key={key}
									>
										{winnerBackupItem}. {t('CHOOSE_WINNER_BACKUP')}
									</MenuItem>
								))}
							</Menu>
						</>
					)}
				</>
			)}
			<Typography style={{ marginLeft: 'auto', marginRight: 0 }} className="text-12" color="textSecondary">
				{routeParams.folderHandle === 'final-round'
					? winnerCount.length +
					  ' ' +
					  t('ADET_KAZANAN_VE') +
					  ' ' +
					  winnerBackupCount.length +
					  ' ' +
					  t('ADET_YEDEK_KAZANAN_SECIN')
					: t('TOTAL') +
					  ' ' +
					  totalResultCount +
					  ' ' +
					  t('SONUCTAN') +
					  ' ' +
					  inPageResultCount +
					  ' ' +
					  t('TANESINI_GORUYORSUNUZ')}
			</Typography>
			<IconButton
				onClick={ev => reloadCompetitionResults(true)}
				style={{ marginLeft: 'auto', marginRight: 0 }}
				aria-label="Refresh"
				size="large"
			>
				<Icon>cached</Icon>
			</IconButton>
		</div>
	);
}

export default CompetitionFinalizesToolbar;
