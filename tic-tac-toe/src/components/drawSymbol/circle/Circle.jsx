import FontAwesomeSvg from "../../fontAwesomeSvg/FontAwesomeSvg.jsx"

export default function Circle({ viewport, design }) {

    const { width, height, ...anotherViewportProps } = viewport
    const { fill, ...anotherDesignProps } = design

    const props = {
        svg: {
            width, height,
            viewBox: "0 0 512 512",
            anotherSvgProps: anotherViewportProps
        },
        path: {
            fill,
            d: "M464 256a208 208 0 1 0-416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1-512 0z",
            anotherPathProps: anotherDesignProps
        }
    }

    return <FontAwesomeSvg svgProps={props.svg} pathProps={props.path} />

}
