import moment from 'moment'

const domParser = new DOMParser();

export function fetchList() {

    return window.fetch("list")
        .then(r => r.text())
        .then(r => r.split("\n"))
}

export function fetch(filename) {
    return window.fetch(filename)
        .then(r => r.text())
        .then(r => domParser.parseFromString(r, "text/xml"))
        .then(r => {
            let trkpts = r.getElementsByTagName("trkpt")

            let points = []

            let old = trkpts.item(0)
            let totalDuration = moment.duration({ seconds: 0 })

            let point = {
                lat: old.getAttribute("lat"),
                long: old.getAttribute("lon"),
                ele: old.getElementsByTagName("ele")[0]?.textContent,
                date: totalDuration
            }

            points.push(point)

            for (let i = 1; i < trkpts.length; i++) {
                let next = trkpts.item(i)

                let lastDate = moment(old.getElementsByTagName("time")[0]?.textContent)
                let nextDate = moment(next.getElementsByTagName("time")[0]?.textContent)
                let duration = moment.duration(nextDate - lastDate)

                totalDuration = totalDuration.clone().add(duration)

                point = {
                    lat: next.getAttribute("lat"),
                    long: next.getAttribute("lon"),
                    ele: next.getElementsByTagName("ele")[0]?.textContent,
                    date: totalDuration.asMinutes()
                }

                old = next
                points.push(point)
            }
            return points
        })
}