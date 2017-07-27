var React = require('react');
var ReactDOM = require('react-dom');
var TodoList = React.createClass({
  getInitialState:function(){
    return{
      todolist:[]
    };
  },
  handleChange:function(rows){
    this.setState({
      todolist:rows
    });
  },
  render(){
    return(
      <div>
      <TypeNew onAdd={this.handleChange} todo={this.state.todolist}/>
      <ListTodo onDel={this.handleChange} todo={this.state.todolist} />
      </div>
    );
  }
});


var TypeNew=React.createClass({
  handleAdd:function(e){
    e.preventDefault();
    var inputDom = ReactDOM.findDOMNode(this.refs.inputnew);
         var newthing = inputDom.value.trim();
         // 获取传入的todolist数据
         var rows = this.props.todo;
         if (newthing !== '') {
             // 更新数据，并使用 onAdd 更新到 TodoList 组件的 state 中
             rows.push(newthing);
             this.props.onAdd(rows);
         }
         inputDom.value = '';
  },
  render:function(){
    return(
      <form onSubmit={this.handleAdd}>
        <input type="text" ref="inputnew" placeholder="typing a newthing todo" autoComolete="off"/>
      </form>
    );
  }
});


var ListTodo=React.createClass({
  handleDel:function(e){
    var delIndex=e.target.getAttribute('data-key');
    this.props.todo.splice(delIndex,1);
    this.props.onDel(this.props.todo);
  },
  render:function(){
    return(
      <ul id="todo-list">
      {
        this.props.todo.map(function(item,i){
          return(
            <li>
              <label>{item}</label>
              <button className="destory" onClick={this.handleDel} data-key={i}>delete</button>
            </li>
          );
        }.bind(this))
      }
      </ul>
    );
  }
});

ReactDOM.render(
    <TodoList />,
  document.getElementById('init')
);
