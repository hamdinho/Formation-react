export interface I_Meme{
    id?:number
    titre:string
    text:string
    x:number
    y:number
    fontWeight:string
    fontSize:number
    underline:boolean
    italic:boolean
    imageId:number
    color:string
};
export const DummyMeme:I_Meme={
    titre:'',
    text:'',
    x:0,
    y:17,
    fontWeight:'500',
    fontSize:30,
    underline:false,
    italic:false,
    imageId:0,
    color:'#000000'
};
export interface I_Image{
    id:number
    url:string
    w:number
    h:number
    name:string
};