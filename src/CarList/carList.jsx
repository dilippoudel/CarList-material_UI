import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Snackbar from'@material-ui/core/Snackbar';
import Fade from'@material-ui/core/Fade';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton'

import Tooltip from '@material-ui/core/Tooltip';

class Carlist extends Component {
constructor(params){
    super(params);
    this.state={cars:[], open:false};
}

componentDidMount(){
    this.listCars();
}

deleteCar =(link) =>{
    alert(link);
    fetch(link,{method:'DELETE'}) // backend know we want to delete 
    .then(response =>{
        this.listCars();
        this.setState({showSnack:true})

    }
    )

}
listCars =() =>{
    fetch('https://carstockrest.herokuapp.com/cars')
    .then(response => response.json())
    
    .then(responseData=>{
        this.setState({
                cars: responseData._embedded.cars
        })
    })
}
handleClose = () => {
    this.setState({ open: true });
  };


  render() {
    const columns = [{
        Header: 'Brand',
        accessor: 'brand' // String-based value accessors!
      }, {
        Header: 'Model',
        accessor: 'model',
      },
        {
            Header: 'Year',
            accessor: 'year' // 
          },
          {
            Header: 'Fuel',
            accessor: 'fuel' // String-based value accessors!
          },
          {
            Header: 'Color',
            accessor: 'color' // String-based value accessors!
          },
          {
            Header: 'Price(€)',
            accessor: 'price' // String-based value accessors!
          
      },
      {
        Header: '',
        filterable:false,
        sortable:false,
        accessor: '_links.self.href' ,


        Cell:({value})=>(
        <Tooltip title="Delete" placement="right-end">
        <IconButton  aria-label ="Delete"  onClick={()=>this.deleteCar(value)}> 
        <DeleteIcon /> </IconButton></Tooltip>
     
     
        )
      
  }
    ]
    


    return (
        <div>
            <ReactTable filterable={true} defaultPageSize={10}
    data={this.state.cars}
    columns={columns}
  />
<Snackbar  message ={"car deleted"} autoHideDuration={3000} 
    open = {this.state.showSnack} 
    onClose = {this.handleClose}/>

        </div>

    )
      
    
  }
}


const Main = () => {
    return (
        <main className = "container">
            <Carlist/>
        </main>
    )
}
export default Main;