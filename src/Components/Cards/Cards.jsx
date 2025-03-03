import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";

const Cards = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/images")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setFiles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-4">
      <Row className="g-4">
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Loading...</p>
          </div>
        ) : files.length > 0 ? (
          files.map((product, index) => (
            <Col key={index} md={2} sm={6}>
              <Card className="shadow-sm p-2 h-100">
                <Card.Img variant="top" src={product.url} alt="Loaded" />
                <Card.Body>
                  <Card.Title className="text-primary">{product.Item}</Card.Title>
                  <Card.Text>
                    <strong>Type:</strong> {product.Itemtype} <br />
                    <strong>Price:</strong> ${product.price} <br />
                    <small className="text-muted">{product.Date}</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </Row>
    </Container>
  );
};

export default Cards;
