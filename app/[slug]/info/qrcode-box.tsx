"use client";

import { useRef } from "react";
import QRCode from "react-qr-code";

export default function QRCodeBox({ value }: { value: string }) {
  const qrCodeRef = useRef<any>(null);
  async function converImageFormat(url: string, type: string) {
    const image = new Image();
    image.src = url;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(image, 0, 0, 256, 256);
    const blob2 = (await new Promise((res, rej) =>
      canvas.toBlob((blob) => (blob ? res(blob) : rej()), type)
    )) as Blob;
    const url2 = URL.createObjectURL(blob2);
    return url2;
  }
  async function saveQRCode(event: any, type: string) {
    // svg to url
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(qrCodeRef.current);
    // console.log(qrCodeRef.current);
    const blob = new Blob([source], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    // convert format
    const url2 =
      type === "image/svg+xml" ? url : await converImageFormat(url, type);
    if (url2 !== url) URL.revokeObjectURL(url);
    // download url
    const link = document.createElement("a");
    link.href = url2;
    link.download = "QRCode"; // don't need to specify file extension
    link.click();
    // not sure if i should delete the url here
    // URL.revokeObjectURL(url2);
  }

  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-6">
        <QRCode ref={qrCodeRef} value={value} />
      </div>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-6">
        <span>
          Save QR Code as:{" "}
          <button
            onClick={(event) => saveQRCode(event, "image/svg+xml")}
            className="hover:underline hover:text-indigo-500 font-semibold"
          >
            SVG
          </button>{" "}
          -{" "}
          <button
            onClick={(event) => saveQRCode(event, "image/png")}
            className="hover:underline hover:text-indigo-500 font-semibold"
          >
            PNG
          </button>{" "}
          -{" "}
          <button
            onClick={(event) => saveQRCode(event, "image/jpeg")}
            className="hover:underline hover:text-indigo-500 font-semibold"
          >
            JPG
          </button>
        </span>
      </div>
    </>
  );
}
