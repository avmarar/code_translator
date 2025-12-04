import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { type Dispatch, type SetStateAction } from "react";

type SelectDropdownProps = {
  label: string;
  lang: string;
  handleChange: Dispatch<SetStateAction<string>>;
};

const SelectDropdown = ({ label, lang, handleChange }: SelectDropdownProps) => {
  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }} size="small">
      <InputLabel id={`${label}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${label}-select-label`}
        id={`${label}-select`}
        value={lang}
        label="Language"
        onChange={(e) => handleChange(e.target.value as string)}
      >
        <MenuItem value="Go">Go</MenuItem>
        <MenuItem value="Javascript">Javascript</MenuItem>
        <MenuItem value="Perl">Perl</MenuItem>
        <MenuItem value="PHP">PHP</MenuItem>
        <MenuItem value="Python">Python</MenuItem>
        <MenuItem value="Ruby">Ruby</MenuItem>
        <MenuItem value="TypeScript">TypeScript</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectDropdown;
