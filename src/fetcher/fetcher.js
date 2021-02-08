

export default function fetch(){

    window.fetch("20210204_121158.gpx").then(res => res.text)

    console.log("resultat : "+res)

}