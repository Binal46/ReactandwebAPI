import React,{Component} from 'react';
import {Modal, Button,Row,Col,Form} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class AddSalModal extends Component{

    constructor(props){
        super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {cust:[], prod:[], sto:[], snackbaropen: false, snackbarmsg:''};
    
    }

    componentDidMount(){
        fetch('https://webapplicationtask.azurewebsites.net/api/Customer')
        .then(response => response.json())
        .then(data =>{
            this.setState({cust:data});
        });

        fetch('https://webapplicationtask.azurewebsites.net/api/Product')
        .then(response => response.json())
        .then(data =>{
            this.setState({prod:data});
        });

        fetch('https://webapplicationtask.azurewebsites.net/api/Store')
        .then(response => response.json())
        .then(data =>{
            this.setState({sto:data});
        });

    }

    snackbarClose = (event) =>{
        this.setState({snackbaropen: false});
    }

    handleSubmit(event){
        event.preventDefault();

        fetch('https://webapplicationtask.azurewebsites.net/api/Sales',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                SalesId:null,
                CustomerName:event.target.CustomerName.value,
                ProductName:event.target.ProductName.value,
                StoreName:event.target.StoreName.value,
                DateSold:event.target.DateSold.value
            })
        })
        .then(res=> res.json())
        .then((result) =>
        {
            //alert(result);
            this.setState({snackbaropen:true, snackbarmsg:result});
            this.setState(this.props.onHide);
        },
        (error) =>
        {
            //alert('Failed')
            this.setState({snackbaropen:true, snackbarmsg:'Failed'});
        })
    }



    render(){
        
        return(

        <div className = "container">

            <Snackbar
            anchorOrigin={{vertical:'center', horizontal:'center'}}
            open = {this.state.snackbaropen}
            autoHideDuration ={2000}
            onClose = {this.snackbarClose}
            message = {<span id="message-id" >{this.state.snackbarmsg}</span>}
            action= {[
            <IconButton
            key="close"
            arial-label="Close"
            color="inherit"
            onClick={this.snackbarClose}
            > x </IconButton>
            ]}
            />
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
              <Form onSubmit={this.handleSubmit}>
            <Modal.Header >
              <Modal.Title id="contained-modal-title-vcenter">
                Create Sales
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
                
                <Row>
                    <Col sm={6}>

                        <Form.Group controlId = "DateSold">
                        <Form.Label>DateSold</Form.Label>
                        <Form.Control
                        type="date"
                        name="DateSold"
                        required
                        placeholder="DateSold"
                        />
                        </Form.Group>
                        
                        <Form.Group controlId = "CustomerName">
                        <Form.Label>Customer</Form.Label>
                        <Form.Control as="select">
                            {this.state.cust.map(cus =>
                            <option key = {cus.CustomerId}>{cus.CustomerName}</option>
                                )}

                        </Form.Control>
                        
                        
                        </Form.Group>

                        <Form.Group controlId = "ProductName">
                        <Form.Label>Product</Form.Label>
                        <Form.Control as="select">
                            {this.state.prod.map(pro =>
                            <option key = {pro.ProductId}>{pro.ProductName}</option>
                                )}

                        </Form.Control>
                        </Form.Group>

                        <Form.Group controlId = "StoreName">
                        <Form.Label>Store</Form.Label>
                        <Form.Control as="select">
                            {this.state.sto.map(st =>
                            <option key = {st.StoreId}>{st.StoreName}</option>
                                )}

                        </Form.Control>
                        </Form.Group>

                        
                    </Col>
                </Row>

            
            </Modal.Body>
           
            <Modal.Footer>
            <Button variant="dark" onClick={this.props.onHide}>Cancel</Button>
            <input type="submit" value="Create" color="success" className="btn btn-success" />
            
            </Modal.Footer>
            </Form>
          </Modal> 
        </div>

        );
    }
}
