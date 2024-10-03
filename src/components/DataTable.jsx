import { DataGrid } from '@mui/x-data-grid'
import React from 'react'

const DataTable = ({rows,cols}) => {
  return (
    <DataGrid
              rows={rows}
              columns={cols}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            />
  )
}

export default DataTable