import React,{Component} from 'react';
import {Modal, Button,Row,Col,Form} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class DelProdModal extends Component{

    constructor(props){
        super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {snackbaropen: false, snackbarmsg:''};
    }

    snackbarClose = (event) =>{
        this.setState({snackbaropen: false});
    }

    handleSubmit(event){
        event.preventDefault();

        fetch('https://webapplicationtask.azurewebsites.net/api/Product/'+ event.target.ProductId.value,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },          
        })
        .then(res=> res.json())
        .then((result) =>
        {
            //alert(result);
            this.setState(this.props.onHide);
            this.setState({snackbaropen:true, snackbarmsg:result});
           
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
            anchorOrigin={{vertical:'bottom', horizontal:'center'}}
            open = {this.state.snackbaropen}
            autoHideDuration ={3000}
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
                Delete Product
              </Modal.Title>
            </Modal.Header>
            <Modal.Body >
              
                Are you sure?
                <Row>
                    <Col sm={6}>
                        
                        <Form.Group controlId = "ProductId">
                        <Form.Label
                        hidden>Id</Form.Label>
                        <Form.Control
                        type="text"
                        name="ProductId"
                        required
                        disabled
                        hidden
                        defaultValue = {this.props.prodid}
                        placeholder="Id"
                        />
                         </Form.Group>
                       
                    </Col>
                </Row>

            
            </Modal.Body>
           
            <Modal.Footer>
            <Button variant="dark" onClick={this.props.onHide}>Cancel</Button>
              
            <input type="submit" value="Delete" color="danger" className="btn btn-danger" />
            </Modal.Footer>
            </Form>
          </Modal> 
        </div>

        );
    }
}