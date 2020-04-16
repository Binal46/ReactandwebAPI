import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button, ButtonToolbar} from 'react-bootstrap';
import {AddSalModal} from './AddSalModal';
import {EditSalModal} from './EditSalModal';
import {DelSalModal} from './DelSalModal';
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';


let prev, next, last, first = 0;
export class Sales extends Component{

    constructor(props){
        super(props);
        this.state = {sal:[], addsaModalShow : false,editsaModalShow : false,delsaModalShow : false,
            currentPage:1, perPage:10}

            this.handleClick = this.handleClick.bind(this);  
            this.handleLastClick = this.handleLastClick.bind(this);  
            this.handleFirstClick = this.handleFirstClick.bind(this);
            
    }

  
    componentDidMount(){
        this.refreshList();

    }

    refreshList(){
       
        fetch('https://webapplicationtask.azurewebsites.net/api/Sales')
        .then(response => response.json())
        .then(res =>{
            this.setState({sal:res});  
            
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
        const{sal,salid,salcustname,salprodname,salstoname,saldatesold} = this.state;
        let {currentPage,perPage} = this.state;

        let indexOfLast = currentPage*perPage;
        let indexOfFirst = indexOfLast-perPage;
        let current = sal.slice(indexOfFirst, indexOfLast);
        prev = currentPage>0?(currentPage - 1):0;
        last = Math.ceil(sal.length/perPage);
        next = (last === currentPage) ? currentPage: currentPage +1;

        let pageNumbers = [];
        for(let i=1; i <=last; i++){
            pageNumbers.push(i);
        }
        
        let addsaModalClose=() =>this.setState({addsaModalShow:false});
        let editsaModalClose=() =>this.setState({editsaModalShow:false});
        let delsaModalClose=() =>this.setState({delsaModalShow:false});
        return(
            <div>

        <ButtonToolbar>
               <Button className="mt-4" variant = "primary" 
               onClick={()=> this.setState({addsaModalShow :true})}
               >New Sale</Button> 

            <AddSalModal show = {this.state.addsaModalShow}
            onHide = {addsaModalClose}
            />

            </ButtonToolbar>

            <Table className="mt-4"striped bordered hover size="sm" >
                <thead>
                    <tr>
                    <th>Customer</th>
                    <th>Product</th>
                    <th>Store</th>
                    <th>Date sold</th>
                    <th>Actions</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {current.map((data,index)=>
                        <tr key={index}>
                            <td>{data.CustomerName}</td>
                            <td>{data.ProductName}</td>
                            <td>{data.StoreName}</td>
                            <td>{data.DateSold}</td>
                            <td>
                                <ButtonToolbar>
                                    <Button
                                    className="ml-2" size="sm" variant="warning"
                                    onClick = {()=> this.setState({editsaModalShow:true, salid:data.SalesId,
                                        salcustname:data.CustomerName, salprodname:data.ProductName,
                                        salstoname:data.StoreName,saldatesold:data.DateSold})}>
                                            EDIT
                                    </Button>

                                    <EditSalModal 
                                    show = {this.state.editsaModalShow}
                                    onHide = {editsaModalClose}
                                    salid = {salid}
                                    salcustname = {salcustname}
                                    salprodname = {salprodname}
                                    salstoname = {salstoname}
                                    saldatesold = {saldatesold}

                                    />
                                </ButtonToolbar>
                            </td>
                            <td>
                                <ButtonToolbar>
                                    <Button
                                    className="ml-2" size="sm" variant="danger"
                                    onClick = {()=> this.setState({delsaModalShow:true, salid:data.SalesId})}>
                                        DELETE
                                    </Button>

                                    <DelSalModal 
                                    show = {this.state.delsaModalShow}
                                    onHide = {delsaModalClose}
                                    salid = {salid}
                                
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