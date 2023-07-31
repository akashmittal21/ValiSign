import React from "react";
import { SvgXml } from "react-native-svg"

export default function SvgComponent(){
    const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="430" height="932" viewBox="0 0 430 932">
    <defs>
      <clipPath id="clip-path">
        <rect id="Rectangle_141" data-name="Rectangle 141" width="932" height="430" fill="none"/>
      </clipPath>
      <clipPath id="clip-path-2">
        <rect id="Rectangle_135" data-name="Rectangle 135" width="1078" height="482" transform="translate(0 0)" fill="none"/>
      </clipPath>
      <linearGradient id="linear-gradient" x1="0.065" y1="0.772" x2="0.066" y2="0.772" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#0959aa"/>
        <stop offset="0.272" stop-color="#1172d0"/>
        <stop offset="1" stop-color="#1b91ff"/>
      </linearGradient>
      <clipPath id="clip-path-4">
        <rect id="Rectangle_137" data-name="Rectangle 137" width="468.691" height="430" fill="none"/>
      </clipPath>
      <clipPath id="clip-path-5">
        <path id="Path_212" data-name="Path 212" d="M600.07,430H773.918V0H312.434a309.975,309.975,0,0,0-7.207,66.441c0,157.534,119.431,294.387,294.843,363.559" transform="translate(-305.227)" fill="none"/>
      </clipPath>
      <radialGradient id="radial-gradient" cx="1.185" cy="0.155" r="0.953" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#1dfff9"/>
        <stop offset="0.999"/>
        <stop offset="1"/>
      </radialGradient>
      <clipPath id="clip-path-6">
        <rect id="Rectangle_139" data-name="Rectangle 139" width="462.647" height="430" fill="none"/>
      </clipPath>
      <clipPath id="clip-path-7">
        <path id="Path_213" data-name="Path 213" d="M771.856,430V0H566.089c-154.457,73.09-256.88,201.247-256.88,347.135A310.838,310.838,0,0,0,320.48,430Z" transform="translate(-309.209)" fill="none"/>
      </clipPath>
      <radialGradient id="radial-gradient-2" cx="1.2" cy="0.807" r="0.953" gradientUnits="objectBoundingBox">
        <stop offset="0" stop-color="#bffffa"/>
        <stop offset="0.082" stop-color="#98cbc7"/>
        <stop offset="0.168" stop-color="#749c98"/>
        <stop offset="0.26" stop-color="#55726f"/>
        <stop offset="0.356" stop-color="#3b4e4d"/>
        <stop offset="0.457" stop-color="#253231"/>
        <stop offset="0.564" stop-color="#141b1b"/>
        <stop offset="0.681" stop-color="#090c0b"/>
        <stop offset="0.814" stop-color="#020202"/>
        <stop offset="0.999"/>
        <stop offset="1"/>
      </radialGradient>
    </defs>
    <g id="Group_223" data-name="Group 223" transform="translate(430) rotate(90)">
      <g id="Group_222" data-name="Group 222" clip-path="url(#clip-path)">
        <g id="Group_209" data-name="Group 209" transform="translate(-146 -51.824)">
          <g id="Group_208" data-name="Group 208" transform="translate(0 -0.176)" clip-path="url(#clip-path-2)">
            <path id="Path_214" data-name="Path 214" d="M0,0,1062.116,176.293l176.293,1062.116L176.293,1062.116Z" transform="translate(-336.803 241.088) rotate(-45)" fill="url(#linear-gradient)"/>
          </g>
        </g>
      </g>
    </g>
  </svg>
  `
  const SvgImage = () => <SvgXml xml = {svgMarkup} width="100%" />;

  return <SvgImage />

}