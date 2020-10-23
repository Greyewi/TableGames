/* eslint array-callback-return: 0 */
import React, { Component } from 'react'
import Select from 'react-select'
import { Label } from 'reactstrap'
import './style.scss'

class MaterialMultySelect extends Component {
  state = {
    value: this.props.defaultValue,
  }

  componentDidMount() {
    this.setState({ value: this.props.defaultValue })
  }

  componentDidUpdate(props) {
    if (
      this.props.defaultValue &&
      this.props.defaultValue.length != props.defaultValue.length
    ) {
      this.setState({ value: this.props.defaultValue })
    }
  }

  render() {
    const { onFetchingData, ...props } = this.props

    return (
      <Label>
        {this.props.label}
        <Select
          isMulti
          value={this.state.value}
          isClearable
          onChange={this.handleInputChange}
          onMenuOpen={onFetchingData}
          {...props}
        />
      </Label>
    )
  }

  handleInputChange = value => {
    this.setState({ value: value }, () => {
      this.props.change(this.props.name, this.valueFormatter(value))
      setTimeout(() => {
        this.props.onSelect && this.props.onSelect(value)
      }, 500)
    })
  }

  valueFormatter = values => {
    let results = []
    values &&
      values.map(item => {
        results.push(item.value)
      })
    return results
  }
}

export default MaterialMultySelect
