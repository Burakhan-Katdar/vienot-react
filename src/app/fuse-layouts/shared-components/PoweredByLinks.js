import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { motion } from 'framer-motion';

function PoweredByLinks(props) {
	const container = {
		show: {
			transition: {
				staggerChildren: 0.1
			}
		}
	};

	const item = {
		hidden: { opacity: 0, scale: 0.6 },
		show: { opacity: 1, scale: 1 }
	};

	return (
		<motion.div variants={container} initial="hidden" animate="show" className="flex items-center">
			{/* <Tooltip title="React" placement="top">
				<IconButton
					className="w-48 h-48 px-4"
					component={motion.a}
					variants={item}
					href="https://reactjs.org/"
					target="_blank"
					rel="noreferrer noopener"
					role="button"
					size="large"
				>
					<img
						src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K"
						alt="react"
						width="32"
					/>
				</IconButton>
			</Tooltip>
			<Tooltip variants={item} title="Tailwind" placement="top">
				<IconButton
					className="w-48 h-48 px-4"
					component={motion.a}
					variants={item}
					href="https://tailwindcss.com"
					target="_blank"
					rel="noreferrer noopener"
					role="button"
					size="large"
				>
					<span
						dangerouslySetInnerHTML={{
							__html: `
                      <svg style="height: 0; width: 0; position: absolute; visibility: hidden;">
                        <defs>
                          <linearGradient x1="0%" y1="0%" y2="100%" id="logoGradient">
                            <stop stop-color="#2383AE" offset="0%"></stop>
                            <stop stop-color="#6DD7B9" offset="100%"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                      <svg class="w-48 h-48 block" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 11.1C15.3 3.9 19.8.3 27 .3c10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 27.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" transform="translate(5 16)" fill="url(#logoGradient)" fill-rule="evenodd"></path></svg>
                      `
						}}
					/>
				</IconButton>
			</Tooltip> */}
			<Tooltip title="Twitter" placement="top">
				<IconButton
					className="w-48 h-48 px-4"
					component={motion.a}
					variants={item}
					href={props.defaultTexts['twitter_link']}
					target="_blank"
					rel="noreferrer noopener"
					role="button"
					size="large"
				>
					<img width="50" src={'assets/images/logos/twitter-white.png'} alt="twitter_logo" />
				</IconButton>
			</Tooltip>
			<Tooltip title="Discord" placement="top">
				<IconButton
					className="w-48 h-48 px-4"
					component={motion.a}
					variants={item}
					href={props.defaultTexts['discord_link']}
					target="_blank"
					rel="noreferrer noopener"
					role="button"
					size="large"
				>
					<img width="50" src={'assets/images/logos/discord-white.png'} alt="discord_logo" />
				</IconButton>
			</Tooltip>
			<Tooltip title="Telegram" placement="top">
				<IconButton
					className="w-48 h-48 px-4"
					component={motion.a}
					variants={item}
					href={props.defaultTexts['telefram_link']}
					target="_blank"
					rel="noreferrer noopener"
					role="button"
					size="large"
				>
					<img width="50" src={'assets/images/logos/telegram-white.png'} alt="telegram_logo" />
				</IconButton>
			</Tooltip>
		</motion.div>
	);
}

export default PoweredByLinks;
