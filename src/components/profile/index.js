import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Grid, Typography } from "@material-ui/core/";
import { loadProfileData } from "../database/index";
import { useState, useEffect } from "react";
import "./index.css";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    console.log("staring profile");
    loadProfileData(
      (data) => {
        console.log("data: ", data);
        setProfileData(data);
      },
      (error) => console.log(error)
    );
  }, []);

  const fileChange = (file) => {
    console.log("file:", file[0]);
    this.setState({ file: file });

    const reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        fileUrl: reader.result,
      });
    };
    if (file[0]) {
      reader.readAsDataURL(file[0]);
      this.setState({
        fileUrl: reader.result,
      });
    } else {
      this.setState({
        fileUrl: "",
      });
    }
  };

  console.log("profileData :", profileData);

  return (
    <Grid container spacing={2}>
      <Grid item>
        {profileData.imageUrl ? (
          <div class="addImageContainer">
            <Avatar src={profileData.imageUrl} className={classes.large} />
            <div class="addImage">
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="contained-button-file"
                type="file"
                onChange={(e) => fileChange(e.target.files)}
              />
              {/* <label htmlFor="contained-button-file">
                <button>change image</button>
              </label> */}
            </div>
          </div>
        ) : (
          <div class="addImageContainer">
            <Avatar className={classes.large} />

            <div class="addImage">
              <div>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="contained-button-file"
                  type="file"
                  onChange={(e) => fileChange(e.target.files)}
                />
              </div>

              {/* <label htmlFor="contained-button-file">
                <button>add image</button>
              </label> */}
            </div>
          </div>
        )}
      </Grid>
      <Grid item xs={9}>
        <Typography variant="h5">
          {profileData.name ? profileData.name : "No profile name found"}
        </Typography>
        <Typography variant="body1">
          {profileData.email ? profileData.email : "No profile email found"}
        </Typography>
        <Typography variant="body1">
          {profileData.gender ? profileData.gender : "No profile gender found"}
        </Typography>
        <Typography variant="body1">
          {profileData.number ? profileData.number : "No profile number found"}
        </Typography>
        <Typography variant="body1">
          {profileData.location
            ? profileData.location
            : "No profile location found"}
        </Typography>
      </Grid>
    </Grid>
  );
}
