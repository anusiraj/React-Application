import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, ModalHeader, Modal, ModalBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Col, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength  = (len) => (val) => !(val) || (val.length <=len);
const minLength  = (len) => (val) => (val) && (val.length >=len);

class CommentForm extends Component {

    constructor(props){
        super(props);

        this.state = {
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 


    }
    

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen    
        })

    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
    }


    render() {

        return(
                <>
                <Row className="form-group">
                    <Col md={{size: 7}}>
                    <Button outline onClick = {this.toggleModal}
                    outline color="secondary">
                        <span className = "fa fa-pencil fa-lg" ></span>{' '}Submit Comment</Button>
                    </Col>
                </Row>

                <Modal isOpen={this.state.isModalOpen} toggle = {this.toggleModal}>
                <ModalHeader  toggle = {this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                            <Label htmlFor="rating" md={2}>Rating</Label>
                            <Col md={11}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>Select rating</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>

                                    </Control.select>
                                </Col>
                        </Row>
                        <Row className="form-group">
                                <Label htmlFor="yourname" md={3}>Your Name</Label>
                                <Col md={11}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}/>
                                         <Errors  className = "text-danger"
                                         model = ".yourname"
                                         show = "touched"
                                         messages = {{
                                             required : "Required",
                                             minLength : "Must be greater than 2 characters",
                                             maxLength : "Must be 15 characters or less"

                                         }}>
                                            

                                         </Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={11}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control" />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:10}}>
                                    <Button type="submit" color="primary">
                                    Submit
                                    </Button>
                                </Col>
                            </Row>
                    </LocalForm>
                </ModalBody>
                </Modal>
                </>
        
        );
    }
}




    function RenderComments({comments, addComment, dishId}) {
        if (comments == null)
            return (
                <div></div>
            );

        const display = comments.map((c) => {
            var options = { year: 'numeric', month: 'short', day: 'numeric' };
            const date = new Date(c.date);
            return (
                <li>
                    <p>{c.comment}</p>
                    <p>-- {c.author}, {date.toLocaleDateString('en-US', options)}</p>
                </li>
            );
        });

        return (
            <div>
                <h4>Comments</h4>
                <ul class="list-unstyled">
                    {display}
                    <CommentForm dishId={dishId} addComment={addComment} />
                </ul>
                
            </div>
        );
    }

    function RenderDish({dish}) {
        return (
            <div class = "container">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    const DishDetail = (props) => {
        if (props.dish != null) {
            return (
                <div class = "container">
                    <div className = "row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to= '/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className = "col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish = {props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}
                            addComment={props.addComment}
                            dishId={props.dish.id}
      />
                    </div>
                </div>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }


export default DishDetail;