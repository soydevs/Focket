import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import SortIcon from "@mui/icons-material/Sort";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const SortMenu = ({ setSortKey }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (key) => () => {
    setSortKey(key);
    handleClose();
  };

  return (
    <div>
      <IconButton
        id='basic-button'
        aria-controls='basic-menu'
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        style={{ position: "relative", bottom: 7 }}
      >
        <SortIcon />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClick("old")}>Oldest First</MenuItem>
        <MenuItem onClick={handleClick("new")}>Newest First </MenuItem>
        <MenuItem onClick={handleClick("alph")}>Alphabetical Order</MenuItem>
      </Menu>
    </div>
  );
};

export default SortMenu;
