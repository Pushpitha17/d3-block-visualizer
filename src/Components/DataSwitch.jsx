import Switch from '@mui/material/Switch';
import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch } from 'react-redux';
import { toggle } from '../Logic/switchSlice';



const DataSwitch = () => {

  const [switchState, setSwitchState] = useState(false)
  const dispatch = useDispatch()

  const handleToggle = () => {
    setSwitchState(!switchState)
    dispatch(toggle())
  }

  return (
    <FormControlLabel
      value={!switchState ? "start" : "end"}
      control={<Switch color="primary" checked={switchState} onClick={handleToggle} />}
      label={!switchState ? "Data Disabled" : "Data Enabled"}
      labelPlacement="start"
    />
  )
}

export default DataSwitch