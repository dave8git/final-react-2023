import React from "react";
import { Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

function MiniTable(props) {
    return (
        <>
            <ListGroup.Item as="li" className="d-flex justify-content-between align-items-center">
                <div>
                    <span className="mr-2">
                        <strong>Title:</strong> {props.id}
                    </span>
                    <span>
                        <strong> Status:</strong> {' ' + props.status}
                    </span>
                </div>
                <Link key={props.id} to={`/table/${props.id}`} >
                    <Button variant="primary">Show more</Button>
                </Link>
            </ListGroup.Item>
        </>
    );
}

export default MiniTable;
