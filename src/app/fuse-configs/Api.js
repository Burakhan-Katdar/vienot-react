import axios from 'axios';
import DefaultURLs from '../../@fuse/utils/DefaultURLs';

class Api {
	axiosInstance;

	constructor() {
		// const hasBasePath = window.location.pathname.indexOf(PATH.BASE_PATH) > -1;

		let baseURL = DefaultURLs.apiBasePointURL;

		// if (hasBasePath) {
		// baseURL = PATH.BASE_PATH + baseURL;
		// }

		const token = window.localStorage.getItem('VienotToken');
		this.axiosInstance = axios.create({
			baseURL: baseURL,
			timeout: 90000,
			headers: { Authorization: `Bearer ${token}` } //-> burada problem var çözülecek
		});
	}

	login = (email, password) => {
		return this.axiosInstance.post('auth', { email, password });
	};

	signUp = userData => {
		return this.axiosInstance.post('auth/register', userData);
	};

	addAccessToken = (access_token, id) => {
		return this.axiosInstance.post('auth/add-access-token', {
			access_token,
			id
		});
	};

	controlAccessToken = () => {
		return this.axiosInstance.get('auth/control-access-token');
	};

	getUsersWithSocialInfos = () => {
		return this.axiosInstance.get('users/get-users-with-social-infos');
	};

	getCompetitions = () => {
		return this.axiosInstance.get('competitions');
	};

	getCompetitionsForCompany = () => {
		return this.axiosInstance.get('competitions/get-competitions-for-company', {
			headers: {
				Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
			}
		});
	};

