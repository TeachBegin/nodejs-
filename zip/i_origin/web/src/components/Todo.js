import React, { Component } from 'react'
import { TransitionMotion, StaggeredMotion, spring, presets, Motion } from 'react-motion'

class Todo extends React.Component {

  static willEnter() {
    return {
      height: 0,
      opacity: 1
    }
  }


  static willLeave() {
    return { width: spring(0), height: spring(0) }
  }


  constructor(props) {
    super(props)
    this.state = {
      todos: [
        { key: 't1', data: { text: 'Board the plane', isDone: false } },
        { key: 't2', data: { text: 'Sleep', isDone: false } },
        { key: 't3', data: { text: 'Try to finish conference slides', isDone: false } },
        { key: 't4', data: { text: 'Eat cheese and drink wine', isDone: false } },
        { key: 't5', data: { text: 'Go around in Uber', isDone: false } },
        { key: 't6', data: { text: 'Talk with conf attendees', isDone: false } },
        { key: 't7', data: { text: 'Show Demo 1', isDone: false } },
        { key: 't8', data: { text: 'Show Demo 2', isDone: false } },
        { key: 't9', data: { text: 'Lament about the state of animation', isDone: false } },
        { key: 't10', data: { text: 'Show Secret Demo', isDone: false } },
        { key: 't11', data: { text: 'Go home', isDone: false } }
      ],
      value: '',
      selected: 'all'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDestroy = this.handleDestroy.bind(this)
    this.getStyles = this.getStyles.bind(this)
  } // end of constructor


  getStyles() {
    const { todos, value } = this.state
    return todos.filter(({ data: { isDone, text } }) => text.toUpperCase().indexOf(value.toUpperCase()) >= 0)
      .map((todo, i) => ({
        key: todo.key,
        data: todo.data,
        index: i,
        style: {
          height: spring(60, presets.gentle),
          opacity: spring(1, presets.gentle)
        }
      }))
  }


  handleSubmit(e) {
    e.preventDefault()

    const newItem = {
      key: `t${Date.now()}`,
      data: { text: this.state.value, isDone: false }
    }

    this.setState({ todos: [newItem].concat(this.state.todos) })
  }

  handleDestroy(key) {
    const { todos } = this.state
    this.setState({ todos: this.state.todos.filter(data => data.key !== key) })
  }

  handleChange(e) {
    this.setState({ value: e.target.value })
  }

  render() {
    const { todos, value, selected } = this.state

    return (
      <div className="rightcontent">
        <section className="todoapp">
          <header className="header">

            <h1>todos</h1>

            <form onSubmit={this.handleSubmit}>
              <input autoFocus className="new-todo" placeholder="What needs to be done?" value={value} onChange={this.handleChange} />
            </form>
          </header>

          <section className="main">
            <input className="toggle-all" type="checkbox" />

            <TransitionMotion styles={this.getStyles} willLeave={this.willLeave} willEnter={this.willEnter}>
              {
                styles =>
                  (
                    <ul className="todo-list">
                      {styles.map(({ key, style, data: { text } }) =>
                        (
                          <li key={key} style={style}>
                            <div className="view">
                              <label htmlFor="btn">
                                <button className="destroy" onClick={this.handleDestroy.bind(null, key)} />
                                {text}
                              </label>
                            </div>
                          </li>
                        ))}
                    </ul>
                   )
              }
            </TransitionMotion>
          </section>

          <footer className="footer">
            <span className="todo-count">
              <strong>
                {Object.keys(todos).filter(key => !todos[key].isDone).length}
              </strong>
              Item left
            </span>
          </footer>

        </section>
      </div>
    ) // end of render return
  } // end of render
} // end of Todo Component

export default Todo
