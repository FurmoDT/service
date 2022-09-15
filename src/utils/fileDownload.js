import {parse, toSrt} from "./srtParser";


export const fileDownload = (file) => {
    const fileData = toSrt(parse(file.data))
    const blob = new Blob([fileData], {type: "text/plain"})
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.download = `qualified_${file.filename}`
    link.href = url;
    link.click();
}
