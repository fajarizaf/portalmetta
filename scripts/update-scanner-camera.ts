import * as fs from "fs";
import * as path from "path";

function updateScannerCamera() {
  const filePath = path.join(process.cwd(), "src/app/admin/visits/scanner/page.tsx");
  let file = fs.readFileSync(filePath, "utf-8");

  const oldStartRegex = /const scanner = new Html5Qrcode\("qr-reader"\)\s*scannerRef\.current = scanner\s*await scanner\.start\([\s\S]*?\)\s*setScanning\(true\)/;

  const newStart = `const scanner = new Html5Qrcode("qr-reader")
      scannerRef.current = scanner

      let cameraConfig: any = { facingMode: "environment" }
      try {
        const cameras = await Html5Qrcode.getCameras()
        if (cameras && cameras.length > 0) {
          const backCam = cameras.find(c => 
            c.label.toLowerCase().includes("back") || 
            c.label.toLowerCase().includes("rear") || 
            c.label.toLowerCase().includes("environment") ||
            c.label.toLowerCase().includes("belakang")
          )
          cameraConfig = backCam ? { deviceId: { exact: backCam.id } } : cameras[0].id
        }
      } catch {}

      await scanner.start(
        cameraConfig,
        {
          fps: 15,
          qrbox: (viewfinderWidth: number, viewfinderHeight: number) => {
            const minEdge = Math.min(viewfinderWidth, viewfinderHeight)
            return {
              width: Math.floor(minEdge * 0.85),
              height: Math.floor(minEdge * 0.85)
            }
          },
          experimentalFeatures: {
            useBarCodeDetectorIfSupported: true
          }
        },
        async (decodedText) => {
          try { await scanner.pause(true) } catch {}
          await processDecodedText(decodedText)
        },
        () => {}
      )
      setScanning(true)`;

  file = file.replace(oldStartRegex, newStart);
  fs.writeFileSync(filePath, file);
}

updateScannerCamera();
