import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import _ from "@lodash";
import ReactApexChart from "react-apexcharts";
import { useTranslation } from "react-i18next";

function ColorfullGraphicCard(props) {
  const {
    i18nAppName,
    i18nTitle,
    i18nDesc,
    number,
    highRate,
    graphicColor,
    graphicDatas,
    graphicXAxisColumns
  } = props;
  const { t } = useTranslation(i18nAppName);
  const series = [
    {
      name: t(i18nTitle),
      data: graphicDatas,
    },
  ];
  const options = {
    chart: {
      type: "area",
      height: "100%",
      sparkline: {
        enabled: true,
      },
    },
    fill: {
      type: "solid",
      opacity: 0.7,
    },
    xaxis: {
      categories: graphicXAxisColumns,
    },
    tooltip: {
      followCursor: true,
      theme: "dark",
      fixed: {
        enabled: false,
        position: "topRight",
        offsetX: 0,
        offsetY: 0,
      },
    },
    colors: [graphicColor],
  };

  return (
    <Card className="w-full rounded-20 shadow">
      <div className="p-20 pb-0">
        <Typography className="h3 font-medium">{t(i18nTitle)}</Typography>

        <div className="flex flex-row flex-wrap items-center mt-12">
          <Typography className="text-48 font-semibold leading-none tracking-tighter">
            {number}
          </Typography>

          <div className="flex flex-col mx-8">
            {highRate > 0 && (
              <Icon className="text-green text-20">trending_up</Icon>
            )}
            {highRate < 0 && (
              <Icon className="text-red text-20">trending_down</Icon>
            )}
            <div className="flex items-center">
              <Typography className="font-semibold" color="textSecondary">
                {highRate}%
              </Typography>
              <Typography
                className="whitespace-nowrap mx-4"
                color="textSecondary"
              >
                {t(i18nDesc)}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="h-96 w-100-p">
        <ReactApexChart
          options={options}
          series={series}
          type={options.chart.type}
          height={options.chart.height}
        />
      </div>
    </Card>
  );
}

export default ColorfullGraphicCard;