	getCompetitionById = competition_id => {
		return this.axiosInstance.post(
			'competitions/get-competition-by-id',
			{
				competition_id
			},
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			}
		);
	};

	checkCompetitionWinnersRandom = (competition_id) => {
		return this.axiosInstance.post(
			'competition-results/find-result-of-competition',
			{
				competition_id
			},
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			}
		);
	};

	sendWinnersNotification = (competition_id, user_ids) => {
		return this.axiosInstance.post(
			'notifications/send-winners-notification',
			{
				competition_id,
				user_ids
			},
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			}
		);
	};

	sendAltWinnersNotification = (competition_id, user_ids) => {
		return this.axiosInstance.post(
			'notifications/send-alternative-winners-notification',
			{
				competition_id,
				user_ids
			},
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			}
		);
	};

	sendEventAddedMail = () => {
		return this.axiosInstance.get(
			'emails/send-event-added-mail',
			{},
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			}
		);
	};

	getCompetitionResultsById = (user_id, competition_id, folder_id) => {
		return this.axiosInstance.post('competition-results/get-competition-results-by-id', {
			user_id,
			competition_id,
			folder_id
		});
	};

	integrateResultToFolder = (folder_id, competition_results) => {
		return this.axiosInstance.post('competition-results/integrate-result-to-folder', {
			folder_id,
			competition_results
		});
	};

	chooseWinner = (competition_result_id, winner_place, winner_type) => {
		return this.axiosInstance.post('competition-results/choose-winner', {
			competition_result_id,
			winner_place,
			winner_type
		});
	};

	getCompetitionRights = () => {
		return this.axiosInstance.get('competitions/get-competition-rights');
	};

	getCompanies = () => {
		return this.axiosInstance.get('companies', {
			headers: {
				Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
			}
		});
	};

	getApprovedCompanies = () => {
		return this.axiosInstance.get('companies/approved-companies', {
			headers: {
				Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
			}
		});
	};

	getAllowedConditionsForCompany = (company_id) => {
		return this.axiosInstance.post('companies/get-allowed-conditions-for-company',
			{
				company_id: company_id
			},
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			});
	};

	getAllowedConditionsForMyCompany = () => {
		return this.axiosInstance.get('companies/get-allowed-conditions-for-my-company',
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			});
	};

	updateAllowedConditionsForCompany = (company_id, conditions) => {
		return this.axiosInstance.post('companies/update-allowed-conditions-for-company',
			{
				company_id,
				conditions
			},
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			});
	};

	updateConditionLimitForCompany = (company_id, condition_limit) => {
		return this.axiosInstance.post('companies/update-condition-limit-for-company',
			{
				company_id: company_id,
				condition_limit: condition_limit
			},
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			});
	};

	getInvitations = () => {
		return this.axiosInstance.get('invitations', {
			headers: {
				Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
			}
		});
	};

	getInvitationById = invitation_id => {
		return this.axiosInstance.post(
			'invitations/get-invitation-by-id',
			{
				invitation_id
			},
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			}
		);
	};

	updateInvitation = (invitation_id, message_en, message_tr) => {
		return this.axiosInstance.post(
			'invitations/update-invitation',
			{
				invitation_id,
				message_en,
				message_tr
			},
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			}
		);
	};

	addInvitation = (user_id, code, right, message_en, message_tr) => {
		return this.axiosInstance.post(
			'invitations/add-invitation',
			{
				user_id,
				code,
				right,
				message_en,
				message_tr
			},
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			}
		);
	};

	updateCompanyState = (user_id, state) => {
		return this.axiosInstance.post(
			'companies/update-company-state',
			{ user_id, state },
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			}
		);
	};

	changeCompetitionState = (competition_id, state) => {
		return this.axiosInstance.post(
			'competitions/update-competition-state',
			{
				competition_id,
				state
			},
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			}
		);
	};

	changeCompetitionStateSponsored = (competition_id, state) => {
		return this.axiosInstance.post(
			'competitions/update-competition-state-sponsored',
			{
				competition_id,
				state
			},
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			}
		);
	};

	getConditionLimitForMyCompany = () => {
		return this.axiosInstance.get('companies/get-condition-limit-for-my-company', {
			headers: {
				Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
			}
		});
	};

	getConditionLimitForCompany = (company_id) => {
		return this.axiosInstance.post('companies/get-condition-limit-for-company', {
			company_id: company_id
		}, {
			headers: {
				Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
			}
		});
	};

	getCompanySummaryAnalytics = () => {
		return this.axiosInstance.get('companies/get-company-summary-analytics', {
			headers: {
				Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
			}
		});
	};

	getNotApprovedCompanies = () => {
		return this.axiosInstance.get('companies/not-approved-companies');
	};

	addCompetition = (
		competition_name,
		competition_description,
		competition_video,
		competition_photo,
		competition_second_photo,
		competition_third_photo,
		competition_tweet_link,
		competition_is_paid,
		competition_end_date,
		competition_conditions,
		is_competition,
		competition_winner_count,
		competition_winner_backup_count,
		competition_start_date,
		timezone,
		isLiveTweet
	) => {
		return this.axiosInstance.post(
			'competitions/add-competition',
			{
				competition_name,
				competition_description,
				competition_video,
				competition_photo,
				competition_second_photo,
				competition_third_photo,
				competition_tweet_link,
				competition_is_paid,
				competition_end_date,
				competition_conditions,
				is_competition,
				competition_winner_count,
				competition_winner_backup_count,
				competition_start_date,
				timezone,
				isLiveTweet
			},
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			}
		);
	};

	updateCompetition = (
		competition_id,
		competition_name,
		competition_description,
		competition_video,
		competition_photo,
		competition_second_photo,
		competition_third_photo,
		competition_is_paid,
		competition_end_date
		// competition_tweet_link
	) => {
		return this.axiosInstance.post('competitions/update-competition', {
			competition_id,
			competition_name,
			competition_description,
			competition_video,
			competition_photo,
			competition_second_photo,
			competition_third_photo,
			competition_is_paid,
			competition_end_date
			// competition_tweet_link
		});
	};

	getConditions = () => {
		return this.axiosInstance.get('conditions');
	};

	updateCompanyPhoto = (user_id, company_photo) => {
		return this.axiosInstance.post('companies/update-company-photo', {
			user_id,
			company_photo
		});
	};

	updateCompetitionState = competition_id => {
		return this.axiosInstance.post('competitions/update-competition-state', {
			competition_id
		});
	};

	updateCompetitionStateAdminApproval = competition_id => {
		return this.axiosInstance.post('competitions/update-competition-state-admin-approval', {
			competition_id
		});
	};

	getTodos = () => {
		return this.axiosInstance.get('app-information/get-todos');
	};

	addCompetitionPhoto = photo => {
		return this.axiosInstance.post('competitions/add-competition-photo', {
			photo
		});
	};

	authenticatePartner = () => {
		return this.axiosInstance.get('social-medias/authenticate-partner');
	};

	authenticatePartnerAccessToken = (oauth_token, oauth_verifier) => {
		return this.axiosInstance.post('social-medias/authenticate-partner-access-token', {
			oauth_token,
			oauth_verifier
		});
	};

	sendLiveTweetByCompany = (competition_id, tweet, media) => {
		return this.axiosInstance.post(
			'competitions/send-live-tweet-by-company',
			{
				competition_id,
				tweet,
				media
			},
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			}
		);
	};

	deleteAPhoto = (photo_name, where_from) => {
		return this.axiosInstance.post(
			'competitions/delete-a-photo',
			{
				photo_name,
				where_from
			},
			{
				headers: {
					Authorization: 'Bearer ' + window.localStorage.getItem('VienotToken')
				}
			}
		);
	};

	getDefaultTexts = () => {
		return this.axiosInstance.get(
			'app-information/get-default-texts'
		);
	}
}

export default new Api();
