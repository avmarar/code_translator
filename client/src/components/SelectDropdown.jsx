import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectDropdown = ({ label, lang, handleChange }) => {
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lang}
          label="Language"
          onChange={(e) => handleChange(e.target.value)}
        >
          <MenuItem value={"Go"}>Go</MenuItem>
          <MenuItem value={"Javascript"}>Javascript</MenuItem>
          <MenuItem value={"Perl"}>Perl</MenuItem>
          <MenuItem value={"PHP"}>PHP</MenuItem>
          <MenuItem value={"Python"}>Python</MenuItem>
          <MenuItem value={"Ruby"}>Ruby</MenuItem>
          <MenuItem value={"TypeScript"}>TypeScript</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectDropdown;
