import { styled, ThemeProvider, useTheme, alpha } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { memo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { selectContrastMainTheme } from "app/store/fuse/settingsSlice";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

const Root = styled("div")(({ theme }) => ({
  background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
  color: theme.palette.primary.contrastText,
}));

function ColorfullFullWidthGraphicCard(props) {
  const {
    i18nAppName,
    i18nTitle,
    i18nDesc,
    seriesBase,
    color,
    graphicXAxisColumns3rdTab,
    graphicXAxisColumns2ndTab,
    graphicXAxisColumns1stTab,
  } = props;
  const { t } = useTranslation(i18nAppName);
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(2);
  const contrastTheme = useSelector(
    selectContrastMainTheme(theme.palette.primary.main)
  );
  const options = {
    chart: {
      type: "area",
      height: "100%",
      background: "transparent",
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    theme: {
      mode: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: tabValue === 2 ? graphicXAxisColumns3rdTab : tabValue === 1 ? graphicXAxisColumns2ndTab : graphicXAxisColumns1stTab,
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
    },
    markers: {
      size: 3,
      strokeWidth: 1.5,
      strokeOpacity: 1,
      strokeDashArray: 0,
      fillOpacity: 1,
      shape: "circle",
      radius: 2,
      hover: {
        size: 5,
      },
      colors: [color],
    },
    fill: {
      type: "solid",
      opacity: 0.7,
      gradient: {
        shadeIntensity: 0.4,
        opacityFrom: 1,
        opacityTo: 0.5,
        stops: [30, 100, 100],
      },
      colors: [color],
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      position: "back",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      borderColor: alpha(color, 0.3),
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      width: 1.5,
      dashArray: 0,
      colors: [color],
    },
  };

  
  const series = seriesBase[Object.keys(seriesBase)[tabValue]];

  return (
    <ThemeProvider theme={contrastTheme}>
      <Root>
        <div className="container relative p-16 sm:p-24 flex flex-col sm:flex-row justify-between items-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-col items-center sm:items-start mb-16 sm:mb-0">
              <Typography className="h2 font-semibold" color="textPrimary">
                {t(i18nTitle)}
              </Typography>
              <Typography className="h5 font-medium" color="textSecondary">
                {t(i18nDesc)}
              </Typography>
            </div>
          </motion.div>

          <div className="flex flex-row items-center">
            <Tabs
              value={tabValue}
              onChange={(event, value) => setTabValue(value)}
              indicatorColor="secondary"
              textColor="inherit"
              variant="scrollable"
              scrollButtons={false}
              className="w-full -mx-4 min-h-40"
              classes={{
                indicator: "flex justify-center bg-transparent w-full h-full",
              }}
              TabIndicatorProps={{
                children: (
                  <Box
                    sx={{ bgcolor: "text.disabled" }}
                    className="w-full h-full rounded-full opacity-20"
                  />
                ),
              }}
            >
              {Object.keys(seriesBase).map((key) => (
                <Tab
                  key={key}
                  className="text-14 font-semibold min-h-40 min-w-64 mx-4 px-12 capitalize"
                  disableRipple
                  label={key}
                />
              ))}
            </Tabs>
          </div>
        </div>
        <div className="container relative h-200 sm:h-256 pb-16">
          <ReactApexChart
            options={options}
            series={series}
            type={options.chart.type}
            height={options.chart.height}
          />
        </div>
      </Root>
    </ThemeProvider>
  );
}

export default memo(ColorfullFullWidthGraphicCard);
