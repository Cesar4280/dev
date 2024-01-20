import FontAwesomeSvg from "../fontAwesomeSvg/FontAwesomeSvg.jsx"

export default function Board({ viewport, design }) {

    const { width, height, ...anotherViewportProps } = viewport
    const { fill, ...anotherDesignProps } = design

    const props = {
        svg: {
            width, height,
            anotherSvgProps: anotherViewportProps
        },
        path: {
            fill,
            d: "M452.36 158.125H10m442.36 0H10M156.842 10v444.38m0-444.38v444.38M304.418 10.275v444.38m0-444.38v444.38M452.728 306.526H10.368m442.36 0H10.368",
            anotherPathProps: anotherDesignProps
        }
    }

    return <FontAwesomeSvg svgProps={props.svg} pathProps={props.path} />

}
