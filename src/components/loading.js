import { Instagram } from "react-content-loader";

import { Box } from "@mui/material";

const Loader = () => (
  <Box
    sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}
  >
    <Instagram width="30%" height="30%" />{" "}
    <Instagram width="30%" height="30%" />{" "}
    <Instagram width="30%" height="30%" />
  </Box>
);
export default Loader;
