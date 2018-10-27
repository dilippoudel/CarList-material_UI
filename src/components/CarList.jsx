import React, { Component } from 'react';
import Pagination from './pagination';
import Utils from './utils';
import CarTable from './carTable';
import _ from 'lodash';

class CarList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            pageSize : 4, 
            currentPages : 1,
            name:'',
            height:'',
            mass:'',
            birth_year:'', 
            sortColumn : {path : 'name', order : 'asc'},
            search : '',
            listItems:[]};
    }
    componentDidMount() {
       fetch('https://swapi.co/api/people/')
       .then((response) => response.json())
       .then((responseData) => {
           this.setState({listItems : responseData.results})
       });
     }
handleDelete = (index) => {
    const newCars = this.state.listItems.filter((m, i)=> {
        return index !== i;
    })
    this.setState({listItems : newCars})
    
}
handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value.substr(0,5)})
}



addTodo = (event) => {
    event.preventDefault();
    const {name, height, mass, birth_year} = this.state;
       const newList ={name: name, height : height, mass: mass, birth_year : birth_year};
    if(mass === '' || height === '' || birth_year === '' || name === '') return (alert("please fill all the field to add in store."));
    this.setState({
      listItems: [...this.state.listItems,newList]
    });
  }
  handlePageChange = (page) => {
      this.setState({currentPages : page})
  }
  handleSort = (sortColumn) => {
    this.setState({sortColumn})
  }
  handleSearch = (e) => {
      const {search, listItems} = this.state;
this.setState({search : e.target.value})
const filteredItems = listItems.filter(car => {
    return car.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
})
this.setState({listItems : filteredItems})
  }

render(){
  

    const count = this.state.listItems.length;
    // object Destructure
    const {listItems : allItems ,pageSize, currentPages, height, name, mass, birth_year, sortColumn} = this.state;   
  
    const sorted = _.orderBy(allItems, [sortColumn.path], [sortColumn.order]); //to sort the items 
    const items = Utils(sorted, currentPages, pageSize)
 
return(
  <div>
    <input type="text" className="form-control" placeholder="Search..." aria-label="Example text with button addon"  onChange = {this.handleSearch} aria-describedby="button-addon1" />
    <input type = "text" name = "name" onChange = {this.handleChange} value = {name}/>
    <input type = "text" name = "height" onChange = {this.handleChange} value = {height}/>
    <input type = "text" name = "mass" onChange = {this.handleChange} value = {mass}/>
    <input type = "text" name = "birth_year" onChange = {this.handleChange} value = {birth_year}/>
    <button onClick = {this.addTodo} className =" btn btn-primary sm m-2">New car</button>
    {/* Here the child components CarTable and Pagination are used as single source of truth. 
    Thats why the CarTable component is rendering according to Pagination and vice-versa. So that same Props are are passing 
    to both chile components from Parent 
    Component 'Carlist' */}
      <CarTable items = {items} 
      onDelete = {this.handleDelete} 
      sortColumn = {sortColumn}
      itemsCount = {count} 
      currentPage = {currentPages} 
      pageSize = {pageSize}
      onSort = {this.handleSort}
     />
    <Pagination 
    onPageChange = {this.handlePageChange}
    pageSize = {pageSize} 
    itemsCount = {count} 
    currentPage = {currentPages}
  />
</div>
  )
}
}

export default CarList;