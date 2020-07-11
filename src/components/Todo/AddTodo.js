import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddTodo extends Component {
  state = {
    title: '',
  };
  // Get Add Todo text
  onChange = (e) => {
    this.setState({ title: e.target.value });
  };
  // Submit Add Todo
  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: '' });
  };
  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        <input
          type='text'
          name='title'
          style={{ flex: '10', padding: '5px' }}
          placeholder='Add Todo'
          value={this.state.title}
          onChange={this.onChange}
        />
        <input
          type='submit'
          value='submit'
          style={{ flex: '1' }}
          className='btn'
        />
      </form>
    );
  }
}
AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
export default AddTodo;
