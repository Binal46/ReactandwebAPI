import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddStoModal} from './AddStoModal';
import {EditStoModal} from './EditStoModal';
import {DelStoModal} from './DelStoModal';
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';

let prev, next, last, first = 0;
export class Store extends Component{

    constructor(props){
        super(props);
        this.state = {sto:[], addstModalShow : false,editstModalShow : false,delstModalShow : false,
            currentPage:1, perPage:10}

            this.handleClick = this.handleClick.bind(this);  
            this.handleLastClick = this.handleLastClick.bind(this);  
            this.handleFirstClick = this.handleFirstClick.bind(this);
    }


    componentDidMount(){
        this.refreshList();
    }


    refreshList(){
        
        fetch('https://webapplicationtask.azurewebsites.net/api/Store')
        .then(response => response.json())
        .then(data =>{
            this.setState({sto:data});
        });
    }

    componentDidUpdate(){
        this.refreshList();
        
    }

    handleClick(event){
        event.preventDefault();
        this.setState({
            currentPage:Number(event.target.id)
        });
    }

    handleLastClick(event){
        event.preventDefault();
        this.setState({
            currentPage:last
        });
    }
    handleFirstClick(event){
        event.preventDefault();
        this.setState({
            currentPage:1
        });
    }

    render(){
        const{sto,stoid,stoname,stoaddress} = this.state;

        let {currentPage,perPage} = this.state;

        let indexOfLast = currentPage*perPage;
        let indexOfFirst = indexOfLast-perPage;
        let current = sto.slice(indexOfFirst, indexOfLast);
        prev = currentPage>0?(currentPage - 1):0;
        last = Math.ceil(sto.length/perPage);
        next = (last === currentPage) ? currentPage: currentPage +1;

        let pageNumbers = [];
        for(let i=1; i <=last; i++){
            pageNumbers.push(i);
        }


        let addstModalClose=() =>this.setState({addstModalShow:false});
        let editstModalClose=() =>this.setState({editstModalShow:false});
        let delstModalClose=() =>this.setState({delstModalShow:false});

        return(
            <div>
                <ButtonToolbar>
               <Button className="mt-4" variant = "primary" 
               onClick={()=> this.setState({addstModalShow :true})}
               >New Store</Button> 

            <AddStoModal show = {this.state.addstModalShow}
            onHide = {addstModalClose}
            />

            </ButtonToolbar>

            <Table className="mt-4"striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>StoreName</th>
                    <th>StoreAddress</th>
                    <th>Actions</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {current.map((data,index)=>
                        <tr key={index}>
                            <td>{data.StoreName}</td>
                            <td>{data.StoreAddress}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button
                                    className="ml-2" size="sm" variant="warning"
                                    onClick = {()=> this.setState({editstModalShow:true, stoid:data.StoreId,
                                        stoname:data.StoreName, stoaddress:data.StoreAddress})}>
                                            EDIT
                                    </Button>

                                    <EditStoModal 
                                    show = {this.state.editstModalShow}
                                    onHide = {editstModalClose}
                                    stoid = {stoid}
                                    stoname = {stoname}
                                    stoaddress = {stoaddress}
                                    />
                                </ButtonToolbar>
                            </td>
                            <td>
                                <ButtonToolbar>
                                    <Button
                                    className="ml-2" size="sm" variant="danger"
                                    onClick = {()=> this.setState({delstModalShow:true, stoid:data.StoreId})}>
                                          
                                            DELETE
                                    </Button>

                                    <DelStoModal 
                                    show = {this.state.delstModalShow}
                                    onHide = {delstModalClose}
                                    stoid = {stoid}
                                
                                    />
                                </ButtonToolbar>
                            </td>

                        </tr>
                        )}
                </tbody>

            </Table>
            <ul id = "page-numbers" class="pagination justify-content-end">
                    <nav>
                        <Pagination >
                            {/* <PaginationItem>
                                {
                                    prev===0? <PaginationLink disabled>First</PaginationLink>:
                                    <PaginationLink onClick = {this.handleFirstClick} id = {prev} href={prev}>First</PaginationLink>
                                }
                            </PaginationItem> */}
                            <PaginationItem>
                                {
                                    prev===0? <PaginationLink disabled>Prev</PaginationLink>:
                                    <PaginationLink onClick = {this.handleClick} id = {prev} href={prev}>Prev</PaginationLink>
                                }
                            </PaginationItem>
                            {
                                pageNumbers.map((number,i) =>
                                <Pagination key = {i}>
                                    <PaginationItem active = {pageNumbers[currentPage -1] === (number) ? true : false}>
                                        <PaginationLink onClick = {this.handleClick} href={number} key={number} id={number}>
                                                    {number}
                                        </PaginationLink>
                                    </PaginationItem>
                                </Pagination>
                                )}

                                <PaginationItem>
                                    {
                                        currentPage === last ? <PaginationLink disabled>Next</PaginationLink>:
                                        <PaginationLink onClick = {this.handleClick} id={pageNumbers[currentPage]} href = {pageNumbers[currentPage]}>Next</PaginationLink>
                                    }
                                </PaginationItem>

                                {/* <PaginationItem>
                                    {
                                        currentPage === last ? <PaginationLink disabled>Last</PaginationLink>:
                                        <PaginationLink onClick = {this.handleLastClick} id={pageNumbers[currentPage]} href = {pageNumbers[currentPage]}>Last</PaginationLink>
                                    }
                                </PaginationItem> */}
                        </Pagination>
                    </nav>
                </ul>
            </div>
        )
    }
}