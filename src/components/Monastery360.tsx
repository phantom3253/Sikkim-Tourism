import { useEffect } from "react";

const Monastery360 = () => {
  useEffect(() => {
    // Use pannellum from window (loaded by <script>)
    // @ts-ignore
    window.pannellum.viewer("panorama", {
      type: "equirectangular",
      panorama: "/monastery360.jpg", // make sure this file is inside /public
      autoLoad: true,
      showControls: true,
      pitch: 0,
      yaw: 180,
      hfov: 110,
    });
  }, []);

  return (
    <section
      id="landing-360"
      style={{ width: "100%", height: "100vh", position: "relative" }}
    >
      <div id="panorama" style={{ width: "100%", height: "100%" }}></div>

      {/* Overlay text */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <h1>Welcome to Monastery360</h1>
        <p>Experience Sikkim’s monasteries in immersive 360°</p>
      </div>
    </section>
  );
};

export default Monastery360;
