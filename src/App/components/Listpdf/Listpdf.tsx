import {
  Document,
  // Image,
  Page,
  PDFDownloadLink,
  PDFViewer,
  // Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import React from "react";
import { connect } from "react-redux";
import { callbackify } from "util";
import { I_Image, I_Meme } from "../../interfaces/common";
import style from "./Listpdf.module.scss";
import MemeSvgViewerPDF from "./MemeSvgViewerPDF/MemeSvgViewerPDF";
interface I_ListpdfProps {
  // func:Function;
  memes: Array<I_Meme>;
  images: Array<I_Image>;
}
const Listpdf: React.FC<I_ListpdfProps> = (props) => {
  return (
    <div
      className={style.Listpdf}
      style={{
        display: "flex",
        height: "calc( 100vh - 130px)",
        flexDirection: "column",
      }}
    >
      <PDFDownloadLink
        document={<DocumentPDF memes={props.memes} images={props.images} />}
        fileName="memes.pdf"
      >
        liens de DL
      </PDFDownloadLink>
      <PDFViewer showToolbar={true} style={{ flexGrow: 1 }}>
        <DocumentPDF memes={props.memes} images={props.images} />
      </PDFViewer>
    </div>
  );
};

const mapStateToProps = (state: any, own: any) => {
  return {
    ...own,
    ...state.ressources,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    // func:()=>{dispatch({})}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Listpdf);

interface I_PDFDocumentProps {
  memes: Array<I_Meme>;
  images: Array<I_Image>;
}

const DocumentPDF: React.FC<I_PDFDocumentProps> = (props) => {
  return (
    <Document>
      <Page size={"A4"}>
        {props.memes.map((m, i) => {
          const image = props.images.find((img) => img.id === m.imageId);
          console.log(m,image)
          return (
            <View key={`pdf-meme-view${i}`}>
              <Text>
                {m.id}:{m.titre}
              </Text>
              <MemeSvgViewerPDF meme={m} image={image}/>
              {/* <Svg break={false}
                viewBox={`0 0 ${image ? image.w : 1000} ${
                  image ? image.h : 1000
                }`}
              >
              {image && <Image src={`/img/${image.url}`} x={0} y={0}   />}

                <Text x={m.x}  y={m.y}>{m.text}</Text>
              </Svg> */}
            </View>
          );
        })}
      </Page>
    </Document>
  );
};
