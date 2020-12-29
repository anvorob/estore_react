import React from 'react';
import {connect} from 'react-redux';

class CustomerContainer extends React.Component{
    click=()=>{
        this.props.dispatch({ type: 'ADD_ONE' });
        this.props.dispatch({type:'FETCH_CATEGORIES'});
    }
    render(){
        
        
    return <h2 onClick={()=>{this.click()}}>Hello{this.props.categories && this.props.categories.map(item=><h4>{item.name}</h4>)}</h2>;
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
      number: state.number,
      categories:state.categories
    };
  }

export default connect(mapStateToProps)(CustomerContainer);