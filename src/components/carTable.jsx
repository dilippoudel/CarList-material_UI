import PropTypes from 'prop-types';
import React, { Component } from 'react';

class CarTable extends Component {
 
   
    raiseSort = (path) => {
        const sortColumn = {...this.props.sortColumn};
      if(sortColumn.path=== path){
      sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';}
      else {
        sortColumn.path = path;
        sortColumn.order = 'asc';
      } 
      this.props.onSort(sortColumn);
    }
    render() {
        const {items, onDelete} = this.props;
        return (
            
            <table className ="table table-striped table-light">
        <thead>
            <tr>
            <th onClick = {()=> this.raiseSort('name')} >Name</th>
            <th onClick = {()=> this.raiseSort('height')} >Height</th>
            <th onClick = {()=> this.raiseSort('mass')} >Mass</th>
            <th onClick = {()=> this.raiseSort('birth_year')} >Birth Year</th>
            <th></th>
            <th></th>
        </tr>
        </thead>
        <tbody>
        {items.map((item, index) =>
        <tr key = {index}>
        <td>{item.name}</td>
        <td>{item.height}</td>
        <td>{item.mass}</td>
        <td>{item.birth_year}</td>
        <td><button onClick= {()=> onDelete(index)} className = "btn btn-danger sm">Delete</button></td>
        </tr>
        )}
        </tbody>
        </table>
        );
    }

}
CarTable.propTypes = {
    items: PropTypes.array.isRequired,
    onDelete : PropTypes.func.isRequired
}
export default CarTable;