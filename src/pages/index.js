import React, { useState } from "react";
import TryAut from "containers/TryAut";
import Footer from "containers/Footer";
import AutConnect from "containers/Connect";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import Sticky from "react-stickynode";
import { DrawerProvider } from "common/contexts/DrawerContext";
import Navbar from "containers/Navbar";
import { getAppConfig } from "api/index.api";
import { useEffect } from "react";
import AutLoading from "common/components/AutLoading";
import { Modal } from "@redq/reuse-modal";
import styled from "styled-components";
import BubbleBottomLeft from "common/assets/image/bubble2.svg";
import BubbleTopRight from "common/assets/image/bubble.svg";
import themeGet from "@styled-system/theme-get";
import Image from "common/components/Image";
import ClaimAutId, { AutIDContextProvider } from "common/components/ClaimAutId";
import { generateNetworkConfig } from "common/ProviderFactory/setup.config";
import { WagmiConfig } from "wagmi";

const BottomLeftBubble = styled(Image)`
  position: fixed;
  width: 400px;
  height: 400px;
  left: -200px;
  bottom: -200px;
  filter: blur(50px);
  transform: rotate(-50deg);
  -webkit-filter: blur(50px);
  ${[themeGet("mediaQueries.sm")]} {
    width: 700px;
    height: 700px;
    left: -350px;
    bottom: -350px;
  }
`;

const TopRightBubble = styled(Image)`
  position: fixed;
  width: 400px;
  height: 400px;
  top: -80px;
  right: -200px;
  filter: blur(50px);
  -webkit-filter: blur(50px);
  ${[themeGet("mediaQueries.sm")]} {
    width: 700px;
    height: 700px;
    top: -350px;
    right: -350px;
  }
`;

const Main = () => {
  const [connectState, setConnectState] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [config, setConfig] = useState(null);
  const [networks, setNetworks] = useState();

  useEffect(() => {
    getAppConfig()
      .then(async (res) => {
        setNetworks(res);
        const [network] = res.filter((d) => !d.disabled);
        setConfig(generateNetworkConfig(network));
        setLoading(false);
      })
      .catch();
  }, []);

  return (
    <>
      {isLoading || !config ? (
        <AutLoading />
      ) : (
        <WagmiConfig config={config}>
          <AutIDContextProvider>
            <Sticky top={0} innerZ={200} activeClass="sticky-nav-active">
              <DrawerProvider>
                <Navbar
                  isAuthorised={connectState?.connected}
                  onDisconnect={() => {
                    setConnectState({});
                  }}
                />
              </DrawerProvider>
            </Sticky>

            <ClaimAutId />

            <PerfectScrollbar
              options={{
                suppressScrollX: true,
                useBothWheelAxes: false,
                swipeEasing: true,
              }}
              style={{
                height: "100vh",
              }}
            >
              <BottomLeftBubble alt="bubble-left" src={BubbleBottomLeft.src} />
              <TopRightBubble alt="bubble-right" src={BubbleTopRight.src} />
              <Modal>
                {!connectState?.connected && (
                  <AutConnect
                    config={config}
                    networks={networks}
                    setLoading={setLoading}
                    onConnected={(state) => setConnectState(state)}
                  />
                )}

                {connectState?.connected && (
                  <>
                    {/* <div id="daut-container"></div> */}
                    <TryAut connectState={connectState} />
                    <Footer />
                  </>
                )}
              </Modal>
            </PerfectScrollbar>
          </AutIDContextProvider>
        </WagmiConfig>
      )}
    </>
  );
};
export default Main;
