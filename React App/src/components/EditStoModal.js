import React,{Component} from 'react';
import {Modal, Button,Row,Col,Form} from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';

export class EditStoModal extends Component{

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

        fetch('https://webapplicationtask.azurewebsites.net/api/Store',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                StoreId:event.target.StoreId.value,
                StoreName:event.target.StoreName.value,
                StoreAddress:event.target.StoreAddress.value
            })
        })
        .then(res=>res.json())
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
            anchorOrigin={{vertical:'bottom', horizontal:'center'}}
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
                Edit Store
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
                
                <Row>
                    <Col sm={6}>
                        
                        <Form.Group controlId = "StoreId">
                        <Form.Label 
                        hidden >Id</Form.Label>
                        <Form.Control
                        type="text"
                        name="StoreId"
                        required
                        disabled
                        hidden
                        defaultValue = {this.props.stoid}
                        placeholder="Id"
                        />
                         </Form.Group>
                        
                        <Form.Group controlId = "StoreName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                        type="text"
                        name="StoreName"
                        required
                        defaultValue = {this.props.stoname}
                        placeholder="Name"
                        />
                         </Form.Group>
                         <Form.Group controlId = "StoreAddress">
                         <Form.Label>Address</Form.Label>
                        <Form.Control
                        type="text"
                        name="StoreAddress"
                        required
                        defaultValue = {this.props.stoaddress}
                        placeholder="Address"
                        />
                         </Form.Group>
                        
                    </Col>
                </Row>

            
            </Modal.Body>
           
            <Modal.Footer>
            <Button variant="dark" onClick={this.props.onHide}>Cancel</Button>
              
            <input type="submit" value="Edit" color="success" className="btn btn-success" />
            </Modal.Footer>
            </Form>
          </Modal> 
        </div>

        );
    }
}