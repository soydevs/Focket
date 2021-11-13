import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import SortIcon from "@mui/icons-material/Sort";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";

const SortMenu = ({ setSortKey }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id='basic-button'
        aria-controls='basic-menu'
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
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
        <MenuItem onClick={() => setSortKey("old")}>Oldest First</MenuItem>
        <MenuItem onClick={() => setSortKey("new")}>Newest First </MenuItem>
        <MenuItem onClick={() => setSortKey("alph")}>
          Alphabetical Order
        </MenuItem>
      </Menu>
    </div>
  );
};

export default SortMenu;
