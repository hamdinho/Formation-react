import { Image, Svg, Text } from "@react-pdf/renderer";

const MemeSvgViewerPDF = (props) => {
  return (
    <Svg
      data-testid="MemeSvgViewerPDF"
      width={"100%"}
      height={"100%"}
      viewBox={`0 0 ${props.image ? props.image.w : "1000"} ${props.image ? props.image.h : "1000"}`}
    >
      {props.image && <Image src={'/img/'+props.image.url} x="0" y="0" />}
      <Text
        x={props.meme.x}
        y={props.meme.y}
        style={{
          fontSize: props.meme.fontSize,
          fontWeight: props.meme.fontWeight,
          textDecoration: props.meme.underline ? "underline" : "none",
          fontStyle: props.meme.italic ? "italic" : "normal",
          fill: props.meme.color,
        }}
      >
        {props.meme.text}
      </Text>
    </Svg>
  );
};
MemeSvgViewerPDF.defaultProps = {};

//export avec les props provennant uniquement du parent
export default MemeSvgViewerPDF;
