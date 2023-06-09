import Typography from "./Typography";

const AppTitle = (props) => {
  return (
    <Typography
      fontWeight="300"
      fontFamily="var(--fractul-regular)"
      as="h2"
      color="white"
      whiteSpace="nowrap"
      {...props}
    >
      
      <strong
        style={{
          fontFamily: "var(--fractul-alt-bold)",
        }}
      >
        Try Āut
      </strong>
      
    </Typography>
  );
};

export default AppTitle;
