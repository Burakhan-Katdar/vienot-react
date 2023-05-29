import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import withRouter from "@fuse/core/withRouter";
import ResultListItem from "./ResultListItem";

function CompetitionFinalizeList(props) {
  const { competitionResults, checkedReload } = props;
  const { t } = useTranslation("competitionFinalizeApp");

  if (competitionResults.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          {t("NO_RESULTS")}
        </Typography>
      </motion.div>
    );
  }

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <List className="p-0">
      <motion.div variants={container} initial="hidden" animate="show">
        {competitionResults &&
          competitionResults.map((result) => (
            <motion.div variants={item} key={result.id}>
              <ResultListItem
                result={result}
                checkedResultsReload={(checkedResultsReload, item, type) =>
                  checkedResultsReload && checkedReload(true, item, type)
                }
              />
            </motion.div>
          ))}
        {/* {filteredData.map((mail) => (
          <motion.div variants={item} key={mail.id}>
            <MailListItem mail={mail} />
          </motion.div>
        ))} */}
      </motion.div>
    </List>
  );
}

export default withRouter(CompetitionFinalizeList);
