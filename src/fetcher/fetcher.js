
const domParser = new DOMParser();

export default function fetch(){
    return window.fetch("20210204_121158.gpx")
        .then(r => r.text())
        .then(r => domParser.parseFromString(r, "text/xml"))
        .then(r => {
            let trkpts = r.getElementsByTagName("trkpt")

            let points = []
            for(let i =0 ; i < trkpts.length;i++){
                let trkpt = trkpts.item(i)

                let point = {
                    lat: trkpt.getAttribute("lat"),
                    long: trkpt.getAttribute("lon"),
                    ele: trkpt.getElementsByTagName("ele")[0]?.textContent,
                    time: trkpt.getElementsByTagName("time")[0]?.textContent
                }

                points.push(point)
            }
            return points
        })
}