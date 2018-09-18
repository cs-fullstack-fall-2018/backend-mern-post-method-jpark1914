import React, {Component} from 'react';
import './App.css';
import ToDoList from "./ToDoList";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            stringInfo: "",
            placeHold: "Enter Tasks Here",
            name: "",
            name2: "",
        }
    }
    submitForm =(event) =>{
        fetch('/api/todo',
            {
                method: "POST",
                body: JSON.stringify({
                    "username": this.state.name,
                    "todo": this.state.stringInfo,
                    "isDone": "true"
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(data => data.json());
        event.preventDefault();

    }
    getSubmits =(event) =>{
        fetch('/api/todo/'+this.state.name2)
            .then(data => data.json())
            .then(response => this.setState({data: response}));
        event.preventDefault();

    }
    //
    // componentWillLoad(){
    //
    // }

    nameStateChange = (event) => {
        this.setState({name: event.target.value})
    }
    nameStateChange2 = (event) => {
        this.setState({name2: event.target.value})
    }


    deleteByID= (id) => {
        fetch('/api/todo',
            {
                method: "DELETE",
                body: JSON.stringify({"id": id}),
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(data => data.json());
    };
    inputValueChange=(event)=>{
        this.setState({stringInfo: event.target.value})
    }

    render() {


        return (
            <div className="App">
                <h1>JPizzle</h1>
                <form onSubmit={this.submitForm}>
                    <label for="user">User Name: </label>
                    <input type="text" id="user" placeholder="Enter User Name" value={this.state.name} onChange={this.nameStateChange}/>
                    <br/><br/>
                    <label htmlFor="toDo">To Do Tasks: </label>
                    <input type="text" placeholder={this.state.placeHold} id="toDo" value={this.state.stringInfo}
                           onChange={this.inputValueChange}/>
                    <br/><br/>
                    <input type="submit" value="Submit"/>
                </form>
                <br/>
                <form onSubmit={this.getSubmits}>
                    <label for="tasks">Show Tasks: </label><br/>
                    <input type="text" id="tasks" placeholder="Enter user" value={this.state.name2} onChange={this.nameStateChange2}/>
                    <input type="submit" value="Submit"/>
                </form>
                <ToDoList arr={this.state.data}
                          deleteFunction={this.deleteByID}/>
            </div>
        );
    }
}

export default App;
