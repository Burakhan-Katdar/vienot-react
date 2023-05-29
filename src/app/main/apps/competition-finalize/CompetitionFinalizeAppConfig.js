import i18next from "i18next";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import en from "./i18n/en";
import tr from "./i18n/tr";

const CompetitionFinalizeApp = lazy(() => import("./CompetitionFinalizeApp"));

i18next.addResourceBundle("en", "competitionFinalizeApp", en);
i18next.addResourceBundle("tr", "competitionFinalizeApp", tr);

const CompetitionFinalizeAppConfig = {
  settings: {
    layout: {},
  },
  routes: [
    // {
    //   path: "apps/competition-finalize/label/:labelHandle",
    //   element: <CompetitionFinalizeApp />,
    //   children: [{ path: ":mailId", element: <CompetitionFinalizeApp /> }],
    // },
    // {
    //   path: "apps/competition-finalize/filter/:filterHandle",
    //   element: <CompetitionFinalizeApp />,
    //   children: [{ path: ":mailId", element: <CompetitionFinalizeApp /> }],
    // },
    // {
    //   path: "/apps/competition-finalize/:folderHandle",
    //   element: <CompetitionFinalizeApp />,
    //   children: [{ path: ":mailId", element: <CompetitionFinalizeApp /> }],
    // },
    {
      path: "/apps/competition-finalize/:competitionId/:folderHandle",
      element: <CompetitionFinalizeApp />,
      // children: [
      //   { path: ":competitionId", element: <CompetitionFinalizeApp /> },
      // ],
    },
    {
      path: "apps/competition-finalize",
      element: <Navigate to="/apps/competition-finalize/will-be-reviewed" />,
    },
  ],
};

export default CompetitionFinalizeAppConfig;
