import { Component, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Container'

import Form from 'react-bootstrap/Form'

const categories = [
  'Apetizer',
  'Beverage',
  'Breakfast',
  'Comfort food',
  'Lunch',
  'Salad',
  'Smothie',
  'Snack',
  'Soup',
  'Vegan',
  'Savoury',
  'Sweet'
]

const Toggles = props => {
  const [toggle, setToggle] = useState('')
  const sendDataBack = item => {
    console.log(item)
    props.sendData(item)
  }
  const [switchState, setSwitchState] = useState(false)
  const handleChange = function (e, item) {
    // console.log(item)
    console.log(e.target.checked)
    if (e.target.checked === true) {
      sendDataBack(item)
    } else {
      sendDataBack('')
    }
    setSwitchState(!switchState)
  }
  return (
    <>
      {categories.map((item, index) => (
        <Form key={index} className='me-2'>
          <Form.Check
            type='switch'
            id='custom-switch'
            label={item}
            defaultChecked={switchState}
            onChange={e => handleChange(e, item)}
          />
        </Form>
      ))}
    </>
  )
}

export default Toggles
