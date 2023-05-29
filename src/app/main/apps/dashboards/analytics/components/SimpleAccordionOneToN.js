import Icon from "@mui/material/Icon";
import Typography from "@mui/material/Typography";
import _ from "@lodash";
import { useTranslation } from "react-i18next";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMore from "@mui/icons-material/ExpandMore";

function SimpleAccordionOneToN(props) {
  const { i18nAppName, i18nTitle, i18nDesc, todos } = props;
  const { t } = useTranslation(i18nAppName);

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div className="flex items-center py-4">
          <Icon color="action">help_outline</Icon>
          <Typography className="px-12 font-medium">{t(i18nTitle)}</Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {todos.map((todo) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <div className="flex items-center py-4">
                <Icon color={todo.todo_state === 1 ? "success" : "action"}>
                  done_outline
                </Icon>
                <Typography className="px-12 font-medium">
                  {t("CHOOSENLANGUAGE") === "TR"
                    ? todo.todo_title
                    : todo.todo_title_en}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {t("CHOOSENLANGUAGE") === "TR"
                  ? todo.todo_description
                  : todo.todo_description_en}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}

export default SimpleAccordionOneToN;
