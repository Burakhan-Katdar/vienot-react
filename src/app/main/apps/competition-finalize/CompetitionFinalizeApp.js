import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import CompetitionFinalizeDetails from './mail/CompetitionFinalizeDetails';
import CompetitionFinalizeToolbar from './mail/CompetitionFinalizeToolbar';
import CompetitionFinalizeAppHeader from './CompetitionFinalizeAppHeader';
import CompetitionFinalizeAppSidebarContent from './CompetitionFinalizeAppSidebarContent';
import CompetitionFinalizeAppSidebarHeader from './CompetitionFinalizeAppSidebarHeader';
import CompetitionFinalizeList from './mails/CompetitionFinalizeList';
import CompetitionFinalizesToolbar from './mails/CompetitionFinalizesToolbar';
import reducer from './store';
import Api from 'app/fuse-configs/Api';
import { useSelector } from 'react-redux';

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
		display: 'flex',
		flexDirection: 'column'
	}
}));

function CompetitionFinalizeApp(props) {
	const folders = [
		{
			id: 1,
			handle: 'will-be-reviewed',
			title: 'İncelenecekler',
			translate: 'WILL_BE_REVIEWED',
			icon: 'inbox'
		},
		{
			id: 2,
			handle: 'first-round',
			title: '1.Tur',
			translate: 'FIRST_ROUND',
			icon: 'send'
		},
		{
			id: 3,
			handle: 'second-round',
			title: '2.Tur',
			translate: 'SECOND_ROUND',
			icon: 'email_open'
		},
		{
			id: 4,
			handle: 'final-round',
			title: 'Son Tur',
			translate: 'FINAL_ROUND',
			icon: 'error'
		},
		{
			id: 5,
			handle: 'losers',
			title: 'Elenenler',
			translate: 'LOSERS',
			icon: 'delete'
		}
	];
	const pageLayout = useRef(null);
	const routeParams = useParams();
	const [competitionResults, setCompetitionResults] = useState();
	const [resultCount, setResultCount] = useState();
	const [winnerCount, setWinnerCount] = useState();
	const [winnerBackupCount, setWinnerBackupCount] = useState();
	const user = useSelector(({ auth }) => auth.user);

	const [checkedResults, setCheckedResults] = useState([]);

	useEffect(() => {
		if (winnerCount && winnerBackupCount) {
			if (winnerCount.length === 0 && winnerBackupCount.length === 0) {
				Api.changeCompetitionState(routeParams.competitionId, 7);
			}
		}
	}, [winnerCount, winnerBackupCount]);

	const loadCompetitionResults = () => {
		let folderId =
			folders.find(item => item.handle === routeParams.folderHandle) !== undefined
				? folders.find(item => item.handle === routeParams.folderHandle).id
				: 0;
		Api.getCompetitionResultsById(user.uuid, routeParams.competitionId, folderId).then(response => {
			setResultCount(response.data.count === 0 ? '' : response.data.count);
			setCompetitionResults(
				response.data.data.filter(competition_result => {
					return (
						response.data.winners.find(winner => winner.competition_result_id === competition_result.id) ===
						undefined
					);
				})
			);
			let winnerCountArray = [];
			for (let i = 1; i <= response.data.winnerCount; i++) {
				if (
					response.data.winners.find(winner => winner.winner_place === i && winner.is_winner === 1) ===
					undefined
				) {
					winnerCountArray.push(i);
				}
			}
			setWinnerCount(winnerCountArray);
			let winnerBackupCountArray = [];
			for (let i = 1; i <= response.data.winnerBackupCount; i++) {
				if (
					response.data.winners.find(winner => winner.winner_place === i && winner.is_backup === 1) ===
					undefined
				) {
					winnerBackupCountArray.push(i);
				}
			}
			setWinnerBackupCount(winnerBackupCountArray);
		});
	};

	useEffect(() => {
		let folderId =
			folders.find(item => item.handle === routeParams.folderHandle) !== undefined
				? folders.find(item => item.handle === routeParams.folderHandle).id
				: 0;
		setCheckedResults([]);
		Api.getCompetitionResultsById(user.uuid, routeParams.competitionId, folderId).then(response => {
			setResultCount(response.data.count === 0 ? '' : response.data.count);
			setCompetitionResults(
				response.data.data.filter(competition_result => {
					return (
						response.data.winners.find(winner => winner.competition_result_id === competition_result.id) ===
						undefined
					);
				})
			);
			let winnerCountArray = [];
			for (let i = 1; i <= response.data.winnerCount; i++) {
				if (
					response.data.winners.find(winner => winner.winner_place === i && winner.is_winner === 1) ===
					undefined
				) {
					winnerCountArray.push(i);
				}
			}
			setWinnerCount(winnerCountArray);
			let winnerBackupCountArray = [];
			for (let i = 1; i <= response.data.winnerBackupCount; i++) {
				if (
					response.data.winners.find(winner => winner.winner_place === i && winner.is_backup === 1) ===
					undefined
				) {
					winnerBackupCountArray.push(i);
				}
			}
			setWinnerBackupCount(winnerBackupCountArray);
		});
	}, [routeParams]);

	return (
		<Root
			header={competitionResults && <CompetitionFinalizeAppHeader pageLayout={pageLayout} />}
			contentToolbar={
				routeParams.mailId ? (
					<CompetitionFinalizeToolbar />
				) : (
					resultCount &&
					competitionResults &&
					winnerCount &&
					winnerBackupCount && (
						<CompetitionFinalizesToolbar
							folders={folders}
							winnerCount={winnerCount}
							winnerBackupCount={winnerBackupCount}
							reloadWinnerCount={(reloadWinnerCount, data) => reloadWinnerCount && setWinnerCount(data)}
							reloadWinnerBackupCount={(reloadWinnerBackupCount, data) =>
								reloadWinnerBackupCount && setWinnerBackupCount(data)
							}
							totalResultCount={resultCount}
							inPageResultCount={competitionResults.length}
							checkedResults={checkedResults}
							reloadCompetitionResults={reloadCompetitionResults =>
								reloadCompetitionResults && competitionResults.length !== 10 && loadCompetitionResults()
							}
							checkedResultsClear={(checkedResultsClear, competition_results) => {
								if (checkedResultsClear) {
									let filtered = competitionResults.filter(value => {
										return competition_results.find(id => id === value.id) === undefined;
									});
									if (filtered.length === 0) {
										loadCompetitionResults();
									}
									setResultCount(
										resultCount - competition_results.length === 0
											? ''
											: resultCount - competition_results.length
									);
									setCompetitionResults(filtered);
									setCheckedResults([]);
								}
							}}
						/>
					)
				)
			}
			content={
				routeParams.mailId ? (
					<CompetitionFinalizeDetails />
				) : (
					competitionResults && (
						<CompetitionFinalizeList
							competitionResults={competitionResults}
							checkedReload={(checkedReload, items, type) => {
								if (checkedReload) {
									if (type === 'add') {
										setCheckedResults([...checkedResults, items]);
									} else {
										var filtered = checkedResults.filter(function (value) {
											return value !== items;
										});
										setCheckedResults(filtered);
									}
								}
							}}
						/>
					)
				)
			}
			leftSidebarHeader={<CompetitionFinalizeAppSidebarHeader />}
			leftSidebarContent={<CompetitionFinalizeAppSidebarContent folders={folders} />}
			ref={pageLayout}
			innerScroll
		/>
	);
}

export default withReducer('mailApp', reducer)(CompetitionFinalizeApp);
