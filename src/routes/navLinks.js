import FavoriteIcon from "@material-ui/icons/Favorite";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme, fade } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import { Link, NavLink } from "react-router-dom";
import React from "react";

function ListItemLink(props) {
  const { icon, primary, to } = props;
  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link  ref={ref} to={to} {...linkProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem  button component={CustomLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default function NavLinks(porps) {
  return (
    <List>
      <ListItemLink icon={<HomeIcon />} primary="Home" to="/" />

      <ListItemLink
        icon={<FavoriteIcon />}
        primary="Diseas Prediction"
        to="/diseasPrediction"
      />
      <ListItemLink
        icon={<LocalHospitalIcon />}
        primary="Search Doctor"
        to="/searchDoc"
      />
      <ListItemLink
        icon={<SearchIcon />}
        primary="Search Ambulance"
        to="/searchAmbulance"
      />

      {porps.type === "ADMIN" && (
        <ListItemLink
          icon={<PersonIcon />}
          primary="Admin Profile"
          to="/adminProfile"
        />
      )}
    </List>
  );
}