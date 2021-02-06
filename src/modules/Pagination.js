import React from 'react';
import { render } from '@testing-library/react';
import { useDispatch,useStore,connect} from 'react-redux';
import {nextPage,previousPage,goToPage} from '../redux/actions'
const mapStateToProps =state=>({
    ...state
})
const mapDispatchToProps=dispatch=>({
    nextPage:(page)=>dispatch(nextPage(page)),
    previousPage:(page)=>dispatch(previousPage(page)),
    goToPage:(page) => dispatch(goToPage(page))
})
function Pagination({nextPage,previousPage,goToPage}){
    const store=useStore();
    const currentPage = store.getState().filter.page||1;
    const offset = store.getState().filter.offset==undefined?10:store.getState().filter.offset;
    const productQty = store.getState().product.length||0;

    function getPageList(){
        let listHTML=[];
        for(let i=1;i<=Math.ceil(parseInt(productQty)/parseInt(offset));i++)
        {
            listHTML.push(<li key={i} className={(i==currentPage?"currentPage":"")} onClick={()=>goToPage(i)}>{i}</li>);
        }
        // console.log(currentPage);
        // console.log(Math.ceil(parseInt(productQty)/parseInt(offset)))
        return listHTML;
    }
    return(
        <ul className="page-navigation-wrapper">
            <li onClick={()=>(currentPage-1<1)?false:previousPage(currentPage-1)} className={((currentPage-1<1)?"disabled ":"")+"page-navigation-step"}>BACK</li>
            {
              getPageList()  
            }
            <li onClick={()=>(currentPage+1>Math.ceil(parseInt(productQty)/parseInt(offset)))?false:nextPage(currentPage+1)} className={(currentPage+1>Math.ceil(parseInt(productQty)/parseInt(offset))?"disabled ":"")+"page-navigation-step"}>NEXT</li>
        </ul>
    )
}

export default connect(mapStateToProps,mapDispatchToProps)(Pagination);