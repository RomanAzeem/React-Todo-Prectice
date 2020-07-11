import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
// import { v4 as uuid } from 'uuid';
import './App.css';
import Header from './components/layout/Header';
import AddTodo from './components/Todo/AddTodo';
import Todos from './components/Todo/Todos';
import About from './components/pages/About';

class App extends Component {
  state = {
    todos: [],
  };
  // Toggle Complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };
  // Delete Todo
  delTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) =>
        this.setState({
          todos: [...this.state.todos.filter((todo) => todo.id !== id)],
        })
      );
  };
  // AddTodo
  addTodo = (title) => {
    axios
      .post('https://jsonplaceholder.typicode.com/todos', {
        title,
        completed: false,
      })
      .then((res) => {
        this.setState({ todos: [...this.state.todos, res.data] });
      });
  };
  componentDidMount() {
    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((res) => {
        this.setState({ todos: res.data });
      });
  }
  render() {
    return (
      <Router>
        <div className='container'>
          <Header />
          <Route
            exact
            path='/'
            render={(props) => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos
                  todos={this.state.todos}
                  markComplete={this.markComplete}
                  delTodo={this.delTodo}
                />
              </React.Fragment>
            )}
          ></Route>
          <Route path='/about' component={About}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
