import {toSrt} from "./srtParser";


export const fileDownload = (data, filename) => {
    const fileData = toSrt(data)
    const blob = new Blob([fileData], {type: "text/plain"})
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = `qualified_${filename}`
    link.href = url;
    link.click();
}
