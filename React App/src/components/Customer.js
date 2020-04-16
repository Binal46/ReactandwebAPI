import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddCustModal} from './AddCustModal';
import {EditCustModal} from './EditCustModal';
import {DelCustModal} from './DelCustModal';
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';


let prev, next, last, first = 0;
export class Customer extends Component{

    constructor(props){
        super(props);
        this.state = {cust:[], addModalShow : false,editModalShow : false,delModalShow : false,
            currentPage:1, perPage:10}

            this.handleClick = this.handleClick.bind(this);  
           this.handleLastClick = this.handleLastClick.bind(this);  
           this.handleFirstClick = this.handleFirstClick.bind(this);  
    }

    componentDidMount(){
        this.refreshList();
       
    }

    refreshList(){
        
        fetch('https://webapplicationtask.azurewebsites.net/api/Customer')
        .then(response => response.json())
        .then(data =>{
            this.setState({cust:data});
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
        const{cust,custid,custname,custaddress} = this.state;
        let {currentPage,perPage} = this.state;

        let indexOfLast = currentPage*perPage;
        let indexOfFirst = indexOfLast-perPage;
        let current = cust.slice(indexOfFirst, indexOfLast);
        prev = currentPage>0?(currentPage - 1):0;
        last = Math.ceil(cust.length/perPage);
        next = (last === currentPage) ? currentPage: currentPage +1;

        let pageNumbers = [];
        for(let i=1; i <=last; i++){
            pageNumbers.push(i);
        }


        let addModalClose=() =>this.setState({addModalShow:false});
        let editModalClose=() =>this.setState({editModalShow:false});
        let delModalClose=() =>this.setState({delModalShow:false});
        return(
            <div >

        <ButtonToolbar>
               <Button className="mt-4" variant = "primary" 
               onClick={()=> this.setState({addModalShow :true})}
               >New Customer</Button> 

            <AddCustModal show = {this.state.addModalShow}
            onHide = {addModalClose}
            />

            </ButtonToolbar>

            <Table className="mt-4"striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>CustomerName</th>
                    <th>CustomerAddress</th>
                    <th>Actions</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {current.map((data,index)=>
                        <tr key={index}>
                            <td>{data.CustomerName}</td>
                            <td>{data.CustomerAddress}</td>
                            <td>
                                <ButtonToolbar>
                                
                                    <Button 
                                    className="ml-2" size="sm" variant="warning" 
                                    onClick = {()=> this.setState({editModalShow:true, custid:data.CustomerId,
                                        custname:data.CustomerName, custaddress:data.CustomerAddress})}>
                                            
                                            EDIT
                                    </Button>
                                    
                                    <EditCustModal 
                                    show = {this.state.editModalShow}
                                    onHide = {editModalClose}
                                    custid = {custid}
                                    custname = {custname}
                                    custaddress = {custaddress}
                                    />
                                </ButtonToolbar>
                            </td>
                            <td>
                                <ButtonToolbar>
                                    <Button
                                    className="ml-2" size="sm" variant="danger"
                                    onClick = {()=> this.setState({delModalShow:true, custid:data.CustomerId})}>
                                          
                                            DELETE
                                    </Button>

                                    <DelCustModal 
                                    show = {this.state.delModalShow}
                                    onHide = {delModalClose}
                                    custid = {custid}
                                
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