export default function IconView() {
  const centering = {
    display: "flex",
    justifyContent: "center" /* align horizontal */,
    alignItems: "center" /* align vertical */,
    height: "95vh",
    width: "100%",
  };
  return (
    <div style={centering}>
      <img src="https://www.gstatic.com/devrel-devsite/prod/vf7e3a995d426e05d42b78fc7d21a14329a91016dc065dc22c480cc8f443ef33e/firebase/images/lockup.png" />
    </div>
  );
}
