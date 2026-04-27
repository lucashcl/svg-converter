export function convertSvgToAndroidXml(svgString: string): string {
   const parser = new DOMParser();
   const svgDoc = parser.parseFromString(svgString, "image/svg+xml");
   const svgElement = svgDoc.querySelector("svg");

   const viewBox = svgElement?.getAttribute("viewBox")?.split(" ") || ["0", "0", "24", "24"];
   const width = viewBox[2];
   const height = viewBox[3];

   let pathsXml = "";
   svgDoc.querySelectorAll("path").forEach(path => {
      const d = path.getAttribute("d");
      const fill = path.getAttribute("fill") || "#FF000000";
      pathsXml += `    <path
        android:fillColor="${fill}"
        android:pathData="${d}" />\n`;
   });

   return `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="${width}dp"
    android:height="${height}dp"
    android:viewportWidth="${width}"
    android:viewportHeight="${height}">
${pathsXml}</vector>`;
};