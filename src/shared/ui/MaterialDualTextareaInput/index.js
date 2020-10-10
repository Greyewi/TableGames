/* eslint array-callback-return: 0 */
/* eslint no-loop-func: 0 */

import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import {Field} from "redux-form"
import './style.scss'
import PropTypes from 'prop-types'

const renderTextField = ({
                           input,
                           defaultValue,
                           label,
                           value,
                           meta: {touched, error},
                           ...custom
                         }) => (
  <span style={{display: 'none'}}><TextField
    hinttext={error}
    floatinglabeltext={label}
    errortext={touched && error ? error : ''}
    {...input}
    {...custom}
    label={touched && error ? error : label}
    error={touched && error ? true : false}
    defaultValue={value}
  /></span>
)

class MaterialDualTextareaInput extends Component {
  
  static propTypes = {
    change: PropTypes.func.isRequired,
    labelinput: PropTypes.string,
    labeltextarea: PropTypes.string,
    rows: PropTypes.number
  }
  
  static defaultProps = {
    rows: '2'
  }
  
  state = {
    inputText: '',
    textareaText: '',
    linkMaterial: '',
    fieldArray: [],
    valueInputs: [],
    valueMaterial: [],
    valueTextareas: []
  }
  
  componentDidMount() {
    if (this.props.data) {
      let valueInputs = [], valueTextareas = [], valueMaterials = []
      this.props.data.map((item, key) => {
        if (item) {
          const parseItem = item.split('</h2> <section>')
          
          if (parseItem.length > 1) {
            const materialVal = parseItem[1].split('"')[1]
            this.handleChangeInput(parseItem[0].split('<h2>')[1], key, parseItem[1].split('</section>')[0], materialVal)
            this.handleChangeTextarea(parseItem[1].split('</section>')[0], key, parseItem[0].split('<h2>')[1], materialVal)
            this.handleChangeMaterial(materialVal, key, parseItem[0].split('<h2>')[1], parseItem[1].split('</section>')[0])
            
            valueInputs[key] = parseItem[0].split('<h2>')[1]
            valueTextareas[key] = parseItem[1].split('</section>')[0]
            valueMaterials[key] = materialVal
          }
        }
      })
      this.setState({valueInputs: valueInputs, valueTextareas: valueTextareas, valueMaterial: valueMaterials})
    }
  }
  
  render() {
    const {countFields, change, ...props} = this.props
    let renderers = []
    
    for (var i = 0; i < countFields; i++) {
      renderers.push(
        <span className="dual-inputs" key={i + 1}>
          <Field {...props} component={renderTextField}/>
          <TextField
            id={"input_dual-" + i}
            num={i}
            label={this.props.labelinput + " " + (i + 1)}
            defaultValue={this.state.valueInputs[i]}
            onChange={(e) => this.handleChangeInput(e)}
            onFocus={(e) => this.handleFocusInput(e, i)}
          />
          <TextField
            id={"textarea_dual-" + i}
            label={this.props.labeltextarea + " " + (i + 1)}
            multiline
            num={i}
            rows={this.props.rows}
            defaultValue={this.state.valueTextareas[i]}
            onChange={(e) => this.handleChangeTextarea(e)}
            onFocus={(e) => this.handleFocusInput(e, i)}
          />
          <TextField
            id={"materials-" + i}
            num={i}
            label={'Материал'}
            defaultValue={this.state.valueMaterial[i]}
            onChange={(e) => this.handleChangeMaterial(e)}
            onFocus={(e) => this.handleFocusInput(e, i)}
          />
        </span>
      )
    }
    
    return (
      renderers
    )
  }
  
  handleFocusInput = (e) => {
    const {data} = this.props
    if (data) {
      const item = data[parseInt(e.target.id.split('-')[1], 10)]
      if (item) {
        const parseItem = item.split('</h2> <section>')
        if (parseItem.length > 1) {
          const materialVal = parseItem[1].split('"')[1]
          this.setState({
            inputText: parseItem[0].split('<h2>')[1],
            textareaText: parseItem[1].split('</section>')[0],
            linkMaterial: materialVal
          })
        }
      }
    }
  }
  
  handleChangeInput = (e, i, other, other2) => {
    const value = (i !== undefined) ? e : e.currentTarget.value
    const subValue = (i !== undefined) ? other : this.state.textareaText
    const subValue2 = (i !== undefined) ? other2 : this.state.linkMaterial
    const id = (i !== undefined) ? i : e.target.id.split('-')[1]
    
    this.setState({inputText: value}, () => {
      const text = '<div><h2>' + value + '</h2> <section>' + subValue + '</section></div> <a href="' + subValue2 + '"><Button>Скачать материалы</Button></a>'
      const fieldArray = this.state.fieldArray
      fieldArray[id] = text
      this.setState({fieldArray: fieldArray})
      this.props.change(this.props.name, fieldArray)
    })
  }
  
  handleChangeTextarea = (e, i, other, other2) => {
    const value = (i !== undefined) ? e : e.currentTarget.value
    const subValue = (i !== undefined) ? other : this.state.inputText
    const subValue2 = (i !== undefined) ? other2 : this.state.linkMaterial
    const id = (i !== undefined) ? i : e.target.id.split('-')[1]
    this.setState({textareaText: value}, () => {
      const text = '<div><h2>' + subValue + '</h2> <section>' + value + '</section></div> <a href="' + subValue2 + '"><Button>Скачать материалы</Button></a>'
      const fieldArray = this.state.fieldArray
      fieldArray[id] = text
      this.setState({fieldArray: fieldArray})
      this.props.change(this.props.name, fieldArray)
    })
  }
  
  handleChangeMaterial = (e, i, other, other2) => {
    const value = (i !== undefined) ? e : e.currentTarget.value
    const subValue = (i !== undefined) ? other : this.state.inputText
    const subValue2 = (i !== undefined) ? other2 : this.state.textareaText
    //console.log((i !== undefined), other2, this.state.textareaText)
    
    const id = (i !== undefined) ? i : e.target.id.split('-')[1]
    this.setState({linkMaterial: value}, () => {
      const text = '<div><h2>' + subValue + '</h2> <section>' + subValue2 + '</section></div> <a href="' + value + '"><Button>Скачать материалы</Button></a>'
      const fieldArray = this.state.fieldArray
      fieldArray[id] = text
      this.setState({fieldArray: fieldArray})
      this.props.change(this.props.name, fieldArray)
    })
  }
}

export default MaterialDualTextareaInput