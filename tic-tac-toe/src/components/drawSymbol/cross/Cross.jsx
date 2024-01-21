import FontAwesomeSvg from "../../fontAwesomeSvg/FontAwesomeSvg.jsx"

export default function Cross({ viewport, design }) {

    const { width, height, ...anotherViewportProps } = viewport
    const { fill, ...anotherDesignProps } = design

    const props = {
        svg: {
            width, height,
            viewBox: "0 0 384 512",
            anotherSvgProps: anotherViewportProps
        },
        path: {
            fill,
            d: "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z",
            anotherPathProps: anotherDesignProps
        }
    }

    return <FontAwesomeSvg svgProps={props.svg} pathProps={props.path} />

}