import React from 'react'

import { InputLabel, Select, MenuItem } from '@material-ui/core'

//TODO: default 'selected' to the first item in 'items'
export default function SelectOption({ label, options, selected, onChange }) {
    return (
        <div>
            <InputLabel>{label}</InputLabel>
            <Select value={selected ? selected : ''} onChange={onChange}>
                {options
                    ? options.map((option) => (
                          <MenuItem key={option} value={option}>
                              {option}
                          </MenuItem>
                      ))
                    : ''}
            </Select>
        </div>
    )
}
