import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddProdModal} from './AddProdModal';
import {EditProdModal} from './EditProdModal';
import {DelProdModal} from './DelProdModal';
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';

let prev, next, last, first = 0;
export class Product extends Component{

    constructor(props){
        super(props);
        this.state = {prod:[], addPModalShow : false,editpModalShow : false,delpModalShow : false,
            currentPage:1, perPage:10}

            this.handleClick = this.handleClick.bind(this);  
            this.handleLastClick = this.handleLastClick.bind(this);  
            this.handleFirstClick = this.handleFirstClick.bind(this);  
    }

    componentDidMount(){
        this.refreshList();
    }

    refreshList(){
        
        fetch('https://webapplicationtask.azurewebsites.net/api/Product')
        .then(response => response.json())
        .then(data =>{
            this.setState({prod:data});
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
        const{prod,prodid,prodname,prodprice} = this.state;
        let {currentPage,perPage} = this.state;

        let indexOfLast = currentPage*perPage;
        let indexOfFirst = indexOfLast-perPage;
        let current = prod.slice(indexOfFirst, indexOfLast);
        prev = currentPage>0?(currentPage - 1):0;
        last = Math.ceil(prod.length/perPage);
        next = (last === currentPage) ? currentPage: currentPage +1;

        let pageNumbers = [];
        for(let i=1; i <=last; i++){
            pageNumbers.push(i);
        }

        let addpModalClose=() =>this.setState({addpModalShow:false});
        let editpModalClose=() =>this.setState({editpModalShow:false});
        let delpModalClose=() =>this.setState({delpModalShow:false});
        return(
            <div >
                <ButtonToolbar>
               <Button className="mt-4" variant = "primary" 
               onClick={()=> this.setState({addpModalShow :true})}
               >New Product</Button> 

            <AddProdModal show = {this.state.addpModalShow}
            onHide = {addpModalClose}
            />

            </ButtonToolbar>


            <Table className="mt-4"striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>ProductName</th>
                    <th>ProductPrice</th>
                    <th>Actions</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {current.map((data,index)=>
                        <tr key={index}>
                            <td>{data.ProductName}</td>
                            <td>{'$'+data.ProductPrice}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button
                                    className="ml-2" size="sm" variant="warning"
                                    onClick = {()=> this.setState({editpModalShow:true, prodid:data.ProductId,
                                        prodname:data.ProductName, prodprice:data.ProductPrice})}>
                                              
                                            EDIT
                                    </Button>

                                    <EditProdModal 
                                    show = {this.state.editpModalShow}
                                    onHide = {editpModalClose}
                                    prodid = {prodid}
                                    prodname = {prodname}
                                    prodprice = {prodprice}
                                    />
                                </ButtonToolbar>
                            </td>
                            <td>
                                <ButtonToolbar>
                                    <Button
                                    className="ml-2" size="sm" variant="danger"
                                    onClick = {()=> this.setState({delpModalShow:true, prodid:data.ProductId})}>
                                     
                                            DELETE
                                    </Button>

                                    <DelProdModal 
                                    show = {this.state.delpModalShow}
                                    onHide = {delpModalClose}
                                    prodid = {prodid}
                                
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