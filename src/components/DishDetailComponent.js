import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    constructor(props) {
        super(props);
    }

    renderComments(comments) {
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

    renderDish(dish) {
        return (
            <div class = "container">
                <Card>
                    <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                    <CardBody>
                        <CardTitle>{this.props.dish.name}</CardTitle>
                        <CardText>{this.props.dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

    render() {
        if (this.props.dish != null) {
            return (
                <div class = "container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
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
}

export default DishDetail;