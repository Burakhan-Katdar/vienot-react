import { memo } from "react";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Tooltip from "@mui/material/Tooltip";

function ColorfullSimpleCard(props) {
  const {
    i18nAppName,
    i18nTitle,
    bigNumber,
    bigNumberDesc,
    smallDesc,
    smallNumber,
    color,
    tooltipText,
  } = props;
  const { t } = useTranslation(i18nAppName);
  return (
    <Paper className="w-full rounded-20 shadow flex flex-col justify-between">
      <div className="flex items-center justify-between px-4 pt-8">
        <Typography className="text-16 px-16 font-medium" color="textSecondary">
          {t(i18nTitle)}
        </Typography>
        <Tooltip title={t(tooltipText)} placement="top-start">
          <IconButton aria-label="more" size="large">
            <Icon>help</Icon>
          </IconButton>
        </Tooltip>
      </div>
      <div className="text-center py-12">
        <Typography
          className={`text-72 font-semibold leading-none text-${color} tracking-tighter`}
        >
          {bigNumber}
        </Typography>
        <Typography className={`text-18 font-normal text-${color}-800`}>
          {bigNumberDesc}
        </Typography>
      </div>
      <Typography
        className="p-20 pt-0 h-56 flex justify-center items-end text-13 font-medium"
        color="textSecondary"
      >
        <span className="truncate">{smallDesc}</span>
        <b className="px-8">{smallNumber}</b>
      </Typography>
    </Paper>
  );
}

export default memo(ColorfullSimpleCard);
