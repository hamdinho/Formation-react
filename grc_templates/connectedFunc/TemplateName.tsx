import React from 'react'
import { connect } from 'react-redux'
import style from './TemplateName.module.css'
interface I_TemplateNameProps{
    func:Function;
}
const TemplateName: React.FC<I_TemplateNameProps> = (props) => {
  return (
    <div className={style.TemplateName}>TemplateName</div>
  )
}

const mapStateToProps = (state:any,own:any) => {
    return {
        ...own,
        ...state
    }
}

const mapDispatchToProps =(dispatch)=> {
    return{
        func:()=>{dispatch({})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateName)