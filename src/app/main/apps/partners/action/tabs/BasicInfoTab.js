import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useFormContext, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

function BasicInfoTab(props) {
  const { t } = useTranslation('actionsApp');
  const methods = useFormContext();
  const { control, formState } = methods;

  return (
    <div>
      <Controller
        name="competition_name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            InputLabelProps={{
              shrink: true,
            }}
            required
            label={t('NAME_INPUT')}
            autoFocus
            id="competition_name"
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="competition_description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            InputLabelProps={{
              shrink: true,
            }}
            id="competition_description"
            label={t('DESCRIPTION_INPUT')}
            type="text"
            multiline
            rows={5}
            variant="outlined"
            fullWidth
          />
        )}
      />

      <Controller
        name="competition_is_paid"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            id="competition_is_paid"
            label={t('IS_PAID_INPUT')}
            select
            value={0}
            disabled={true}
            variant="outlined"
            fullWidth
          >
            <MenuItem value={1}>{t('YES')}</MenuItem>
            <MenuItem value={0}>{t('NO')}</MenuItem>
          </TextField>
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
