import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import L from 'leaflet';

// Fix for default marker icon issue with Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import HeaderName from "./Header/Header";
import FooterName from "./Footer/Footer";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3000/product/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await res.json();
        setProduct(data);

        // Geocoding logic
        const geocodeLocation = async () => {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(data.Location)}`
            );
            const locations = await response.json();
            
            if (locations && locations.length > 0) {
              setLocation({
                lat: parseFloat(locations[0].lat),
                lon: parseFloat(locations[0].lon)
              });
            }
          } catch (geocodeError) {
            console.error("Geocoding error:", geocodeError);
          }
        };

        await geocodeLocation();
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Alert variant="warning">
          No product details found.
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <HeaderName />
      <Container fluid className="bg-light py-4">
        <Container>
          <Row className="g-4">
            {/* Product Image */}
            <Col xs={12} md={6}>
              <Card className="mb-4 shadow-sm">
                <Card.Img 
                  variant="top" 
                  src={product.url} 
                  alt="Product" 
                  className="img-fluid" 
                  style={{ 
                    height: '400px', 
                    objectFit: 'cover' 
                  }}
                />
              </Card>

              {/* Description */}
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Description</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  
                  <Row xs={1} md={2} className="g-2">
                    {[
                      { label: "Material", value: product.material },
                      { label: "Dimensions", value: product.dimensions },
                      { label: "Seating Capacity", value: product.seating_capacity },
                      { label: "Finish", value: product.finish },
                      { label: "Warranty", value: product.warranty }
                    ].map((detail, index) => (
                      <Col key={index}>
                        <Badge bg="success" className="me-2">{detail.label}</Badge>
                        {detail.value}
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>
            </Col>

            {/* Product and Seller Details */}
            <Col xs={12} md={6}>
              {/* Product Details */}
              <Card className="mb-4 shadow-sm border-success">
                <Card.Body>
                  <Card.Title className="text-success">{product.Item}</Card.Title>
                  <Row xs={1} md={2} className="g-2">
                    {[
                      { label: "Price", value: `₹${product.price}` },
                      { label: "Type", value: product.ItemType },
                      { label: "Date", value: product.Date },
                      { label: "Location", value: product.Location }
                    ].map((info, index) => (
                      <Col key={index}>
                        <Badge bg="success" className="me-2">{info.label}</Badge>
                        {info.value}
                      </Col>
                    ))}
                  </Row>
                </Card.Body>
              </Card>

              {/* Seller Details */}
              <Card className="mb-4 shadow-sm border-success">
                <Card.Body>
                  <Card.Title className="text-success">Seller Information</Card.Title>
                  <Card.Text>
                    <Row>
                      <Col xs={12} md={6}>
                        <strong>Name:</strong> {product.seller || 'Not Available'}
                      </Col>
                      <Col xs={12} md={6}>
                        <strong>Contact:</strong> {product.ph_no || 'Not Available'}
                      </Col>
                      <Col xs={12} className="mt-2">
                        <strong>Full Name:</strong> {product.Name || 'Not Available'}
                      </Col>
                      {product.email && (
                        <Col xs={12}>
                          <strong>Email:</strong> {product.email}
                        </Col>
                      )}
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>

              {/* Location Map */}
              {location && (
                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title className="text-success">Location</Card.Title>
                    <div style={{ height: '300px', width: '100%' }}>
                      <MapContainer 
                        center={[location.lat, location.lon]} 
                        zoom={13} 
                        style={{ height: '100%', width: '100%' }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <Marker position={[location.lat, location.lon]}>
                          <Popup>
                            {product.Location}
                          </Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
      <FooterName />
    </>
  );
};

export default ProductDetails;