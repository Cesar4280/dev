export default function FontAwesomeSvg({ svgProps, pathProps }) {
    const { height, width, viewBox, anotherSvgProps } = svgProps
    const { d, fill, anotherPathProps } = pathProps
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height={height} width={width} viewBox={viewBox} {...anotherSvgProps}>
            <path d={d} fill={fill} {...anotherPathProps} />
        </svg>
    )
}
