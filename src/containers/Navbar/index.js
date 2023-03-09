import Box from "common/components/Box";
import NavbarWrapper from "common/components/Navbar";
import Container from "common/components/Container";
import { NavbarData } from "common/data";
import PropTypes from "prop-types";
import Logo from "common/components/UIElements/Logo";
import Button from "common/components/Button";

const navbarStyle = {
  className: "sass_app_dark_navbar",
  height: {
    _: "122px",
    xs: "122px",
    sm: "84px",
    md: "84px",
    xxl: "112px",
  },
  display: "block",
};

const logoStyles = {
  height: {
    _: "42px",
    xs: "42px",
    sm: "42px",
    md: "42px",
    xxl: "56px",
  },
  width: {
    _: "186px",
    xs: "186px",
    sm: "186px",
    md: "186px",
    xxl: "252px",
  },
};

const Navbar = ({ row, onDisconnect, isAuthorised }) => {
  const { logo } = NavbarData;

  return (
    <NavbarWrapper {...navbarStyle}>
      <Container
        noGutter
        px={{
          _: "25px",
          sm: "0px",
        }}
        maxWidth={{
          lg: "1180px",
          xl: "1300px",
          xxl: "1600px",
        }}
      >
        <Box
          {...row}
          justifyContent={{
            _: "center",
            sm: "space-between",
          }}
        >
          <Logo
            logoSrc={logo}
            href="/"
            alt="Aut Logo"
            logoStyle={logoStyles}
            className="sticky-logo nav-logo"
          />
          {!!isAuthorised && (
            <Button
              colors="primary"
              variant="roundOutlined"
              title="Disconnect"
              target="_blank"
              size="normal"
              onClick={onDisconnect}
              minWidth={{
                _: "220px",
              }}
            />
          )}
        </Box>
      </Container>
    </NavbarWrapper>
  );
};

Navbar.propTypes = {
  navbarStyle: PropTypes.object,
  logoStyle: PropTypes.object,
  button: PropTypes.object,
  row: PropTypes.object,
  menuWrapper: PropTypes.object,
};

Navbar.defaultProps = {
  row: {
    flexBox: true,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  menuWrapper: {
    flexBox: true,
    alignItems: "center",
    justifyContent: "space-between",
  },
};

export default Navbar;
