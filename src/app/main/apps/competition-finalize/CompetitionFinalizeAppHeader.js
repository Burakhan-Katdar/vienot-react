import Hidden from "@mui/material/Hidden";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ThemeProvider } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { selectMainTheme } from "app/store/fuse/settingsSlice";
import { setMailsSearchText } from "./store/mailsSlice";
import { motion } from "framer-motion";

function CompetitionFinalizeAppHeader(props) {
  const dispatch = useDispatch();
  const searchText = useSelector(({ mailApp }) => mailApp.mails.searchText);
  const mainTheme = useSelector(selectMainTheme);
  const { t } = useTranslation("competitionFinalizeApp");

  return (
    <ThemeProvider theme={mainTheme}>
      <div className="flex flex-1">
        <div className="flex items-center">
          <Typography
            component={motion.span}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.2 } }}
            delay={300}
            className="text-16 md:text-24 font-semibold"
          >
            {t('HEADER')}
          </Typography>
        </div>
        {/* <Paper className="flex items-center w-full h-48 sm:h-56 p-16 ltr:pl-4 lg:ltr:pl-16 rtl:pr-4 lg:rtl:pr-16 shadow">
          <Hidden lgUp>
            <IconButton
              onClick={(ev) => props.pageLayout.current.toggleLeftSidebar()}
              aria-label="open left sidebar"
              size="large"
            >
              <Icon>menu</Icon>
            </IconButton>
          </Hidden>

          <Icon color="action">search</Icon>

          <Input
            placeholder={t('SEARCH_PLACEHOLDER')}
            className="px-16"
            disableUnderline
            fullWidth
            value={searchText}
            inputProps={{
              'aria-label': 'Search',
            }}
            onChange={(ev) => dispatch(setMailsSearchText(ev))}
          />
        </Paper> */}
      </div>
    </ThemeProvider>
  );
}

export default CompetitionFinalizeAppHeader;
