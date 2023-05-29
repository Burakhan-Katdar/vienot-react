import React, { useState, useEffect } from 'react';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import _ from '@lodash';
import { motion } from 'framer-motion';
import reducer from './store';
import { selectWidgetsEntities, getWidgets } from './store/widgetsSlice';
import { useTranslation } from 'react-i18next';
import ColorfullSimpleCard from './components/ColorfullSimpleCard';
import ColorfullFullWidthGraphicCard from './components/ColorfullFullWidthGraphicCard';
import SimpleAccordionOneToN from './components/SimpleAccordionOneToN';
import Api from 'app/fuse-configs/Api';
import Typography from '@mui/material/Typography';

const monthsTR = [
	'Ocak',
	'Şubat',
	'Mart',
	'Nisan',
	'Mayıs',
	'Haziran',
	'Temmuz',
	'Ağustos',
	'Eylül',
	'Ekim',
	'Kasım',
	'Aralık'
];

const monthsEN = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

function AnalyticsDashboardApp() {
	const user = useSelector(({ auth }) => auth.user);
	const dispatch = useDispatch();
	const widgets = useSelector(selectWidgetsEntities);
	const { t } = useTranslation('summaryApp');
	const [followCount, setFollowCount] = useState(0);
	const [retweetCount, setRetweetCount] = useState(0);
	const [favoriteCount, setFavoriteCount] = useState(0);
	const [hashtagCount, setHashtagCount] = useState(0);
	const [invitedFriendCount, setInvitedFriendCount] = useState(0);
	const [rightCount, setRightCount] = useState(0);
	const [youtubeSubscriberCount, setYoutubeSubscriberCount] = useState(0);
	const [youtubeLikeCount, setYoutubeLikeCount] = useState(0);
	const [discordUserCount, setDiscordUserCount] = useState(0);
	const [userActions, setUserActions] = useState([]);
	const [todos, setTodos] = useState([]);

	const timeReadyForXAlign = day => {
		let dateFirst = new Date(new Date().setDate(new Date().getDate() - day));
		if (t('CHOOSENLANGUAGE') === 'EN') {
			return +dateFirst.getDate() + ' ' + monthsEN[+dateFirst.getMonth()];
		} else {
			return +dateFirst.getDate() + ' ' + monthsTR[+dateFirst.getMonth()];
		}
	};

	const loadData = () => {
		Api.getCompanySummaryAnalytics().then(response => {
			console.log(response);
			setFollowCount(response.data.data.followCount);
			setRetweetCount(response.data.data.retweetCount);
			setFavoriteCount(response.data.data.favoriteCount);
			setHashtagCount(response.data.data.hashtagCount);
			setRightCount(response.data.data.rightCount);
			setYoutubeSubscriberCount(response.data.data.youtubeSubscriberCount);
			setYoutubeLikeCount(response.data.data.youtubeLikeCount);
			setDiscordUserCount(response.data.data.discordServerJoinCount);
			setTimeout(() => {
				setUserActions(response.data.data.userActions);
			}, 5000);
		});
		// Api.getTodos().then(response => {
		// 	setTodos(response.data.data);
		// });
	};

	const findImpressionsByDay = (higherDay, lowerDay) => {
		return userActions.filter(
			item =>
				new Date(
					item.user_competition_conditions_updated_at.split(' ')[0].split('-')[0],
					item.user_competition_conditions_updated_at.split(' ')[0].split('-')[1] - 1,
					item.user_competition_conditions_updated_at.split(' ')[0].split('-')[2],
					item.user_competition_conditions_updated_at.split(' ')[1].split(':')[0],
					item.user_competition_conditions_updated_at.split(' ')[1].split(':')[1],
					item.user_competition_conditions_updated_at.split(' ')[1].split(':')[2]
				).getTime() >= new Date().setDate(new Date().getDate() - higherDay) &&
				new Date(
					item.user_competition_conditions_updated_at.split(' ')[0].split('-')[0],
					item.user_competition_conditions_updated_at.split(' ')[0].split('-')[1] - 1,
					item.user_competition_conditions_updated_at.split(' ')[0].split('-')[2],
					item.user_competition_conditions_updated_at.split(' ')[1].split(':')[0],
					item.user_competition_conditions_updated_at.split(' ')[1].split(':')[1],
					item.user_competition_conditions_updated_at.split(' ')[1].split(':')[2]
				).getTime() <= new Date().setDate(new Date().getDate() - lowerDay)
		).length;
	};

	useEffect(() => {
		loadData();
	}, []);

	useEffect(() => {
		dispatch(getWidgets());
	}, [dispatch]);

	if (_.isEmpty(widgets)) {
		return null;
	}

	const container = {
		show: {
			transition: {
				staggerChildren: 0.06
			}
		}
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 }
	};

	return (
		<div className="w-full">
			<motion.div
				className="flex flex-col md:flex-row sm:p-8 container"
				variants={container}
				initial="hidden"
				animate="show"
			>
				<div className="flex flex-1 flex-col min-w-0 pt-16">
					<Typography
						component={motion.div}
						variants={item}
						className="px-16 pb-8 text-18 font-medium"
						color="textSecondary"
					>
						{rightCount} {t('RIGHT_COUNT')}
					</Typography>

					{/* <SimpleAccordionOneToN i18nAppName={'summaryApp'} i18nTitle={'ACCORDION_TITLE'} todos={todos} /> */}

					{/* <Typography
            component={motion.div}
            variants={item}
            className="px-16 pb-8 text-18 font-medium"
            color="textSecondary"
          >
            {t("TOPTEXTHOWAREYOUR")}
          </Typography> */}

					{/* <div className="flex flex-col sm:flex sm:flex-row pb-32">
            <motion.div
              variants={item}
              className="widget flex w-full sm:w-1/3 p-16"
            >
              <ColorfullGraphicCard
                i18nAppName={"summaryApp"}
                i18nTitle={"CONVERSION"}
                i18nDesc={"INCREASE"}
                number={492}
                highRate={13}
                graphicColor={"#100b38"}
                graphicDatas={[221, 428, 380, 471, 413, 344, 494]}
                graphicXAxisColumns={[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ]}
              />
            </motion.div>

            <motion.div
              variants={item}
              className="widget flex w-full sm:w-1/3 p-16"
            >
              <ColorfullGraphicCard
                i18nAppName={"summaryApp"}
                i18nTitle={"CONVERSION"}
                i18nDesc={"INCREASE"}
                number={123}
                highRate={9}
                graphicColor={"#5442f5"}
                graphicDatas={[221, 428, 380, 471, 413, 344, 494]}
                graphicXAxisColumns={[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ]}
              />
            </motion.div>

            <motion.div variants={item} className="widget w-full sm:w-1/3 p-16">
              <ColorfullGraphicCard
                i18nAppName={"summaryApp"}
                i18nTitle={"CONVERSION"}
                i18nDesc={"DECREASE"}
                number={65}
                highRate={-7}
                graphicColor={"#f54242"}
                graphicDatas={[221, 428, 380, 471, 413, 344, 494]}
                graphicXAxisColumns={[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ]}
              />
            </motion.div>
          </div> */}

					<motion.div className="flex flex-wrap" variants={container} initial="hidden" animate="show">
						<motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
							<ColorfullSimpleCard
								i18nAppName={'summaryApp'}
								i18nTitle={'FOLLOW'}
								bigNumber={followCount}
								bigNumberDesc={t('ADET')}
								smallDesc={t('YOUWIN')}
								smallNumber={''}
								color={'blue'}
								tooltipText={'FOLLOW_TOOLTIP'}
							/>
						</motion.div>
						<motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
							<ColorfullSimpleCard
								i18nAppName={'summaryApp'}
								i18nTitle={'RETWEET'}
								bigNumber={retweetCount}
								bigNumberDesc={t('ADET')}
								smallDesc={t('YOUWIN')}
								smallNumber={''}
								color={'blue'}
								tooltipText={'RETWEET_TOOLTIP'}
							/>
						</motion.div>
						<motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
							<ColorfullSimpleCard
								i18nAppName={'summaryApp'}
								i18nTitle={'LIKE'}
								bigNumber={favoriteCount}
								bigNumberDesc={t('ADET')}
								smallDesc={t('YOUWIN')}
								smallNumber={''}
								color={'blue'}
								tooltipText={'FAVORITE_TOOLTIP'}
							/>
						</motion.div>
						<motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
							<ColorfullSimpleCard
								i18nAppName={'summaryApp'}
								i18nTitle={'HASHTAG'}
								bigNumber={hashtagCount}
								bigNumberDesc={t('ADET')}
								smallDesc={t('YOUWIN')}
								smallNumber={''}
								color={'blue'}
								tooltipText={'HASHTAG_TOOLTIP'}
							/>
						</motion.div>
						<motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
							<ColorfullSimpleCard
								i18nAppName={'summaryApp'}
								i18nTitle={'SUBSCRIBER'}
								bigNumber={youtubeSubscriberCount}
								bigNumberDesc={t('ADET')}
								smallDesc={t('YOUWIN')}
								smallNumber={''}
								color={'red'}
								tooltipText={'SUBSCRIBER_TOOLTIP'}
							/>
						</motion.div>
						<motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
							<ColorfullSimpleCard
								i18nAppName={'summaryApp'}
								i18nTitle={'YOUTUBE_LIKES'}
								bigNumber={youtubeLikeCount}
								bigNumberDesc={t('ADET')}
								smallDesc={t('YOUWIN')}
								smallNumber={''}
								color={'red'}
								tooltipText={'YOUTUBE_LIKES_TOOLTIP'}
							/>
						</motion.div>
						<motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
							<ColorfullSimpleCard
								i18nAppName={'summaryApp'}
								i18nTitle={'DISCORD_USER'}
								bigNumber={discordUserCount}
								bigNumberDesc={t('ADET')}
								smallDesc={t('YOUWIN')}
								smallNumber={''}
								color={'black'}
								tooltipText={'JOIN_TOOLTIP'}
							/>
						</motion.div>
						<motion.div variants={item} className="widget flex w-full sm:w-1/2 md:w-1/4 p-12">
							<ColorfullSimpleCard
								i18nAppName={'summaryApp'}
								i18nTitle={'INVITED_FRIENDS'}
								bigNumber={invitedFriendCount}
								bigNumberDesc={t('ADET')}
								smallDesc={t('YOUWIN')}
								smallNumber={''}
								color={'black'}
								tooltipText={'INVITED_FRIENDS_TOOLTIP'}
							/>
						</motion.div>
					</motion.div>

					{/* <Typography
            component={motion.div}
            variants={item}
            className="px-16 pb-8 text-18 font-medium"
            color="textSecondary"
          >
            How many pages your users visit?
          </Typography>

          <motion.div variants={item} className="widget w-full p-16 pb-48">
            <Widget5 data={widgets.widget5} />
          </motion.div>

          <Typography
            component={motion.div}
            variants={item}
            className="px-16 pb-8 text-18 font-medium"
            color="textSecondary"
          >
            Where are your users?
          </Typography>

          <motion.div variants={item} className="widget w-full p-16 pb-32">
            <Widget6 data={widgets.widget6} />
          </motion.div> */}
				</div>
				{/* <div className="flex flex-wrap w-full md:w-320 pt-16">
          <div className="mb-32 w-full sm:w-1/2 md:w-full">
            <Typography
              component={motion.div}
              variants={item}
              className="px-16 pb-8 text-18 font-medium"
              color="textSecondary"
            >
              What are your top devices?
            </Typography>

            <motion.div variants={item} className="widget w-full p-16">
              <Widget7 data={widgets.widget7} />
            </motion.div>
          </div>

          <div className="mb-32 w-full sm:w-1/2 md:w-full">
            <Typography
              component={motion.div}
              variants={item}
              className="px-16 pb-8 text-18 font-medium"
              color="textSecondary"
            >
              How are your sales?
            </Typography>

            <motion.div variants={item} className="widget w-full p-16">
              <Widget8 data={widgets.widget8} />
            </motion.div>
          </div>

          <div className="mb-32 w-full sm:w-1/2 md:w-full">
            <Typography
              component={motion.div}
              variants={item}
              className="px-16 pb-8 text-18 font-medium lg:pt-0"
              color="textSecondary"
            >
              What are your top campaigns?
            </Typography>
            <motion.div variants={item} className="widget w-full p-16">
              <Widget9 data={widgets.widget9} />
            </motion.div>
          </div>
        </div> */}
			</motion.div>
			<ColorfullFullWidthGraphicCard
				i18nAppName={'summaryApp'}
				i18nTitle={'IMPRESSIONS'}
				i18nDesc={'IMPRESSIONSDESC'}
				seriesBase={{
					7: [
						{
							name: t('IMPRESSIONS'),
							data: [
								findImpressionsByDay(7, 6),
								findImpressionsByDay(6, 5),
								findImpressionsByDay(5, 4),
								findImpressionsByDay(4, 3),
								findImpressionsByDay(3, 2),
								findImpressionsByDay(2, 1),
								findImpressionsByDay(1, 0)
							],
							fill: 'start'
						}
					],
					15: [
						{
							name: t('IMPRESSIONS'),
							data: [
								findImpressionsByDay(16, 15),
								findImpressionsByDay(15, 14),
								findImpressionsByDay(14, 13),
								findImpressionsByDay(13, 12),
								findImpressionsByDay(12, 11),
								findImpressionsByDay(11, 10),
								findImpressionsByDay(10, 9),
								findImpressionsByDay(9, 8),
								findImpressionsByDay(8, 7),
								findImpressionsByDay(7, 6),
								findImpressionsByDay(6, 5),
								findImpressionsByDay(5, 4),
								findImpressionsByDay(4, 3),
								findImpressionsByDay(3, 2),
								findImpressionsByDay(2, 1)
							],
							fill: 'start'
						}
					],
					30: [
						{
							name: t('IMPRESSIONS'),
							data: [
								findImpressionsByDay(31, 30),
								findImpressionsByDay(30, 29),
								findImpressionsByDay(29, 28),
								findImpressionsByDay(28, 27),
								findImpressionsByDay(27, 26),
								findImpressionsByDay(26, 25),
								findImpressionsByDay(25, 24),
								findImpressionsByDay(24, 23),
								findImpressionsByDay(23, 22),
								findImpressionsByDay(22, 21),
								findImpressionsByDay(21, 20),
								findImpressionsByDay(20, 19),
								findImpressionsByDay(19, 18),
								findImpressionsByDay(18, 17),
								findImpressionsByDay(17, 16),
								findImpressionsByDay(16, 15),
								findImpressionsByDay(15, 14),
								findImpressionsByDay(14, 13),
								findImpressionsByDay(13, 12),
								findImpressionsByDay(12, 11),
								findImpressionsByDay(11, 10),
								findImpressionsByDay(10, 9),
								findImpressionsByDay(9, 8),
								findImpressionsByDay(8, 7),
								findImpressionsByDay(7, 6),
								findImpressionsByDay(6, 5),
								findImpressionsByDay(5, 4),
								findImpressionsByDay(4, 3),
								findImpressionsByDay(3, 2),
								findImpressionsByDay(2, 1)
							],
							fill: 'start'
						}
					]
				}}
				color={'#00c3ff'}
				graphicXAxisColumns1stTab={[
					timeReadyForXAlign(7),
					timeReadyForXAlign(6),
					timeReadyForXAlign(5),
					timeReadyForXAlign(4),
					timeReadyForXAlign(3),
					timeReadyForXAlign(2),
					timeReadyForXAlign(1),
					timeReadyForXAlign(0)
				]}
				graphicXAxisColumns2ndTab={[
					timeReadyForXAlign(15),
					timeReadyForXAlign(14),
					timeReadyForXAlign(13),
					timeReadyForXAlign(12),
					timeReadyForXAlign(11),
					timeReadyForXAlign(10),
					timeReadyForXAlign(9),
					timeReadyForXAlign(8),
					timeReadyForXAlign(7),
					timeReadyForXAlign(6),
					timeReadyForXAlign(5),
					timeReadyForXAlign(4),
					timeReadyForXAlign(3),
					timeReadyForXAlign(2),
					timeReadyForXAlign(1),
					timeReadyForXAlign(0)
				]}
				graphicXAxisColumns3rdTab={[
					timeReadyForXAlign(30),
					timeReadyForXAlign(29),
					timeReadyForXAlign(28),
					timeReadyForXAlign(27),
					timeReadyForXAlign(26),
					timeReadyForXAlign(25),
					timeReadyForXAlign(24),
					timeReadyForXAlign(23),
					timeReadyForXAlign(22),
					timeReadyForXAlign(21),
					timeReadyForXAlign(20),
					timeReadyForXAlign(19),
					timeReadyForXAlign(18),
					timeReadyForXAlign(17),
					timeReadyForXAlign(16),
					timeReadyForXAlign(15),
					timeReadyForXAlign(14),
					timeReadyForXAlign(13),
					timeReadyForXAlign(12),
					timeReadyForXAlign(11),
					timeReadyForXAlign(10),
					timeReadyForXAlign(9),
					timeReadyForXAlign(8),
					timeReadyForXAlign(7),
					timeReadyForXAlign(6),
					timeReadyForXAlign(5),
					timeReadyForXAlign(4),
					timeReadyForXAlign(3),
					timeReadyForXAlign(2),
					timeReadyForXAlign(1),
					timeReadyForXAlign(0)
				]}
			/>
		</div>
	);
}

export default withReducer('analyticsDashboardApp', reducer)(AnalyticsDashboardApp);
