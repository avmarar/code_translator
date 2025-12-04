import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { type Dispatch, type SetStateAction } from "react";

import { LANGUAGE_OPTIONS } from "../constants";

type SelectDropdownProps = {
  label: string;
  lang: string;
  handleChange: Dispatch<SetStateAction<string>>;
};

const SelectDropdown = ({ label, lang, handleChange }: SelectDropdownProps) => {
  return (
    <FormControl
      variant="standard"
      sx={{
        m: 1,
        minWidth: 180,
        "& .MuiInput-input": { color: "#1A1F3B" },
        "& .MuiInput-underline:before": { borderBottomColor: "#8A93B7" },
        "& .MuiInput-underline:hover:before": { borderBottomColor: "#28C2B6" },
        "& .MuiInput-underline:after": { borderBottomColor: "#28C2B6" },
      }}
      size="small"
    >
      <InputLabel
        id={`${label}-select-label`}
        sx={{ color: "#8A93B7", "&.Mui-focused": { color: "#28C2B6" } }}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        value={lang}
        label="Language"
        onChange={(e) => handleChange(e.target.value as string)}
        sx={{
          color: "#1A1F3B",
          ".MuiSelect-icon": { color: "#28C2B6" },
        }}
      >
        {LANGUAGE_OPTIONS.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectDropdown;
