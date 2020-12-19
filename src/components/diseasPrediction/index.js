import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { useState, useEffect } from "react";
import { getDiseasesListRef } from "../database";

export default function DiseasPrediction() {
  const genders = [
    { value: "", label: "" },
    {
      value: "MALE",
      label: "male",
    },
    {
      value: "FEMALE",
      label: "female",
    },
    {
      value: "OTHER",
      label: "other",
    },
  ];

  const [gender, setGender] = useState("");

  const [allDiseases, setAllDiseases] = useState("");

  useEffect(() => {
    getDiseasesListRef.get().then((snapshot) => {
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
      console.log("data: ", snapshot.data());

      for (var item in snapshot.data()) {
        console.log("key: ", item);
        console.log("value: ", snapshot.get(item));
      }
    });
  }, []);

  return (
    <div>
      <TextField
        variant="outlined"
        select
        label="Gender"
        required
        fullWidth
        value={gender}
        onChange={(event) => {
          setGender(event.target.value);
        }}
        helperText="Please select your "
      >
        {genders.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}{" "}
          </MenuItem>
        ))}{" "}
      </TextField>
    </div>
  );
}
