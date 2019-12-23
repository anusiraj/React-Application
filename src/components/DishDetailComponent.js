import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';


    function RenderComments({comments}) {
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
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish = {props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments = {props.dish.comments} />
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