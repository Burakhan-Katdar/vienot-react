import AppBar from '@mui/material/AppBar';
import { ThemeProvider } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import PoweredByLinks from 'app/fuse-layouts/shared-components/PoweredByLinks';
import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFooterTheme } from 'app/store/fuse/settingsSlice';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

function FooterLayout1(props) {
	const footerTheme = useSelector(selectFooterTheme);
	const { t } = useTranslation('summaryApp');
	return (
		<ThemeProvider theme={footerTheme}>
			<AppBar
				id="fuse-footer"
				className={clsx('relative z-20 shadow-md', props.className)}
				color="default"
				style={{ backgroundColor: footerTheme.palette.background.paper }}
			>
				<Toolbar className="min-h-48 md:min-h-64 px-8 sm:px-12 py-0 flex items-center overflow-x-auto">
					<div className="flex grow shrink-0">
						<a href='https://tr.litepaper.vienot.app/yardim/kullanici-soezlesmesi' target='_blank' style={{ background: 'none' }}>
							<span className="mx-4">{t('KULLANICISOZLESMESI')}</span>
						</a>  | <a href='https://tr.litepaper.vienot.app/yardim/partner-soezlesmesi' target='_blank' style={{ background: 'none' }}>
							<span className="mx-4">{t('PARTNERSOZLESMESI')}</span>
						</a> | <a href='https://tr.litepaper.vienot.app/yardim/gizlilik-politikasi' target='_blank' style={{ background: 'none' }}>
							<span className="mx-4">{t('GIZLILIKSOZLESMESI')}</span>
						</a> | <a href='https://tr.litepaper.vienot.app/yardim/cerez-politikasi' target='_blank' style={{ background: 'none' }}>
							<span className="mx-4">{t('COOKIESOZLESMESI')}</span>
						</a>
						{/* <span className="mx-4">{t('CONTACTUS')}</span> */}
						{/* <PurchaseButton className="mx-4" />
            				<DocumentationButton className="mx-4" /> */}
					</div>

					{props.defaultTexts['footer_copyright_text']}

					<div className="flex grow shrink-0 px-12 justify-end">
						<PoweredByLinks defaultTexts={props.defaultTexts} />
					</div>
				</Toolbar>
			</AppBar>
		</ThemeProvider>
	);
}

export default memo(FooterLayout1);
